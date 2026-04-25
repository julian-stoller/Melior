/* global React */
const { useState, useEffect, useRef } = React;

// Tiny browser-frame wrapper
function BrowserFrame({ url = "meliora.health", children, hideChrome = false }) {
  return (
    <div className="frame">
      {!hideChrome && (
        <div className="frame-bar">
          <div className="frame-dot" />
          <div className="frame-dot" />
          <div className="frame-dot" />
          <div className="frame-url">{url}</div>
        </div>
      )}
      <div className="scroll-region">{children}</div>
    </div>
  );
}

function Nav({ active = "home" }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "how", label: "How it works" },
    { id: "privacy", label: "Privacy" },
    { id: "science", label: "Science" },
  ];
  return (
    <div className="row between center" style={{ padding: "20px 36px", borderBottom: "1.4px solid var(--ink)" }}>
      <div className="logo-mark">
        <div className="logo-glyph" />
        <span>Meliora</span>
      </div>
      <div className="row gap-24 center" style={{ fontSize: 16 }}>
        {items.map(i => (
          <span key={i.id} style={{ opacity: i.id === active ? 1 : 0.55, fontWeight: i.id === active ? 700 : 500 }}>
            {i.label}
          </span>
        ))}
        <button className="sk-btn" style={{ padding: "6px 14px", fontSize: 14 }}>Sign in</button>
      </div>
    </div>
  );
}

// Sketchy ring chart (concentric circles)
function RingChart({ size = 240 }) {
  const cx = size / 2;
  const rings = [0.9, 0.72, 0.54, 0.38];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cx}
          r={(size / 2) * r}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={i === 1 ? 6 : 1.6}
          strokeDasharray={i === 1 ? "0" : i === 0 ? "8 6" : i === 2 ? "4 4" : "2 4"}
          opacity={i === 1 ? 1 : 0.6}
        />
      ))}
      <circle cx={cx} cy={cx} r={(size / 2) * 0.72} fill="none" stroke="var(--accent)" strokeWidth={6}
        strokeDasharray={`${size * 1.5} ${size * 0.5}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cx})`} />
    </svg>
  );
}

// Squiggly trend line
function TrendLine({ width = 360, height = 80, accent = true }) {
  const pts = [];
  const N = 30;
  for (let i = 0; i < N; i++) {
    const x = (i / (N - 1)) * width;
    const y = height / 2 + Math.sin(i * 0.7) * 18 + Math.sin(i * 0.21) * 10 - i * 0.4;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={pts.join(" ")} fill="none"
        stroke={accent ? "var(--accent)" : "var(--ink)"}
        strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      {[0.2, 0.5, 0.8].map(p => (
        <circle key={p} cx={p * width} cy={height / 2 + Math.sin(p * 30 * 0.7) * 18 - p * 30 * 0.4}
          r={4} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.4} />
      ))}
    </svg>
  );
}

// Body silhouette (very rough)
function BodyOutline({ height = 280 }) {
  const w = (height / 280) * 130;
  return (
    <svg width={w} height={height} viewBox="0 0 130 280" fill="none" stroke="var(--ink)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="65" cy="32" r="22" />
      <path d="M 43 56 Q 35 70 30 96 L 18 160 L 28 162 L 36 110 L 40 110 L 38 200 L 50 270 L 60 270 L 60 200 L 65 160 L 70 200 L 70 270 L 80 270 L 92 200 L 90 110 L 94 110 L 102 162 L 112 160 L 100 96 Q 95 70 87 56 Z" />
      {/* dots indicating "data points" — anchored to annotation labels */}
      {/* HRV — over the heart (upper-left chest) */}
      <circle cx="56" cy="92" r="4" fill="var(--accent)" stroke="var(--accent)" />
      {/* sleep — head */}
      <circle cx="65" cy="32" r="4" fill="var(--accent)" stroke="var(--accent)" />
      {/* steps — one on each lower leg */}
      <circle cx="52" cy="240" r="3.5" fill="var(--accent)" stroke="var(--accent)" />
      <circle cx="78" cy="240" r="3.5" fill="var(--accent)" stroke="var(--accent)" />
    </svg>
  );
}

