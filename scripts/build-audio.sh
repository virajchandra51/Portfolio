#!/usr/bin/env bash
# Builds the ambience loops from CC0 field recordings on Freesound.
#
#   ./scripts/build-audio.sh
#
# Every source below is Creative Commons Zero 1.0: a public domain dedication,
# so there is no licence to honour and no attribution required. We credit the
# recordists anyway. Verify the licence yourself before adding a source; the
# CC0 filter on Freesound search is the "Creative Commons 0" facet.
#
# Needs network and ffmpeg. The processed mp3s are committed, so a deploy never
# runs this.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/audio
mkdir -p "$OUT"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
UA="Mozilla/5.0 (compatible; personal-site-build/1.0)"

# The exact recordings rishwajeetsingh.com credits on its own about page, all
# Creative Commons Zero 1.0: a public domain dedication, no rights reserved and
# no attribution required. Their site links straight to each source, so these
# are the same files rather than substitutes. We credit the recordists anyway.
#
# Their artwork is a different matter and is deliberately not used: it is their
# own generated work with no licence offered, which means all rights reserved.
#
# name | freesound id | recordist | preview url | byte range | title
SOURCES=(
  "rain|704579|VanEngelen|https://cdn.freesound.org/previews/704/704579_9285510-hq.mp3||Rain_Ambience.WAV"
  "leaves|276294|Sandermotions|https://cdn.freesound.org/previews/276/276294_1402315-hq.mp3||Leaves in wind.WAV"
  "water|318064|ceich93|https://cdn.freesound.org/previews/318/318064_4457609-hq.mp3||Water_Lapping_River.wav"
  "thunder|581124|Fission9|https://cdn.freesound.org/previews/581/581124_9395330-hq.mp3||Distant Thunder 3"
)

echo "fetching sources"
for row in "${SOURCES[@]}"; do
  IFS='|' read -r name id who url range title <<<"$row"
  if [ -n "$range" ]; then
    curl -sSL --max-time 300 -H "User-Agent: $UA" -r "$range" "$url" -o "$TMP/$name.src.mp3"
  else
    curl -sSL --max-time 300 -H "User-Agent: $UA" "$url" -o "$TMP/$name.src.mp3"
  fi
  printf '  %-8s %6sk  %s by %s\n' "$name" \
    "$(( $(wc -c < "$TMP/$name.src.mp3") / 1024 ))" "$title" "$who"
done

echo "source durations"
for row in "${SOURCES[@]}"; do
  IFS='|' read -r name id who url range title <<<"$row"
  printf '  %-8s %ss\n' "$name" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$TMP/$name.src.mp3" | cut -d. -f1)"
done

# Seamless loop: take a segment, then crossfade its tail back over its head so
# the join is inaudible. Result is (LEN - FADE) seconds long.
# Seamless loop: the segment's tail is crossfaded back over its head, so the
# join is inaudible. Output is (LEN - FADE) seconds.
#
# The source is opened twice rather than split with asplit: asplit starves the
# graph when its two branches consume different time ranges, and ffmpeg exits
# with "No filtered frames for output stream" and an empty file.
# Loudness normalisation is a second pass for the same reason.
loop() {
  local name=$1 start=$2 len=$3 fade=$4
  local head_end=$((start + fade))
  local body_end=$((start + len))
  ffmpeg -hide_banner -loglevel error -y -i "$TMP/$name.src.mp3" -i "$TMP/$name.src.mp3" -filter_complex "[0:a]atrim=start=${head_end}:end=${body_end},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=stereo[body];[1:a]atrim=start=${start}:end=${head_end},asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=stereo[head];[body][head]acrossfade=d=${fade}:c1=tri:c2=tri[out]" -map "[out]" "$TMP/$name.raw.wav"
  ffmpeg -hide_banner -loglevel error -y -i "$TMP/$name.raw.wav" -af "loudnorm=I=-24:TP=-3:LRA=7" -ar 44100 "$TMP/$name.wav"
}

echo "building loops"
loop rain    3 56 6
loop leaves  5 56 6
loop water   2 52 6

# Thunder is a one shot and the source is already only 8s, so it is used whole
# with a short fade at each end.
ffmpeg -hide_banner -loglevel error -y -i "$TMP/thunder.src.mp3" \
  -af "afade=t=in:st=0:d=0.15,afade=t=out:st=6.2:d=1.8,loudnorm=I=-20:TP=-2" \
  -ar 44100 "$TMP/thunder.wav"

echo "encoding"
for f in rain leaves water thunder; do
  ffmpeg -hide_banner -loglevel error -y -i "$TMP/$f.wav" \
    -codec:a libmp3lame -b:a 112k -ac 2 "$OUT/$f.mp3"
done
rm -f "$OUT/pad.mp3" "$OUT/wind.mp3" "$OUT/birds.mp3"

{
  echo "Ambience sources. All Creative Commons Zero 1.0 (public domain"
  echo "dedication): no rights reserved, no attribution required. Credited here"
  echo "and in the site footer as courtesy."
  echo
  for row in "${SOURCES[@]}"; do
    IFS='|' read -r name id who url range title <<<"$row"
    printf '%-9s "%s" by %s\n' "$name.mp3" "$title" "$who"
    printf '%-9s https://freesound.org/s/%s/  CC0 1.0\n\n' "" "$id"
  done
  echo "Trimmed, crossfade-looped and loudness-normalised by scripts/build-audio.sh."
} > "$OUT/CREDITS.txt"

ls -la "$OUT"
