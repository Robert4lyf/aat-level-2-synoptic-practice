# Build a self-contained before/after gallery HTML for the Ledger Legends rebuild.
import base64, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
NEW  = os.path.join(ROOT, "rpg-assets")
OLD  = os.path.join(os.path.dirname(__file__), "_orig_backup")
OUTHTML = os.path.join(os.path.dirname(__file__), "gallery.html")

def uri(path):
    with open(path,"rb") as f:
        return "data:image/png;base64,"+base64.b64encode(f.read()).decode()

GROUPS = [
    ("Your party", "The accountant and the three starter companions you raise.", 4,
     ["char-player","char-cub","char-fox","char-mole"]),
    ("Topic bosses", "One guardian per exam topic — the fights you train for.", 3,
     ["boss-itbk","boss-poc","boss-besy","boss-pobc"]),
    ("Townsfolk", "The NPCs who run the town, each a distinct critter.", 3,
     ["npc-quill","npc-scribe","npc-warden","npc-clerk","npc-mayor","npc-merchant"]),
    ("Map tiles", "The 32×32 pieces the overworld is built from.", 4,
     ["tile-grass-1","tile-grass-2","tile-grass-3","tile-path-1","tile-path-2",
      "tile-flower-1","tile-flower-2","tile-tree-1","tile-tree-2","tile-tree-3",
      "tile-rock","tile-sign","tile-book","tile-well","tile-ledger-stone","tile-pathlamp",
      "tile-house-1","tile-house-2","tile-factory-wall","tile-gate-forest","tile-gate-cave",
      "tile-gate-factory","tile-gate-town"]),
    ("Battle backdrops", "160×96 scenes that set each encounter.", 2,
     ["scene-forest","scene-cave","scene-factory","scene-town"]),
]

def card(name):
    new_u = uri(os.path.join(NEW, name+".png"))
    old_u = uri(os.path.join(OLD, name+".png"))
    scene = name.startswith("scene")
    cls = "card scene" if scene else "card"
    return f'''<figure class="{cls}">
      <div class="stage">
        <img class="old" src="{old_u}" alt="{name} before" loading="lazy">
        <img class="new" src="{new_u}" alt="{name} after" loading="lazy">
      </div>
      <figcaption>{name}</figcaption>
    </figure>'''

sections = []
for title, sub, cols, names in GROUPS:
    cards = "\n".join(card(n) for n in names)
    sections.append(f'''<section>
      <div class="sec-head">
        <h2>{title}</h2><p>{sub}</p>
        <span class="count">{len(names)}</span>
      </div>
      <div class="grid cols-{cols}">{cards}</div>
    </section>''')

