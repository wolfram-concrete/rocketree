/* =========================================================
   Rocketree — Visualization layer (ported from viz.js)
   Neural-network / node-graph symbolism for ESG, generated as
   deterministic inline SVG. A seeded RNG keeps every layout stable
   across server render and client hydration (no Math.random), so
   these stay pure render functions usable in Server Components.
   ========================================================= */
import type { CSSProperties, ReactElement } from "react";

const C = {
  dark: "#0f2e1f",
  deep: "#16412a",
  mid: "#3f8f57",
  soft: "#88b98d",
  faint: "#bcd6b7",
  line: "#a8c8a3",
  dot: "#d6e8d0",
  cream: "#eef3ec",
  ink: "#1c2b22",
  white: "#ffffff",
  border: "#dde8da",
} as const;

const FF = "Hanken Grotesk, system-ui, sans-serif";

/** seeded RNG so layouts are stable across reloads/SSR */
function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function estW(t: string, fs: number) {
  return Math.round(t.length * fs * 0.56) + 30;
}

/** CSS custom property helper (typed) */
function dvar(d: number): CSSProperties {
  return { "--d": d } as CSSProperties;
}

function Svg({
  w,
  h,
  cls,
  children,
}: {
  w: number;
  h: number;
  cls: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      className={cls}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------
   1. HERO — neural constellation
--------------------------------------------------------- */
export function HeroNet() {
  const W = 680;
  const H = 600;
  const cx = 338;
  const cyTop = 212;
  const lx = 360;
  const ly = 452;
  const r = rng(7);
  const parts: ReactElement[] = [];
  let key = 0;

  // background mesh nodes (center-biased)
  const pts: { x: number; y: number; s: number }[] = [];
  for (let i = 0; i < 44; i++) {
    const a = r() * Math.PI * 2;
    const rad = 60 + r() * 250;
    let x = cx + Math.cos(a) * rad * (0.9 + r() * 0.5);
    let y = cyTop + 60 + Math.sin(a) * rad * 0.78;
    x = Math.max(24, Math.min(W - 24, x));
    y = Math.max(36, Math.min(H - 30, y));
    pts.push({ x, y, s: 1.4 + r() * 3 });
  }
  // mesh edges (nearest neighbours)
  const edges: { a: number; b: number; d: number }[] = [];
  for (let p = 0; p < pts.length; p++) {
    const best: { q: number; d: number }[] = [];
    for (let q = 0; q < pts.length; q++) {
      if (p === q) continue;
      const d = Math.hypot(pts[p].x - pts[q].x, pts[p].y - pts[q].y);
      best.push({ q, d });
    }
    best.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2; k++) {
      if (best[k] && best[k].d < 120 && p < best[k].q)
        edges.push({ a: p, b: best[k].q, d: best[k].d });
    }
  }
  edges.forEach((e) => {
    const o = 0.3 - (e.d / 120) * 0.18;
    parts.push(
      <line
        key={key++}
        x1={+pts[e.a].x.toFixed(1)}
        y1={+pts[e.a].y.toFixed(1)}
        x2={+pts[e.b].x.toFixed(1)}
        y2={+pts[e.b].y.toFixed(1)}
        stroke={C.line}
        strokeWidth={1}
        strokeOpacity={+o.toFixed(2)}
      />
    );
  });
  pts.forEach((pt, i) => {
    const fill = i % 7 === 0 ? C.mid : i % 3 === 0 ? C.soft : C.dot;
    parts.push(
      <circle
        key={key++}
        className="vn-dot"
        cx={+pt.x.toFixed(1)}
        cy={+pt.y.toFixed(1)}
        r={+pt.s.toFixed(1)}
        fill={fill}
        style={dvar(i % 9)}
      />
    );
  });

  // topic pills + curved connectors to center
  const topics = [
    { t: "CSRD", x: 232, y: 66 },
    { t: "Reporting", x: 486, y: 78 },
    { t: "Audit", x: 556, y: 166 },
    { t: "Lieferkette", x: 116, y: 150 },
    { t: "CO₂", x: 132, y: 270 },
    { t: "Einkauf", x: 556, y: 286 },
    { t: "HR", x: 436, y: 344 },
    { t: "HR", x: 206, y: 372 },
  ];
  // connectors (behind pills)
  topics.forEach((tp) => {
    const mx = (tp.x + cx) / 2 + (r() - 0.5) * 40;
    const my = (tp.y + cyTop) / 2 - 18;
    parts.push(
      <path
        key={key++}
        className="vn-link"
        d={`M${tp.x},${tp.y} Q${mx.toFixed(0)},${my.toFixed(0)} ${cx},${cyTop}`}
        fill="none"
        stroke={C.line}
        strokeWidth={1.3}
        strokeOpacity={0.5}
      />
    );
  });
  // connector center → lower
  parts.push(
    <path
      key={key++}
      className="vn-link"
      d={`M${cx},${cyTop + 26} Q${cx + 26},${(cyTop + ly) / 2} ${lx},${ly - 24}`}
      fill="none"
      stroke={C.mid}
      strokeWidth={1.6}
      strokeOpacity={0.55}
    />
  );
  parts.push(
    <path
      key={key++}
      className="vn-link"
      d={`M${cx - 8},${cyTop + 26} Q${cx - 40},${(cyTop + ly) / 2 + 14} ${lx - 18},${ly - 22}`}
      fill="none"
      stroke={C.line}
      strokeWidth={1.2}
      strokeOpacity={0.4}
    />
  );

  // ripples under lower pill
  for (let rp = 0; rp < 4; rp++) {
    parts.push(
      <ellipse
        key={key++}
        className="vn-ripple"
        cx={lx}
        cy={ly + 34}
        rx={40 + rp * 34}
        ry={10 + rp * 8}
        fill="none"
        stroke={C.soft}
        strokeWidth={1.3}
        strokeOpacity={+(0.5 - rp * 0.1).toFixed(2)}
        style={dvar(rp)}
      />
    );
  }

  // topic pills
  topics.forEach((tp, i) => {
    const fs = 15;
    const w = estW(tp.t, fs);
    const h = 33;
    parts.push(
      <g key={key++} className="vn-pill" style={dvar(i % 6)}>
        <circle cx={tp.x} cy={tp.y} r={3.4} fill={C.mid} />
        <rect
          x={tp.x - w / 2}
          y={tp.y - h / 2 - 26}
          width={w}
          height={h}
          rx={h / 2}
          fill="#fff"
          stroke={C.border}
        />
        <text
          x={tp.x}
          y={tp.y - 26}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={FF}
          fontSize={fs}
          fontWeight={600}
          fill="#26352b"
        >
          {tp.t}
        </text>
      </g>
    );
  });

  // center pill (dark, two lines)
  const cw = 176;
  const ch = 64;
  parts.push(
    <g key={key++} className="vn-core">
      <rect x={cx - cw / 2} y={cyTop - ch / 2} width={cw} height={ch} rx={18} fill={C.dark} />
      <text
        x={cx}
        y={cyTop}
        textAnchor="middle"
        fontFamily={FF}
        fontSize={17}
        fontWeight={700}
        fill="#fff"
      >
        <tspan x={cx} dy="-7">
          Gemeinsames
        </tspan>
        <tspan x={cx} dy="20">
          Verständnis
        </tspan>
      </text>
    </g>
  );

  // lower pill (dark)
  const lt = "Handlungsfähigkeit";
  const lw = estW(lt, 17) + 16;
  const lh = 46;
  parts.push(
    <g key={key++} className="vn-core">
      <rect x={lx - lw / 2} y={ly - lh / 2} width={lw} height={lh} rx={14} fill={C.dark} />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={FF}
        fontSize={17}
        fontWeight={700}
        fill="#fff"
      >
        {lt}
      </text>
    </g>
  );

  return (
    <Svg w={W} h={H} cls="vn-hero">
      {parts}
    </Svg>
  );
}

/* ---------------------------------------------------------
   2. JOURNEY phase infographics
--------------------------------------------------------- */
export function PhaseScatter() {
  const W = 224;
  const H = 150;
  const r = rng(21);
  const parts: ReactElement[] = [];
  for (let i = 0; i < 52; i++) {
    const x = 14 + r() * (W - 28);
    const y = 12 + r() * (H - 24);
    const s = 1.3 + r() * 3.2;
    const fill = i % 6 === 0 ? C.mid : i % 3 === 0 ? C.soft : C.faint;
    parts.push(
      <circle
        key={i}
        className="vp-dot"
        cx={+x.toFixed(1)}
        cy={+y.toFixed(1)}
        r={+s.toFixed(1)}
        fill={fill}
        style={dvar(i % 10)}
      />
    );
  }
  return (
    <Svg w={W} h={H} cls="vp">
      {parts}
    </Svg>
  );
}

export function PhaseNetwork() {
  const W = 224;
  const H = 150;
  const cx = 112;
  const cy = 74;
  const r = rng(5);
  const parts: ReactElement[] = [];
  let key = 0;
  const sats: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.4;
    const rad = 42 + (i % 2) * 12;
    sats.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.86, r: 4 + r() * 3 });
  }
  sats.forEach((s) => {
    parts.push(
      <line
        key={key++}
        className="vp-link"
        x1={cx}
        y1={cy}
        x2={+s.x.toFixed(1)}
        y2={+s.y.toFixed(1)}
        stroke={C.line}
        strokeWidth={1.3}
        strokeOpacity={0.7}
      />
    );
  });
  // child dots
  sats.forEach((s, i) => {
    if (i % 2) return;
    const a = r() * 6.28;
    const ox = s.x + Math.cos(a) * 16;
    const oy = s.y + Math.sin(a) * 16;
    parts.push(
      <line
        key={key++}
        x1={+s.x.toFixed(1)}
        y1={+s.y.toFixed(1)}
        x2={+ox.toFixed(1)}
        y2={+oy.toFixed(1)}
        stroke={C.line}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
    );
    parts.push(
      <circle key={key++} className="vp-dot" cx={+ox.toFixed(1)} cy={+oy.toFixed(1)} r={2.6} fill={C.faint} />
    );
  });
  sats.forEach((s, i) => {
    parts.push(
      <circle
        key={key++}
        className="vp-node"
        cx={+s.x.toFixed(1)}
        cy={+s.y.toFixed(1)}
        r={+s.r.toFixed(1)}
        fill={i % 2 ? C.soft : C.mid}
        style={dvar(i)}
      />
    );
  });
  parts.push(<circle key={key++} className="vp-hub" cx={cx} cy={cy} r={11} fill={C.dark} />);
  return (
    <Svg w={W} h={H} cls="vp">
      {parts}
    </Svg>
  );
}

