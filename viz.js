/* =========================================================
   Rocketree — Visualization layer
   Neural-network / node-graph symbolism for ESG.
   All graphics are generated as inline SVG and themed via
   the sage palette below (mirrors the brand stylescape).
   ========================================================= */
(function () {
  'use strict';

  var C = {
    dark:  '#0f2e1f',   // klar — dark forest (pills, hubs)
    deep:  '#16412a',
    mid:   '#3f8f57',   // ruhig — active green
    soft:  '#88b98d',   // intelligent — sage
    faint: '#bcd6b7',   // faint nodes
    line:  '#a8c8a3',   // connection lines
    dot:   '#d6e8d0',   // background dots
    cream: '#eef3ec',
    ink:   '#1c2b22',
    white: '#ffffff',
    border:'#dde8da'
  };
  var FF = 'Hanken Grotesk, system-ui, sans-serif';

  /* seeded RNG so layouts are stable across reloads */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function estW(t, fs) { return Math.round(t.length * fs * 0.56) + 30; }

  /* ---------------------------------------------------------
     1. HERO — neural constellation
     topics → "Gemeinsames Verständnis" → "Handlungsfähigkeit"
  --------------------------------------------------------- */
  function heroNet() {
    var W = 680, H = 600;
    var cx = 338, cyTop = 212;          // center pill
    var lx = 360, ly = 452;             // lower pill
    var r = rng(7);
    var parts = [];

    // background mesh nodes (center-biased)
    var pts = [];
    for (var i = 0; i < 44; i++) {
      var a = r() * Math.PI * 2, rad = 60 + r() * 250;
      var x = cx + Math.cos(a) * rad * (0.9 + r() * 0.5);
      var y = (cyTop + 60) + Math.sin(a) * rad * 0.78;
      x = Math.max(24, Math.min(W - 24, x));
      y = Math.max(36, Math.min(H - 30, y));
      pts.push({ x: x, y: y, s: 1.4 + r() * 3 });
    }
    // mesh edges (nearest neighbours)
    var edges = [];
    for (var p = 0; p < pts.length; p++) {
      var best = []; 
      for (var q = 0; q < pts.length; q++) {
        if (p === q) continue;
        var d = Math.hypot(pts[p].x - pts[q].x, pts[p].y - pts[q].y);
        best.push({ q: q, d: d });
      }
      best.sort(function (a, b) { return a.d - b.d; });
      for (var k = 0; k < 2; k++) {
        if (best[k] && best[k].d < 120 && p < best[k].q) edges.push({ a: p, b: best[k].q, d: best[k].d });
      }
    }
    edges.forEach(function (e) {
      var o = 0.30 - (e.d / 120) * 0.18;
      parts.push('<line x1="' + pts[e.a].x.toFixed(1) + '" y1="' + pts[e.a].y.toFixed(1) +
        '" x2="' + pts[e.b].x.toFixed(1) + '" y2="' + pts[e.b].y.toFixed(1) +
        '" stroke="' + C.line + '" stroke-width="1" stroke-opacity="' + o.toFixed(2) + '"/>');
    });
    pts.forEach(function (pt, i) {
      var fill = i % 7 === 0 ? C.mid : (i % 3 === 0 ? C.soft : C.dot);
      parts.push('<circle class="vn-dot" cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) +
        '" r="' + pt.s.toFixed(1) + '" fill="' + fill + '" style="--d:' + (i % 9) + '"/>');
    });

    // topic pills + curved connectors to center
    var topics = [
      { t: 'CSRD', x: 232, y: 66 },
      { t: 'Reporting', x: 486, y: 78 },
      { t: 'Audit', x: 556, y: 166 },
      { t: 'Lieferkette', x: 116, y: 150 },
      { t: 'CO₂', x: 132, y: 270 },
      { t: 'Einkauf', x: 556, y: 286 },
      { t: 'HR', x: 436, y: 344 },
      { t: 'HR', x: 206, y: 372 }
    ];
    // connectors (behind pills)
    topics.forEach(function (tp) {
      var mx = (tp.x + cx) / 2 + (r() - 0.5) * 40;
      var my = (tp.y + cyTop) / 2 - 18;
      parts.push('<path class="vn-link" d="M' + tp.x + ',' + tp.y + ' Q' + mx.toFixed(0) + ',' + my.toFixed(0) +
        ' ' + cx + ',' + cyTop + '" fill="none" stroke="' + C.line + '" stroke-width="1.3" stroke-opacity="0.5"/>');
    });
    // connector center → lower
    parts.push('<path class="vn-link" d="M' + cx + ',' + (cyTop + 26) + ' Q' + (cx + 26) + ',' + ((cyTop + ly) / 2) +
      ' ' + lx + ',' + (ly - 24) + '" fill="none" stroke="' + C.mid + '" stroke-width="1.6" stroke-opacity="0.55"/>');
    parts.push('<path class="vn-link" d="M' + (cx - 8) + ',' + (cyTop + 26) + ' Q' + (cx - 40) + ',' + ((cyTop + ly) / 2 + 14) +
      ' ' + (lx - 18) + ',' + (ly - 22) + '" fill="none" stroke="' + C.line + '" stroke-width="1.2" stroke-opacity="0.4"/>');

    // ripples under lower pill
    for (var rp = 0; rp < 4; rp++) {
      parts.push('<ellipse class="vn-ripple" cx="' + lx + '" cy="' + (ly + 34) + '" rx="' + (40 + rp * 34) +
        '" ry="' + (10 + rp * 8) + '" fill="none" stroke="' + C.soft + '" stroke-width="1.3" stroke-opacity="' +
        (0.5 - rp * 0.1).toFixed(2) + '" style="--d:' + rp + '"/>');
    }

    // topic pills
    topics.forEach(function (tp, i) {
      var fs = 15, w = estW(tp.t, fs), h = 33;
      parts.push('<g class="vn-pill" style="--d:' + (i % 6) + '">' +
        '<circle cx="' + tp.x + '" cy="' + tp.y + '" r="3.4" fill="' + C.mid + '"/>' +
        '<rect x="' + (tp.x - w / 2) + '" y="' + (tp.y - h / 2 - 26) + '" width="' + w + '" height="' + h +
        '" rx="' + (h / 2) + '" fill="#fff" stroke="' + C.border + '"/>' +
        '<text x="' + tp.x + '" y="' + (tp.y - 26) + '" text-anchor="middle" dominant-baseline="central" font-family="' + FF +
        '" font-size="' + fs + '" font-weight="600" fill="#26352b">' + tp.t + '</text></g>');
    });
    // raise topic pills above mesh: pills already added after; but connector dots ok

    // center pill (dark, two lines)
    var cw = 176, ch = 64;
    parts.push('<g class="vn-core"><rect x="' + (cx - cw / 2) + '" y="' + (cyTop - ch / 2) + '" width="' + cw + '" height="' + ch +
      '" rx="18" fill="' + C.dark + '"/>' +
      '<text x="' + cx + '" y="' + cyTop + '" text-anchor="middle" font-family="' + FF + '" font-size="17" font-weight="700" fill="#fff">' +
      '<tspan x="' + cx + '" dy="-7">Gemeinsames</tspan><tspan x="' + cx + '" dy="20">Verständnis</tspan></text></g>');

    // lower pill (dark)
    var lt = 'Handlungsfähigkeit', lw = estW(lt, 17) + 16, lh = 46;
    parts.push('<g class="vn-core"><rect x="' + (lx - lw / 2) + '" y="' + (ly - lh / 2) + '" width="' + lw + '" height="' + lh +
      '" rx="14" fill="' + C.dark + '"/>' +
      '<text x="' + lx + '" y="' + ly + '" text-anchor="middle" dominant-baseline="central" font-family="' + FF +
      '" font-size="17" font-weight="700" fill="#fff">' + lt + '</text></g>');

    return svg(W, H, parts.join(''), 'vn-hero');
  }

  /* ---------------------------------------------------------
     2. JOURNEY phase infographics
  --------------------------------------------------------- */
  function phaseScatter() {
    var W = 224, H = 150, r = rng(21), parts = [];
    for (var i = 0; i < 52; i++) {
      var x = 14 + r() * (W - 28), y = 12 + r() * (H - 24);
      var s = 1.3 + r() * 3.2;
      var fill = i % 6 === 0 ? C.mid : (i % 3 === 0 ? C.soft : C.faint);
      parts.push('<circle class="vp-dot" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + s.toFixed(1) +
        '" fill="' + fill + '" style="--d:' + (i % 10) + '"/>');
    }
    return svg(W, H, parts.join(''), 'vp');
  }
  function phaseNetwork() {
    var W = 224, H = 150, parts = [], cx = 112, cy = 74, r = rng(5);
    var sats = [];
    for (var i = 0; i < 7; i++) {
      var a = (i / 7) * Math.PI * 2 + 0.4, rad = 42 + (i % 2) * 12;
      sats.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.86, r: 4 + r() * 3 });
    }
    sats.forEach(function (s) {
      parts.push('<line class="vp-link" x1="' + cx + '" y1="' + cy + '" x2="' + s.x.toFixed(1) + '" y2="' + s.y.toFixed(1) +
        '" stroke="' + C.line + '" stroke-width="1.3" stroke-opacity="0.7"/>');
    });
    // child dots
    sats.forEach(function (s, i) {
      if (i % 2) return;
      var a = r() * 6.28, ox = s.x + Math.cos(a) * 16, oy = s.y + Math.sin(a) * 16;
      parts.push('<line x1="' + s.x.toFixed(1) + '" y1="' + s.y.toFixed(1) + '" x2="' + ox.toFixed(1) + '" y2="' + oy.toFixed(1) +
        '" stroke="' + C.line + '" stroke-width="1" stroke-opacity="0.5"/>');
      parts.push('<circle class="vp-dot" cx="' + ox.toFixed(1) + '" cy="' + oy.toFixed(1) + '" r="2.6" fill="' + C.faint + '"/>');
    });
    sats.forEach(function (s, i) {
      parts.push('<circle class="vp-node" cx="' + s.x.toFixed(1) + '" cy="' + s.y.toFixed(1) + '" r="' + s.r.toFixed(1) +
        '" fill="' + (i % 2 ? C.soft : C.mid) + '" style="--d:' + i + '"/>');
    });
    parts.push('<circle class="vp-hub" cx="' + cx + '" cy="' + cy + '" r="11" fill="' + C.dark + '"/>');
    return svg(W, H, parts.join(''), 'vp');
  }
  function phaseRings() {
    var W = 224, H = 150, parts = [], cx = 112, cy = 74;
    for (var i = 4; i >= 1; i--) {
      parts.push('<circle class="vp-ring" cx="' + cx + '" cy="' + cy + '" r="' + (i * 17) +
        '" fill="none" stroke="' + C.soft + '" stroke-width="1.4" stroke-opacity="' + (0.65 - i * 0.1).toFixed(2) +
        '" style="--d:' + i + '"/>');
    }
    // dots on rings
    var r = rng(9);
    [1, 2, 3].forEach(function (ring) {
      var n = ring + 1;
      for (var j = 0; j < n; j++) {
        var a = r() * 6.28, x = cx + Math.cos(a) * ring * 17, y = cy + Math.sin(a) * ring * 17;
        parts.push('<circle class="vp-dot" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3" fill="' + C.mid + '"/>');
      }
    });
    parts.push('<circle class="vp-hub" cx="' + cx + '" cy="' + cy + '" r="9" fill="' + C.dark + '"/>');
    return svg(W, H, parts.join(''), 'vp');
  }

  /* ---------------------------------------------------------
     3. MIND-MAP — "Beispiel: Arbeitsbereich"
  --------------------------------------------------------- */
  function mindMap() {
    var W = 1060, H = 600, parts = [];

    // app frame
    parts.push('<rect x="1" y="1" width="' + (W - 2) + '" height="' + (H - 2) + '" rx="22" fill="' + C.white + '" stroke="' + C.border + '"/>');
    parts.push('<line x1="0" y1="52" x2="' + W + '" y2="52" stroke="' + C.border + '" stroke-opacity="0.7"/>');
    ['#e2b4b0', '#e9cf9a', '#aacb9f'].forEach(function (c, i) {
      parts.push('<circle cx="' + (28 + i * 20) + '" cy="26" r="5.5" fill="' + c + '"/>');
    });
    parts.push('<text x="84" y="31" font-family="' + FF + '" font-size="15" font-weight="600" fill="#7d8b81">Beispiel: Arbeitsbereich</text>');

    // sidebar
    parts.push('<rect x="20" y="70" width="46" height="' + (H - 92) + '" rx="14" fill="' + C.cream + '"/>');
    for (var s = 0; s < 7; s++) {
      var sy = 96 + s * 56;
      parts.push('<rect x="31" y="' + sy + '" width="24" height="24" rx="7" fill="' + (s === 3 ? C.mid : '#dbe8d6') + '"/>');
    }

    var nodes = [
      { t: ['Doppelte', 'Wesentlichkeit'], x: 196, y: 132 },
      { t: ['Lieferkette &', 'Menschenrechte'], x: 470, y: 96 },
      { t: ['Datenerhebung', '& Kennzahlen'], x: 812, y: 138 },
      { t: ['Rollen &', 'Verantwortungen'], x: 214, y: 452 },
      { t: ['Regulatorische', 'Anforderungen'], x: 470, y: 492 },
      { t: ['Nächste', 'Schritte'], x: 824, y: 452 }
    ];
    var core = { x: 540, y: 300, w: 188, h: 78 };

    // connectors (behind cards)
    nodes.forEach(function (n, i) {
      var cardW = 196;
      var sx = n.x + (n.x < core.x ? cardW / 2 : (n.x > core.x ? -cardW / 2 : 0));
      sx = n.x; // connect to card center horizontally, simpler organic curve
      var ex = core.x, ey = core.y;
      var mx = (n.x + core.x) / 2, my = (n.y + core.y) / 2;
      parts.push('<path class="vm-link" style="--d:' + i + '" d="M' + n.x + ',' + n.y + ' Q' + mx + ',' + n.y + ' ' + mx + ',' + my +
        ' T' + ex + ',' + ey + '" fill="none" stroke="' + C.line + '" stroke-width="1.6" stroke-opacity="0.7"/>');
      parts.push('<circle cx="' + n.x + '" cy="' + n.y + '" r="3.2" fill="' + C.soft + '"/>');
    });

    // cards
    nodes.forEach(function (n, i) {
      parts.push(card(n.x, n.y, n.t, false, i));
    });
    // core node
    parts.push('<g class="vm-core"><rect x="' + (core.x - core.w / 2) + '" y="' + (core.y - core.h / 2) + '" width="' + core.w +
      '" height="' + core.h + '" rx="16" fill="' + C.dark + '"/>' +
      '<text x="' + core.x + '" y="' + core.y + '" text-anchor="middle" font-family="' + FF + '" font-size="17" font-weight="700" fill="#fff">' +
      '<tspan x="' + core.x + '" dy="-7">Unsere ESG-</tspan><tspan x="' + core.x + '" dy="20">Herausforderung</tspan></text></g>');

    return svg(W, H, parts.join(''), 'vm');

    function card(x, y, lines, dark, i) {
      var w = 196, h = 78;
      var g = '<g class="vm-card" style="--d:' + i + '">';
      g += '<rect x="' + (x - w / 2) + '" y="' + (y - h / 2) + '" width="' + w + '" height="' + h + '" rx="14" fill="#fff" stroke="' + C.border + '"/>';
      var ty = y - h / 2 + 24;
      lines.forEach(function (ln, j) {
        g += '<text x="' + (x - w / 2 + 16) + '" y="' + (ty + j * 19) + '" font-family="' + FF + '" font-size="15.5" font-weight="700" fill="' + C.ink + '">' + ln + '</text>';
      });
      // thin line
      g += '<rect x="' + (x - w / 2 + 16) + '" y="' + (y + h / 2 - 22) + '" width="78" height="5" rx="2.5" fill="' + C.cream + '"/>';
      // avatars
      for (var a = 0; a < 3; a++) {
        g += '<circle cx="' + (x + w / 2 - 22 - a * 14) + '" cy="' + (y + h / 2 - 19) + '" r="7" fill="' + [C.mid, C.soft, C.deep][a] + '" stroke="#fff" stroke-width="1.5"/>';
      }
      g += '</g>';
      return g;
    }
  }

  /* ---------------------------------------------------------
     4. TANGLE → ARROW (chaos resolves to growth)
  --------------------------------------------------------- */
  function tangleArrow(stroke) {
    var W = 460, H = 130;
    var col = stroke || C.mid;
    var d = 'M16,92 C36,52 54,118 78,84 C96,58 70,40 96,40 C124,40 104,96 132,92 ' +
            'C160,88 150,46 178,58 C202,68 188,104 214,92 C246,77 250,60 286,52 ' +
            'C330,42 352,40 392,26';
    var parts = [];
    parts.push('<path class="vt-path" d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linecap="round"/>');
    // arrow head
    parts.push('<path d="M392,26 l-16,-2 M392,26 l-4,16" fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linecap="round"/>');
    // start dot
    parts.push('<circle cx="16" cy="92" r="3.4" fill="' + col + '"/>');
    return svg(W, H, parts.join(''), 'vt');
  }

  /* ---------------------------------------------------------
     helpers + mount
  --------------------------------------------------------- */
  function svg(w, h, inner, cls) {
    return '<svg class="' + cls + '" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-hidden="true" ' +
      'preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }

  var REG = {
    'hero-net': heroNet,
    'phase-scatter': phaseScatter,
    'phase-network': phaseNetwork,
    'phase-rings': phaseRings,
    'mindmap': mindMap,
    'tangle': function () { return tangleArrow('#cfe6a6'); },
    'tangle-green': function () { return tangleArrow(C.mid); }
  };

  /* entrance trigger: add .play when a graphic scrolls into view.
     Base (no .play) state is already fully visible, so a missed or
     frozen trigger never leaves anything hidden. */
  var PLAY = ['.hero-graph', '.mindmap-wrap', '.final-viz'];
  function playFor(el) {
    if (!el || el.getAttribute('data-played') === '1') return;
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    var r = el.getBoundingClientRect();
    if (r.top < vh * 0.85 && r.bottom > 0) {
      el.classList.add('play');
      el.setAttribute('data-played', '1');
    }
  }
  function sweepPlay() {
    PLAY.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(playFor);
    });
  }

  function mountAll() {
    document.querySelectorAll('[data-viz]').forEach(function (el) {
      var key = el.getAttribute('data-viz');
      if (el.getAttribute('data-mounted') === '1') return;
      var gen = REG[key];
      if (!gen) return;
      el.innerHTML = gen();
      el.setAttribute('data-mounted', '1');
    });
    sweepPlay();
    window.addEventListener('scroll', sweepPlay, { passive: true });
    window.addEventListener('resize', sweepPlay);
    setTimeout(sweepPlay, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    mountAll();
  }
})();
