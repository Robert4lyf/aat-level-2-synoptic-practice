#!/bin/bash
# Regenerate all Ledger Legends art in Aseprite, then copy into rpg-assets/.
set -e
ASE="${ASEPRITE:-/c/Aseprite/build/bin/aseprite.exe}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$ASE" -b -script "$HERE/build_all.lua"
for f in "$HERE"/out/*.png; do b=$(basename "$f"); [[ "$b" == _* ]] && continue; cp "$f" "$HERE/../../rpg-assets/$b"; done
echo "Deployed $(ls "$HERE"/out/*.png | grep -vc '/_') assets to rpg-assets/"
