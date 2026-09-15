#!/usr/bin/env bash
# Generates every ambience loop from scratch with ffmpeg. Nothing is sampled or
# downloaded, so there is no attribution to carry and no licence to honour: rain
# and wind are shaped noise, the pad is detuned sine stacks.
#
#   ./scripts/build-audio.sh
#
# Writes mono/stereo mp3 into public/audio/. Re-runnable.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/audio
mkdir -p "$OUT"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

say() { printf '  %s\n' "$1"; }

# --- rain -------------------------------------------------------------------
# Pink noise band-limited to the range rain actually occupies, with a slow
# tremolo so it breathes instead of hissing flatly.
say "rain"
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "anoisesrc=d=30:c=pink:r=44100:a=0.30" \
  -af "highpass=f=380,lowpass=f=8500,tremolo=f=0.13:d=0.14,volume=0.85" \
  -ac 1 "$TMP/rain.wav"

# --- wind -------------------------------------------------------------------
# Brown noise, heavily low-passed, with a slower and deeper swell than the rain
# so the two do not pulse in sync. 0.1 Hz is ffmpeg's slowest tremolo.
say "wind"
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "anoisesrc=d=30:c=brown:r=44100:a=0.55" \
  -af "lowpass=f=620,tremolo=f=0.1:d=0.6,volume=0.8" \
  -ac 1 "$TMP/wind.wav"

# --- distant thunder (one shot) ---------------------------------------------
# A brown-noise rumble under 170 Hz, with a fast attack, a long tail, and two
# echoes standing in for the sound bouncing off distance.
say "thunder"
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "anoisesrc=d=8:c=brown:r=44100:a=0.95" \
  -af "lowpass=f=170,afade=t=in:st=0:d=0.06,afade=t=out:st=1.4:d=6.4,aecho=0.8:0.9:220|430:0.40|0.22,volume=1.5" \
  -ac 1 "$TMP/thunder.wav"

# --- music pad --------------------------------------------------------------
# A minor: A2 E3 A3 C4, each doubled a few cents off so the stack beats gently
# instead of sitting still. The whole loop swells from silence and returns to
# it, which is what makes the loop point inaudible.
say "pad"
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i "sine=frequency=110.00:duration=40" \
  -f lavfi -i "sine=frequency=164.81:duration=40" \
  -f lavfi -i "sine=frequency=220.00:duration=40" \
  -f lavfi -i "sine=frequency=261.63:duration=40" \
  -f lavfi -i "sine=frequency=110.35:duration=40" \
  -f lavfi -i "sine=frequency=220.62:duration=40" \
  -filter_complex "[0][1][2][3][4][5]amix=inputs=6:normalize=0,\
volume=0.22,lowpass=f=1600,\
aecho=0.85:0.9:520|880:0.35|0.22,\
afade=t=in:st=0:d=9,afade=t=out:st=31:d=9" \
  -ac 2 "$TMP/pad.wav"

# --- encode -----------------------------------------------------------------
for f in rain wind thunder; do
  ffmpeg -hide_banner -loglevel error -y -i "$TMP/$f.wav" \
    -codec:a libmp3lame -b:a 96k -ac 1 "$OUT/$f.mp3"
done
ffmpeg -hide_banner -loglevel error -y -i "$TMP/pad.wav" \
  -codec:a libmp3lame -b:a 112k -ac 2 "$OUT/pad.mp3"

ls -la "$OUT"