export function PhaseRings() {
  const W = 224;
  const H = 150;
  const cx = 112;
  const cy = 74;
  const parts: ReactElement[] = [];
  let key = 0;
  for (let i = 4; i >= 1; i--) {
    parts.push(
      <circle
        key={key++}
        className="vp-ring"
        cx={cx}
        cy={cy}
        r={i * 17}
        fill="none"
        stroke={C.soft}
        strokeWidth={1.4}
        strokeOpacity={+(0.65 - i * 0.1).toFixed(2)}
        style={dvar(i)}
      />
    );
  }
  const r = rng(9);
  [1, 2, 3].forEach((ring) => {
    const n = ring + 1;
    for (let j = 0; j < n; j++) {
      const a = r() * 6.28;
      const x = cx + Math.cos(a) * ring * 17;
      const y = cy + Math.sin(a) * ring * 17;
      parts.push(
        <circle key={key++} className="vp-dot" cx={+x.toFixed(1)} cy={+y.toFixed(1)} r={3} fill={C.mid} />
      );
    }
  });
  parts.push(<circle key={key++} className="vp-hub" cx={cx} cy={cy} r={9} fill={C.dark} />);
  return (
    <Svg w={W} h={H} cls="vp">
      {parts}
    </Svg>
  );
}

/* ---------------------------------------------------------
   3. MIND-MAP — "Beispiel: Arbeitsbereich"
--------------------------------------------------------- */
function MindCard({
  x,
  y,
  lines,
  i,
}: {
  x: number;
  y: number;
  lines: string[];
  i: number;
}) {
  const w = 196;
  const h = 78;
  const ty = y - h / 2 + 24;
  return (
    <g className="vm-card" style={dvar(i)}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={14} fill="#fff" stroke={C.border} />
      {lines.map((ln, j) => (
        <text
          key={j}
          x={x - w / 2 + 16}
          y={ty + j * 19}
          fontFamily={FF}
          fontSize={15.5}
          fontWeight={700}
          fill={C.ink}
        >
          {ln}
        </text>
      ))}
      <rect x={x - w / 2 + 16} y={y + h / 2 - 22} width={78} height={5} rx={2.5} fill={C.cream} />
      {[0, 1, 2].map((a) => (
        <circle
          key={`a${a}`}
          cx={x + w / 2 - 22 - a * 14}
          cy={y + h / 2 - 19}
          r={7}
          fill={[C.mid, C.soft, C.deep][a]}
          stroke="#fff"
          strokeWidth={1.5}
        />
      ))}
    </g>
  );
}

