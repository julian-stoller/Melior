/* SVG illustration components ported from primitives.jsx */

export function RingChart({ size = 240 }: { size?: number }) {
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
          stroke="#1a1a1a"
          strokeWidth={i === 1 ? 6 : 1.6}
          strokeDasharray={
            i === 1 ? "0" : i === 0 ? "8 6" : i === 2 ? "4 4" : "2 4"
          }
          opacity={i === 1 ? 1 : 0.55}
        />
      ))}
      <circle
        cx={cx}
        cy={cx}
        r={(size / 2) * 0.72}
        fill="none"
        stroke="#e76f51"
        strokeWidth={6}
        strokeDasharray={`${size * 1.5} ${size * 0.5}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
      />
    </svg>
  );
}

export function TrendLine({
  width = 360,
  height = 80,
  accent = true,
}: {
  width?: number;
  height?: number;
  accent?: boolean;
}) {
  const pts: string[] = [];
  const N = 30;
  for (let i = 0; i < N; i++) {
    const x = (i / (N - 1)) * width;
    const y =
      height / 2 + Math.sin(i * 0.7) * 18 + Math.sin(i * 0.21) * 10 - i * 0.4;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={accent ? "#e76f51" : "#1a1a1a"}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[0.2, 0.5, 0.8].map((p) => (
        <circle
          key={p}
          cx={p * width}
          cy={
            height / 2 +
            Math.sin(p * 30 * 0.7) * 18 -
            p * 30 * 0.4
          }
          r={4}
          fill="#fafaf7"
          stroke="#1a1a1a"
          strokeWidth={1.4}
        />
      ))}
    </svg>
  );
}

export function BodyOutline({ height = 280 }: { height?: number }) {
  const w = (height / 280) * 130;
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 130 280"
      fill="none"
      stroke="#1a1a1a"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="65" cy="32" r="22" />
      <path d="M 43 56 Q 35 70 30 96 L 18 160 L 28 162 L 36 110 L 40 110 L 38 200 L 50 270 L 60 270 L 60 200 L 65 160 L 70 200 L 70 270 L 80 270 L 92 200 L 90 110 L 94 110 L 102 162 L 112 160 L 100 96 Q 95 70 87 56 Z" />
      {/* HRV — heart */}
      <circle cx="56" cy="92" r="4" fill="#e76f51" stroke="#e76f51" />
      {/* sleep — head */}
      <circle cx="65" cy="32" r="4" fill="#e76f51" stroke="#e76f51" />
      {/* steps — lower legs */}
      <circle cx="52" cy="240" r="3.5" fill="#e76f51" stroke="#e76f51" />
      <circle cx="78" cy="240" r="3.5" fill="#e76f51" stroke="#e76f51" />
    </svg>
  );
}

export function MapSketch({
  width = 320,
  height = 220,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        x="2"
        y="2"
        width={width - 4}
        height={height - 4}
        fill="#f3f2ec"
        stroke="#1a1a1a"
        strokeWidth={1.4}
        rx={6}
      />
      {/* roads */}
      <path
        d={`M 0 60 L ${width} 80`}
        stroke="#1a1a1a"
        strokeWidth={1}
        opacity={0.3}
      />
      <path
        d={`M 0 130 L ${width} 110`}
        stroke="#1a1a1a"
        strokeWidth={1}
        opacity={0.3}
      />
      <path
        d={`M 80 0 L 60 ${height}`}
        stroke="#1a1a1a"
        strokeWidth={1}
        opacity={0.3}
      />
      <path
        d={`M 220 0 L 240 ${height}`}
        stroke="#1a1a1a"
        strokeWidth={1}
        opacity={0.3}
      />
      {/* travel path */}
      <path
        d="M 30 180 Q 80 120 120 130 T 210 90 T 290 50"
        fill="none"
        stroke="#e76f51"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
      {/* pins */}
      {[
        [30, 180],
        [120, 130],
        [210, 90],
        [290, 50],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={5}
            fill="#fafaf7"
            stroke="#1a1a1a"
            strokeWidth={1.6}
          />
          <circle cx={x} cy={y} r={2} fill="#e76f51" />
        </g>
      ))}
    </svg>
  );
}

export function CalendarGrid({
  cols = 14,
  rows = 6,
}: {
  cols?: number;
  rows?: number;
}) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const filled = (r * 31 + c * 7) % 5 < 2;
      cells.push(
        <div
          key={`${r}-${c}`}
          style={{
            width: 18,
            height: 18,
            border: "1.2px solid #1a1a1a",
            borderRadius: 3,
            background: filled ? "#e76f51" : "#fafaf7",
            opacity: filled ? 1 : 0.7,
          }}
        />
      );
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 18px)`,
        gap: 4,
      }}
    >
      {cells}
    </div>
  );
}
