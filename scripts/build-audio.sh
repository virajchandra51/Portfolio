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

# name | freesound id | recordist | preview url | byte range | title
# The rain source is 19 minutes and 27 MB. We only need a minute of it, and the
# CDN honours Range, so we pull a slice from the middle instead of the lot.
# MP3 frames are self-syncing, so a slice decodes on its own.
SOURCES=(
  "rain|757276|Garuda1982|https://cdn.freesound.org/previews/757/757276_2061858-hq.mp3|9000000-12000000|Gentle Rain on Leaves with Soft Wind"
  "wind|703033|mudflea2|https://cdn.freesound.org/previews/703/703033_15236906-hq.mp3||Wind in Trees"
  "birds|530898|BurghRecords|https://cdn.freesound.org/previews/530/530898_7241289-hq.mp3||Birds In Light Rain Ambience, Scotland"
  "thunder|352850|morvei01|https://cdn.freesound.org/previews/352/352850_4866079-hq.mp3||Distant Thunder"
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
loop rain    4 56 6     # a few seconds into the fetched slice
loop wind   30 50 6
loop birds  10 62 6

# Thunder is a one shot, not a loop. The strike lands at ~180s in the source,
# so we start just before it and keep the whole tail.
ffmpeg -hide_banner -loglevel error -y -ss 178.5 -t 11 -i "$TMP/thunder.src.mp3" \
  -af "afade=t=in:st=0:d=0.3,afade=t=out:st=8.5:d=2.5,loudnorm=I=-20:TP=-2" \
  "$TMP/thunder.wav"

echo "encoding"
for f in rain wind birds thunder; do
  ffmpeg -hide_banner -loglevel error -y -i "$TMP/$f.wav" \
    -codec:a libmp3lame -b:a 112k -ac 2 "$OUT/$f.mp3"
done
rm -f "$OUT/pad.mp3"

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