HTML = f'''<title>Ledger Legends — Art Rebuild</title>
<style>
:root{{
  --bg:#f3efe6; --panel:#fbf8f1; --line:#e2dccd; --ink:#2a2333; --muted:#6f6780;
  --gold:#c98a12; --emer:#2f9d55; --checkA:#e8e2d4; --checkB:#f2eee3;
  --shadow:0 1px 0 #fff,0 12px 30px -18px rgba(40,28,50,.45);
}}
@media (prefers-color-scheme:dark){{:root{{
  --bg:#151220; --panel:#1e1b2e; --line:#312b45; --ink:#f2e4bd; --muted:#9b90b4;
  --gold:#f6ca45; --emer:#46d06a; --checkA:#252036; --checkB:#2c2740;
  --shadow:inset 0 1px 0 rgba(255,255,255,.04),0 16px 34px -20px rgba(0,0,0,.7);
}}}}
:root[data-theme=light]{{
  --bg:#f3efe6;--panel:#fbf8f1;--line:#e2dccd;--ink:#2a2333;--muted:#6f6780;
  --gold:#c98a12;--emer:#2f9d55;--checkA:#e8e2d4;--checkB:#f2eee3;
  --shadow:0 1px 0 #fff,0 12px 30px -18px rgba(40,28,50,.45);
}}
:root[data-theme=dark]{{
  --bg:#151220;--panel:#1e1b2e;--line:#312b45;--ink:#f2e4bd;--muted:#9b90b4;
  --gold:#f6ca45;--emer:#46d06a;--checkA:#252036;--checkB:#2c2740;
  --shadow:inset 0 1px 0 rgba(255,255,255,.04),0 16px 34px -20px rgba(0,0,0,.7);
}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--ink);
  font-family:ui-sans-serif,system-ui,"Segoe UI",Roboto,sans-serif;line-height:1.5}}
.mono{{font-family:ui-monospace,"SFMono-Regular","Consolas","Courier New",monospace}}
header{{max-width:1100px;margin:0 auto;padding:48px 24px 8px}}
.eyebrow{{font-family:ui-monospace,monospace;letter-spacing:.32em;text-transform:uppercase;
  font-size:12px;color:var(--gold);margin:0 0 10px}}
h1{{font-family:ui-monospace,"Consolas",monospace;font-weight:800;letter-spacing:.02em;
  font-size:clamp(30px,5vw,52px);margin:0;text-wrap:balance;line-height:1.05}}
h1 .amp{{color:var(--muted)}}
.lede{{max-width:60ch;color:var(--muted);margin:16px 0 0;font-size:16px}}
.bar{{position:sticky;top:0;z-index:5;backdrop-filter:blur(8px);
  background:color-mix(in srgb,var(--bg) 82%,transparent);border-bottom:1px solid var(--line);
  margin-top:28px}}
.bar .in{{max-width:1100px;margin:0 auto;padding:12px 24px;display:flex;gap:16px;
  align-items:center;flex-wrap:wrap}}
.seg{{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden;
  background:var(--panel)}}
.seg button{{font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.12em;
  text-transform:uppercase;padding:8px 16px;border:0;background:transparent;color:var(--muted);
  cursor:pointer}}
.seg button[aria-pressed=true]{{background:var(--gold);color:#1a1526}}
.hint{{font-size:13px;color:var(--muted)}}
.hint b{{color:var(--ink);font-weight:600}}
main{{max-width:1100px;margin:0 auto;padding:8px 24px 80px}}
section{{margin-top:44px}}
.sec-head{{display:flex;align-items:baseline;gap:14px;border-bottom:1px solid var(--line);
  padding-bottom:10px;margin-bottom:22px;flex-wrap:wrap}}
.sec-head h2{{font-family:ui-monospace,"Consolas",monospace;font-size:20px;margin:0;letter-spacing:.01em}}
.sec-head p{{margin:0;color:var(--muted);font-size:14px;flex:1;min-width:180px}}
.count{{font-family:ui-monospace,monospace;font-variant-numeric:tabular-nums;color:var(--gold);
  border:1px solid var(--line);border-radius:8px;padding:2px 9px;font-size:13px}}
.grid{{display:grid;gap:16px}}
.cols-2{{grid-template-columns:repeat(2,1fr)}}
.cols-3{{grid-template-columns:repeat(3,1fr)}}
.cols-4{{grid-template-columns:repeat(4,1fr)}}
@media(max-width:820px){{.cols-3,.cols-4{{grid-template-columns:repeat(2,1fr)}}}}
@media(max-width:520px){{.cols-2,.cols-3,.cols-4{{grid-template-columns:1fr}}}}
.card{{background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden;
  box-shadow:var(--shadow)}}
.stage{{position:relative;aspect-ratio:1/1;display:grid;place-items:center;
  background-color:var(--checkA);
  background-image:linear-gradient(45deg,var(--checkB) 25%,transparent 25%,transparent 75%,var(--checkB) 75%),
    linear-gradient(45deg,var(--checkB) 25%,transparent 25%,transparent 75%,var(--checkB) 75%);
  background-size:20px 20px;background-position:0 0,10px 10px}}
.scene .stage{{aspect-ratio:160/96}}
.stage img{{image-rendering:pixelated;width:auto;height:82%;max-width:92%;object-fit:contain;
  transition:opacity .18s ease}}
.scene .stage img{{height:auto;width:100%}}
.stage .old{{position:absolute;opacity:0}}
/* mode: new (default) shows new; before shows old; compare = hover swaps */
:root[data-mode=before] .stage .new{{opacity:0}}
:root[data-mode=before] .stage .old{{opacity:1}}
:root[data-mode=compare] .card:hover .new{{opacity:0}}
:root[data-mode=compare] .card:hover .old{{opacity:1}}
:root[data-mode=compare] .stage::after{{content:"hover";position:absolute;top:8px;right:8px;
  font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--muted);opacity:.6}}
figcaption{{font-family:ui-monospace,monospace;font-size:12px;color:var(--muted);
  padding:9px 12px;border-top:1px solid var(--line);letter-spacing:.02em}}
footer{{max-width:1100px;margin:0 auto;padding:0 24px 60px;color:var(--muted);font-size:13px}}
footer code{{font-family:ui-monospace,monospace;color:var(--ink);background:var(--panel);
  border:1px solid var(--line);border-radius:6px;padding:1px 6px}}
@media(prefers-reduced-motion:reduce){{.stage img{{transition:none}}}}
</style>

<header>
  <p class="eyebrow">Ledger Legends · asset rebuild</p>
  <h1>41 sprites, rebuilt from scratch <span class="amp">in</span> Aseprite</h1>
  <p class="lede">The whole cast, tileset and battle backdrops, redrawn in one cohesive
  “Storybook Ledger” style — rounder mascots, thicker ink outlines, a single shared
  storybook palette, and paper-and-ink accents that nod to the accounting theme. Same
  filenames and pixel dimensions, so it drops straight into the game.</p>
</header>

<div class="bar"><div class="in">
  <div class="seg" role="group" aria-label="View mode">
    <button data-mode="new" aria-pressed="true">After</button>
    <button data-mode="before" aria-pressed="false">Before</button>
    <button data-mode="compare" aria-pressed="false">Compare</button>
  </div>
  <span class="hint" id="hint"><b>After</b> — the new set. Switch to <b>Before</b> to see the originals.</span>
</div></div>

<main>
{''.join(sections)}
</main>

<footer>
  Rebuilt via Aseprite’s Lua API. Source in <code>tools/aseprite/</code>,
  regenerate with <code>tools/aseprite/deploy.sh</code>. Originals preserved in
  <code>tools/aseprite/_orig_backup/</code>.
</footer>

<script>
const root=document.documentElement, hint=document.getElementById('hint');
const texts={{
  new:'<b>After</b> — the new set. Switch to <b>Before</b> to see the originals.',
  before:'<b>Before</b> — the original procedural art, for comparison.',
  compare:'<b>Compare</b> — hover any sprite to peek the original underneath.'
}};
root.setAttribute('data-mode','new');
document.querySelectorAll('.seg button').forEach(b=>{{
  b.addEventListener('click',()=>{{
    const m=b.dataset.mode; root.setAttribute('data-mode',m);
    document.querySelectorAll('.seg button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    hint.innerHTML=texts[m];
  }});
}});
</script>'''

with open(OUTHTML,"w",encoding="utf-8") as f:
    f.write(HTML)
print("wrote", OUTHTML, os.path.getsize(OUTHTML)//1024, "KB")
