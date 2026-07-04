# Ledger Legends pixel art

Every PNG here is built in **Aseprite** via its Lua scripting API — the
"Storybook Ledger" art set. Source lives in `tools/aseprite/`. Do not
hand-edit the PNGs; edit the Lua builders and re-run:

```bash
# one-time: point ASEPRITE at your aseprite binary if not on PATH
ASEPRITE=/c/Aseprite/build/bin/aseprite.exe tools/aseprite/deploy.sh
```

`deploy.sh` runs `build_all.lua` (which renders into `tools/aseprite/out/`)
and copies the results here. Individual passes:

```bash
aseprite -b -script tools/aseprite/build_tiles.lua      # 23 map tiles
aseprite -b -script tools/aseprite/build_creatures.lua  # player + companions + NPCs + bosses
aseprite -b -script tools/aseprite/build_scenes.lua     # 4 battle backdrops
```

Layout of `tools/aseprite/`:
- `lib.lua` — shared palette (RAMPS), spherical cel-shading, ink outline,
  ground shadow. All assets draw through these so the set stays cohesive.
- `creatures.lua` / `tiles.lua` / `scenes.lua` — per-category builders.
- `build_*.lua` — spec tables that name each asset and call a builder.
- `_orig_backup/` — the previous Pillow-generated PNGs (pre-rebuild).

The old Pillow generator (`tools/gen_rpg_assets.py`) is retained for
reference but is no longer the source of truth.

## Adding new assets (works even for small models)

The generator is built so that new assets are **data, not drawing code**.
Open `tools/gen_rpg_assets.py` and find the `ASSET SPEC TABLES` section:

- **New monster/companion** → add one dict to `CREATURES`. Pick a palette
  ramp and mix-and-match parts; the shared builder handles proportions,
  cel shading and outlines for you:
  ```python
  'boss-newtopic': dict(size=(56, 56), ramp='water', ears='horns',
                        eyes='fierce', wings='membrane', tail='flame',
                        muzzle='grin', blush=False),
  ```
  Options — `ears`: round | pointy | horns | none · `tail`: bushy | spade |
  flame | none · `wings`: membrane | feather | none · `muzzle`: snout |
  beak | grin | none · `eyes`: cute | fierce.
- **New map tile** → add an entry to `TILES` calling an existing recipe
  with new parameters (e.g. another `tile_house` roof colour, a fourth
  `tile_tree` variant), or compose a new recipe from the primitives.
- **New battle backdrop** → copy the closest `scene_*` function, swap the
  palette ramps and elements, register it in `SCENES`.
- **New colour scheme** → add a 5–6 step ramp (dark→light) to `RAMPS`.
  Shadows should shift cooler, highlights warmer — sample the existing
  ramps and keep similar lightness steps.

The style contract (light from top-left, selective dark-plum outlines,
ground shadows, clump-based texture, ramp-only colours) is documented in
the generator's docstring and enforced by the shared helpers — stick to
`shaded_ellipse` / `shaded_poly` / `grass_tufts` / `outline` and new art
will match the existing set.

## Wiring assets into the game

- Tiles are referenced from `rpg-demo.css` (`.rpg-tile-*` rules). Tiles
  with multiple variants get `.rpg-vN` modifier rules; the variant count
  lives in `TILE_VARIANTS` in `rpg-demo.js`.
- Creatures/bosses are matched by `data-mon` attribute in `rpg-demo.css`
  (`.rpg-sprite[data-mon='...']`).
- Scenes are used by `.rpg-backdrop-*` and `.rpg-region-*` rules.
- Keep `image-rendering: pixelated` and integer-ish scaling so the art
  stays crisp.
