/* Ledger Legends — hybrid canvas world renderer.
   Draws the world map (ground -> y-sorted objects/buildings/sprites) to a <canvas>,
   with a camera that follows the player. rpg-demo.js owns all state, movement,
   collision and interaction; it injects a small "world API" via RPGWorld.init() and
   calls RPGWorld.render() when the world changes. Battle/dialogue UI stay in DOM. */
(function () {
  'use strict';
  var TILE = 32;                 // px per tile (buildings are 16px/tile native -> 2x)
  var A = 'rpg-assets/';
  var W = null, imgs = {}, redraw = null;

  function img(name) {
    if (imgs[name]) return imgs[name];
    var im = new Image(); imgs[name] = im;
    im.onload = im.onerror = function () { if (redraw) redraw(); };
    im.src = A + name + '.png';
    return im;
  }
  function ready(im) { return im && im.complete && im.naturalWidth > 0; }
  function variant(list, x, y) { return list[(x * 31 + y * 17) % list.length]; }

  function groundName(t, x, y) {
    var V = W.TILE_VARIANTS;
    switch (t) {
      case 'grass': return 'tile-grass-' + variant(V.grass, x, y);
      case 'flower': return 'tile-flower-' + variant(V.flower, x, y);
      case 'path': return 'tile-path-' + W.roadShape(x, y) + '-' + (((x * 7 + y * 13) % 3) + 1);
      case 'pond': return 'tile-pond-' + variant(V.pond, x, y);
      case 'crop': return 'tile-crop-' + variant(V.crop, x, y);
      case 'flowerbed': return 'tile-flowerbed-' + variant(V.flowerbed, x, y);
      case 'factory-wall': return 'tile-factory-wall-' + variant(V['factory-wall'], x, y);
    }
    return null;
  }
  function objectSpec(t, x, y) {
    var V = W.TILE_VARIANTS;
    switch (t) {
      case 'tree': return { name: 'tile-tree-' + variant(V.tree, x, y), hT: 1.5, frames: 2 };
      case 'rock': return { name: 'tile-rock-' + variant(V.rock, x, y), hT: 1, frames: 1 };
      case 'bush': return { name: 'tile-bush-' + variant(V.bush, x, y), hT: 1, frames: 1 };
      case 'mushroom': return { name: 'tile-mushroom-' + variant(V.mushroom, x, y), hT: 1, frames: 1 };
      case 'barrel': return { name: 'tile-barrel-' + variant(V.barrel, x, y), hT: 1, frames: 1 };
      case 'well': return { name: 'tile-well', hT: 1.5, frames: 2 };
      case 'fountain': return { name: 'tile-fountain', hT: 1.5, frames: 2 };
      case 'pathlamp': return { name: 'tile-pathlamp', hT: 1.5, frames: 2 };
      case 'sign': return { name: 'tile-sign', hT: 1.5, frames: 1 };
      case 'ledger-stone': return { name: 'tile-ledger-stone', hT: 1.5, frames: 1 };
      case 'fence': return { name: 'tile-fence', hT: 1, frames: 1 };
    }
    return null;
  }

  function drawFrame(ctx, im, frames, dx, dy, dw, dh) {
    var fw = im.naturalWidth / (frames || 1);
    ctx.drawImage(im, 0, 0, fw, im.naturalHeight, dx, dy, dw, dh);
  }
  function drawChar(ctx, name, frames, tx, ty) {
    var im = img(name); if (!ready(im)) return;
    var fw = im.naturalWidth / frames;
    var w = TILE, h = TILE * (im.naturalHeight / fw);   // 1 tile wide, keep aspect
    drawFrame(ctx, im, frames, tx * TILE, (ty + 1) * TILE - h, w, h);
  }
  function label(ctx, text, tx, ty) {
    if (!text) return;
    ctx.font = 'bold 9px system-ui, sans-serif';
    var w = ctx.measureText(text).width + 8, cx = (tx + 0.5) * TILE, top = ty * TILE - 13;
    ctx.fillStyle = 'rgba(15,23,42,.82)'; ctx.fillRect(cx - w / 2, top, w, 12);
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1; ctx.strokeRect(cx - w / 2, top, w, 12);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, cx, top + 6);
  }

  var RPGWorld = {
    init: function (api) { W = api; },
    render: function (canvas, d) {
      if (!W) return;
      redraw = function () { RPGWorld.render(canvas, d); };
      var ctx = canvas.getContext('2d');
      var box = canvas.getBoundingClientRect();
      var cw = Math.max(1, Math.round(box.width)), ch = Math.max(1, Math.round(box.height));
      if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, cw, ch);

      var mapW = W.MAP_W * TILE, mapH = W.MAP_H * TILE;
      var camX = Math.round((d.pos.x + 0.5) * TILE - cw / 2);
      var camY = Math.round((d.pos.y + 0.5) * TILE - ch / 2);
      camX = Math.max(0, Math.min(camX, Math.max(0, mapW - cw)));
      camY = Math.max(0, Math.min(camY, Math.max(0, mapH - ch)));
      ctx.save(); ctx.translate(-camX, -camY);

      var x0 = Math.max(0, (camX / TILE) | 0), x1 = Math.min(W.MAP_W - 1, ((camX + cw) / TILE | 0) + 1);
      var y0 = Math.max(0, (camY / TILE) | 0), y1 = Math.min(W.MAP_H - 1, ((camY + ch) / TILE | 0) + 3);
      var grass = img('tile-grass-1'), x, y;

      // LAYER 1 — ground (base tile ignores npc/boss overrides)
      for (y = y0; y <= y1; y++) for (x = x0; x <= x1; x++) {
        var bt = W.baseTile(x, y);
        var gname = groundName(bt, x, y);
        var selfCover = (bt === 'path' || bt === 'pond' || bt === 'factory-wall' || bt === 'flower' || bt === 'crop' || bt === 'flowerbed');
        if (!selfCover && ready(grass)) ctx.drawImage(grass, x * TILE, y * TILE, TILE, TILE);
        if (gname) { var gi = img(gname); if (ready(gi)) ctx.drawImage(gi, x * TILE, y * TILE, TILE, TILE); }
      }

      // LAYER 2/3 — y-sorted objects, buildings, npcs, player
      var draw = [];
      for (y = y0; y <= y1; y++) for (x = x0; x <= x1; x++) {
        if (W.buildingCovers(x, y)) continue;                 // building footprints hide old props
        var spec = objectSpec(W.tileType(x, y), x, y);
        if (spec) draw.push({ base: y, kind: 'obj', spec: spec, x: x, y: y });
      }
      (W.BUILDINGS || []).forEach(function (b) { draw.push({ base: b.y + b.fh - 0.5, kind: 'build', b: b }); });
      var k;
      for (k in W.NPCS) if (W.NPCS.hasOwnProperty(k)) {
        var n = W.NPCS[k];
        draw.push({ base: n.y, kind: 'npc', n: n, dir: (d.npcDir && d.npcDir[k]) || 'down' });
      }
      draw.push({ base: d.pos.y, kind: 'player' });
      draw.sort(function (p, q) { return p.base - q.base; });

      draw.forEach(function (o) {
        if (o.kind === 'obj') {
          var im = img(o.spec.name); if (!ready(im)) return;
          var h = o.spec.hT * TILE;
          drawFrame(ctx, im, o.spec.frames, o.x * TILE, (o.y + 1) * TILE - h, TILE, h);
        } else if (o.kind === 'build') {
          var bi = img(o.b.sprite.replace(/\.png$/, '')); if (!ready(bi)) return;
          var bw = o.b.fw * TILE, bh = bw * (bi.naturalHeight / bi.naturalWidth);
          ctx.drawImage(bi, o.b.x * TILE, (o.b.y + o.b.fh) * TILE - bh, bw, bh);
        } else if (o.kind === 'npc') {
          drawChar(ctx, 'npc-' + o.n.mon + '-' + o.dir, 2, o.n.x, o.n.y);
          label(ctx, o.n.tag, o.n.x, o.n.y);
        } else {
          drawChar(ctx, 'char-player-' + (d.dir || 'down'), 4, d.pos.x, d.pos.y);
        }
      });
      // boss/region labels
      var id;
      for (id in W.MAP_NODES) if (W.MAP_NODES.hasOwnProperty(id)) {
        var nd = W.MAP_NODES[id]; label(ctx, nd.short, nd.x, nd.y);
      }
      ctx.restore();
      RPGWorld._cam = { x: camX, y: camY };
    },
    tileAt: function (canvas, clientX, clientY) {
      var box = canvas.getBoundingClientRect(), cam = RPGWorld._cam || { x: 0, y: 0 };
      return { x: Math.floor((clientX - box.left + cam.x) / TILE), y: Math.floor((clientY - box.top + cam.y) / TILE) };
    },
    TILE: TILE
  };
  window.RPGWorld = RPGWorld;
}());