export function MindMap() {
  const W = 1060;
  const H = 600;
  const parts: ReactElement[] = [];
  let key = 0;

  // app frame
  parts.push(
    <rect key={key++} x={1} y={1} width={W - 2} height={H - 2} rx={22} fill={C.white} stroke={C.border} />
  );
  parts.push(<line key={key++} x1={0} y1={52} x2={W} y2={52} stroke={C.border} strokeOpacity={0.7} />);
  ["#e2b4b0", "#e9cf9a", "#aacb9f"].forEach((c, i) => {
    parts.push(<circle key={key++} cx={28 + i * 20} cy={26} r={5.5} fill={c} />);
  });
  parts.push(
    <text key={key++} x={84} y={31} fontFamily={FF} fontSize={15} fontWeight={600} fill="#7d8b81">
      Beispiel: Arbeitsbereich
    </text>
  );

  // sidebar
  parts.push(<rect key={key++} x={20} y={70} width={46} height={H - 92} rx={14} fill={C.cream} />);
  for (let s = 0; s < 7; s++) {
    const sy = 96 + s * 56;
    parts.push(
      <rect key={key++} x={31} y={sy} width={24} height={24} rx={7} fill={s === 3 ? C.mid : "#dbe8d6"} />
    );
  }

  const nodes = [
    { t: ["Doppelte", "Wesentlichkeit"], x: 196, y: 132 },
    { t: ["Lieferkette &", "Menschenrechte"], x: 470, y: 96 },
    { t: ["Datenerhebung", "& Kennzahlen"], x: 812, y: 138 },
    { t: ["Rollen &", "Verantwortungen"], x: 214, y: 452 },
    { t: ["Regulatorische", "Anforderungen"], x: 470, y: 492 },
    { t: ["Nächste", "Schritte"], x: 824, y: 452 },
  ];
  const core = { x: 540, y: 300, w: 188, h: 78 };

  // connectors (behind cards)
  nodes.forEach((n, i) => {
    const ex = core.x;
    const ey = core.y;
    const mx = (n.x + core.x) / 2;
    const my = (n.y + core.y) / 2;
    parts.push(
      <path
        key={key++}
        className="vm-link"
        style={dvar(i)}
        d={`M${n.x},${n.y} Q${mx},${n.y} ${mx},${my} T${ex},${ey}`}
        fill="none"
        stroke={C.line}
        strokeWidth={1.6}
        strokeOpacity={0.7}
      />
    );
    parts.push(<circle key={key++} cx={n.x} cy={n.y} r={3.2} fill={C.soft} />);
  });

  // cards
  nodes.forEach((n, i) => {
    parts.push(<MindCard key={key++} x={n.x} y={n.y} lines={n.t} i={i} />);
  });

  // core node
  parts.push(
    <g key={key++} className="vm-core">
      <rect
        x={core.x - core.w / 2}
        y={core.y - core.h / 2}
        width={core.w}
        height={core.h}
        rx={16}
        fill={C.dark}
      />
      <text
        x={core.x}
        y={core.y}
        textAnchor="middle"
        fontFamily={FF}
        fontSize={17}
        fontWeight={700}
        fill="#fff"
      >
        <tspan x={core.x} dy="-7">
          Unsere ESG-
        </tspan>
        <tspan x={core.x} dy="20">
          Herausforderung
        </tspan>
      </text>
    </g>
  );

  return (
    <Svg w={W} h={H} cls="vm">
      {parts}
    </Svg>
  );
}

/* ---------------------------------------------------------
   4. TANGLE → ARROW (chaos resolves to growth)
--------------------------------------------------------- */
export function TangleArrow({ stroke = C.mid }: { stroke?: string }) {
  const W = 460;
  const H = 130;
  const col = stroke;
  const d =
    "M16,92 C36,52 54,118 78,84 C96,58 70,40 96,40 C124,40 104,96 132,92 " +
    "C160,88 150,46 178,58 C202,68 188,104 214,92 C246,77 250,60 286,52 " +
    "C330,42 352,40 392,26";
  return (
    <Svg w={W} h={H} cls="vt">
      <path className="vt-path" d={d} fill="none" stroke={col} strokeWidth={2.2} strokeLinecap="round" />
      <path
        d="M392,26 l-16,-2 M392,26 l-4,16"
        fill="none"
        stroke={col}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <circle cx={16} cy={92} r={3.4} fill={col} />
    </Svg>
  );
}
