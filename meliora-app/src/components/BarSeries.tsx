"use client";

import { useEffect, useRef, useState } from "react";

interface BarSeriesProps {
  data: number[];
  accent?: boolean;
  height?: number;
  unit?: string;
  yTickCount?: number;
  yMax?: number;
  days?: string[];
}

export function BarSeries({
  data,
  accent = false,
  height = 90,
  unit = "",
  yTickCount = 4,
  yMax,
  days = ["M", "T", "W", "T", "F", "S", "S"],
}: BarSeriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(360);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const w = e.contentRect.width;
        if (w > 0) setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const max = Math.max(...data);
  const top =
    yMax != null
      ? yMax
      : max > 1000
      ? Math.ceil(max / 1000) * 1000
      : Math.ceil(max / 10) * 10;

  const axisW = 32;
  const plotW = width - axisW;
  const gap = 4;
  const bw = (plotW - (data.length - 1) * gap) / data.length;
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const avgY = height - (avg / top) * height;

  const ticks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((top * i) / yTickCount)
  );

  const fmt = (v: number) =>
    v >= 1000
      ? (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k"
      : String(v);

  const barColor = accent ? "#e76f51" : "#1a1a1a";

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg
        width={width}
        height={height + 18}
        viewBox={`0 0 ${width} ${height + 18}`}
        style={{ display: "block" }}
      >
        {/* y-axis grid lines + tick labels */}
        {ticks.map((t, i) => {
          const y = height - (t / top) * height;
          return (
            <g key={i}>
              <line
                x1={axisW - 2}
                y1={y}
                x2={width}
                y2={y}
                stroke="#8a8a8a"
                strokeWidth={0.6}
                opacity={0.4}
              />
              <text
                x={axisW - 4}
                y={y + 3}
                textAnchor="end"
                fontSize="9"
                fontFamily="var(--font-jetbrains-mono)"
                fill="#8a8a8a"
              >
                {fmt(t)}
              </text>
            </g>
          );
        })}

        {/* bars */}
        {data.map((v, i) => {
          const h = (v / top) * height;
          const x = axisW + i * (bw + gap);
          return (
            <rect
              key={i}
              x={x}
              y={height - h}
              width={bw}
              height={h}
              fill={barColor}
              opacity={i === data.length - 1 ? 1 : 0.72}
              stroke="#1a1a1a"
              strokeWidth={1}
              rx={2}
            />
          );
        })}

        {/* dashed average line */}
        <line
          x1={axisW}
          y1={avgY}
          x2={width}
          y2={avgY}
          stroke="#1a1a1a"
          strokeWidth={1.4}
          strokeDasharray="5 4"
        />
        <text
          x={width - 2}
          y={avgY - 3}
          textAnchor="end"
          fontSize="9"
          fontFamily="var(--font-jetbrains-mono)"
          fill="#1a1a1a"
          fontWeight="600"
        >
          avg {fmt(Math.round(avg))}
          {unit}
        </text>

        {/* day labels */}
        {days.map((d, i) => (
          <text
            key={i}
            x={axisW + i * (bw + gap) + bw / 2}
            y={height + 14}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-jetbrains-mono)"
            fill="#8a8a8a"
          >
            {d}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function SleepChart() {
  return (
    <BarSeries
      data={[5.2, 5.9, 3.8, 6.6, 5.5, 6.2, 6.0]}
      accent
      unit="h"
      yTickCount={3}
      yMax={8}
    />
  );
}