// Calendar grid
function CalendarGrid({ cols = 14, rows = 6, accentMap = null }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = `${r}-${c}`;
      const filled = accentMap ? accentMap(r, c) : ((r * 31 + c * 7) % 5 < 2);
      cells.push(
        <div key={k} style={{
          width: 18, height: 18,
          border: "1.2px solid var(--ink)",
          borderRadius: 3,
          background: filled ? "var(--accent)" : "var(--paper)",
          opacity: filled ? 1 : 0.7,
        }} />
      );
    }
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 18px)`, gap: 4 }}>
      {cells}
    </div>
  );
}

// Map sketch with path
function MapSketch({ width = 320, height = 220 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="2" y="2" width={width - 4} height={height - 4} fill="var(--paper-2)" stroke="var(--ink)" strokeWidth={1.4} rx={6} />
      {/* roads */}
      <path d={`M 0 60 L ${width} 80`} stroke="var(--ink)" strokeWidth={1} opacity={0.3} />
      <path d={`M 0 130 L ${width} 110`} stroke="var(--ink)" strokeWidth={1} opacity={0.3} />
      <path d={`M 80 0 L 60 ${height}`} stroke="var(--ink)" strokeWidth={1} opacity={0.3} />
      <path d={`M 220 0 L 240 ${height}`} stroke="var(--ink)" strokeWidth={1} opacity={0.3} />
      {/* path traveled */}
      <path d="M 30 180 Q 80 120 120 130 T 210 90 T 290 50"
        fill="none" stroke="var(--accent)" strokeWidth={2.4} strokeLinecap="round"
        strokeDasharray="6 4" />
      {/* pins */}
      {[[30, 180], [120, 130], [210, 90], [290, 50]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={5} fill="var(--paper)" stroke="var(--ink)" strokeWidth={1.6} />
          <circle cx={x} cy={y} r={2} fill="var(--accent)" />
        </g>
      ))}
    </svg>
  );
}

// Fake "device" cards (Apple Watch / phone / Oura ring)
function DeviceCard({ label, kind }) {
  return (
    <div className="sk-box col center gap-8" style={{ width: 110, height: 120, padding: 10 }}>
      {kind === "watch" && (
        <svg width="46" height="56" viewBox="0 0 46 56">
          <rect x="6" y="2" width="34" height="8" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
          <rect x="6" y="46" width="34" height="8" rx="3" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
          <rect x="2" y="12" width="42" height="32" rx="6" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.6" />
          <circle cx="23" cy="28" r="6" fill="var(--accent)" />
        </svg>
      )}
      {kind === "phone" && (
        <svg width="36" height="60" viewBox="0 0 36 60">
          <rect x="2" y="2" width="32" height="56" rx="5" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.6" />
          <line x1="8" y1="14" x2="28" y2="14" stroke="var(--ink)" strokeWidth="1.4" />
          <line x1="8" y1="22" x2="22" y2="22" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="30" x2="26" y2="30" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
          <rect x="8" y="40" width="20" height="10" rx="2" fill="var(--accent)" opacity="0.7" />
        </svg>
      )}
      {kind === "ring" && (
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="20" fill="none" stroke="var(--ink)" strokeWidth="6" />
          <circle cx="28" cy="28" r="14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      )}
      {kind === "scale" && (
        <svg width="56" height="40" viewBox="0 0 56 40">
          <rect x="4" y="6" width="48" height="28" rx="4" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.6" />
          <text x="28" y="25" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="var(--ink)">142.3</text>
        </svg>
      )}
      <div style={{ fontSize: 13, fontFamily: "var(--label)" }}>{label}</div>
    </div>
  );
}

function Annotation({ text, x, y, arrow }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 4 }}>
      <div className="anno-pill" style={{ position: "static" }}>{text}</div>
      {arrow && (
        <svg width="60" height="40" style={{ position: "absolute", ...arrow }}>
          <path d="M 5 5 Q 25 20 50 30" className="sk-arrow" markerEnd="url(#arr)" />
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      )}
    </div>
  );
}

Object.assign(window, {
  BrowserFrame, Nav, RingChart, TrendLine, BodyOutline,
  CalendarGrid, MapSketch, DeviceCard, Annotation,
});
