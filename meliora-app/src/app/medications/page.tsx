"use client";

import { useMemo } from "react";
import { SideRail } from "@/components/SideRail";

const tag = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 10,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#8a8a8a",
};

const MED = {
  name: "Lisinopril",
  dose: "10 mg",
  schedule: "1× daily · morning · with water",
  color: "#d97757",
  note: "Blood pressure",
  prescriber: "Dr. Patel · refilled May 14",
  refill: "12 days remaining",
  rate: 0.92,
  streak: 23,
  longestStreak: 47,
};

const MED_RANGES = ["Month", "3 Months", "6 Months", "Year"];

function genHistory(seed: number, days: number, rate: number): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < days; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    if (r < rate - 0.08) out.push(1);
    else if (r < rate + 0.04) out.push(0.6);
    else out.push(0);
  }
  return out;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MonthCalendar({ history, color }: { history: number[]; color: string }) {
  const cell = 52;
  const recent = history.slice(-30);
  const firstDayOffset = 3; // assume month starts on Wednesday
  const cells: ({ s: number; day: number } | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...recent.map((s, i) => ({ s, day: i + 1 })),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 18,
            color: "#1a1a1a",
          }}
        >
          May 2025
        </span>
        <div className="flex gap-2">
          {["‹ April", "June ›"].map((l) => (
            <button
              key={l}
              className="px-3 py-1 rounded-full text-xs"
              style={{ border: "1.2px solid #1a1a1a", fontFamily: "var(--font-inter)", color: "#1a1a1a" }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 11,
              color: "#8a8a8a",
              padding: "0 4px",
            }}
          >
            {w}
          </div>
        ))}
        {cells.map((c, i) => {
          if (!c)
            return <div key={i} style={{ height: cell }} />;
          const { s, day } = c;
          let bg: string,
            border: string,
            dashed = false,
            glyph = "";
          if (s === 1) {
            bg = color;
            border = "#1a1a1a";
            glyph = "✓";
          } else if (s === 0.6) {
            bg = color + "55";
            border = "#1a1a1a";
            glyph = "late";
          } else {
            bg = "transparent";
            border = "#8a8a8a";
            dashed = true;
            glyph = "—";
          }
          return (
            <div
              key={i}
              style={{
                height: cell,
                background: bg,
                border: `1.2px ${dashed ? "dashed" : "solid"} ${border}`,
                borderRadius: 6,
                padding: 6,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11,
                  color: s === 1 ? "#fafaf7" : "#8a8a8a",
                }}
              >
                {day}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: glyph === "late" ? 10 : 14,
                  alignSelf: "flex-end",
                  color: s === 1 ? "#fafaf7" : "#8a8a8a",
                }}
              >
                {glyph}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MedicationsPage() {
  const active = "3 Months";
  const history = useMemo(() => genHistory(17, 12 * 7, MED.rate), []);
  const onTime = history.filter((s) => s === 1).length;
  const late = history.filter((s) => s === 0.6).length;
  const missed = history.filter((s) => s === 0).length;
  const overall = Math.round(((onTime + late * 0.5) / history.length) * 100);

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#fafaf7" }}>
      <SideRail
        activePage="/medications"
        note={{
          tag: "Logging",
          body: "Tap a day to log a dose retroactively, or set up auto-logging from your pill cap.",
          action: "connect device →",
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-4 shrink-0"
          style={{ borderBottom: "1.4px solid #1a1a1a" }}
        >
          <div className="flex flex-col">
            <span style={tag}>Medication · 1 active</span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.01em",
                color: "#1a1a1a",
              }}
            >
              Adherence History
            </span>
          </div>
          <div
            className="flex items-center gap-1 rounded-full"
            style={{ background: "#f3f2ec", padding: 4, border: "1.4px solid #1a1a1a" }}
          >
            {MED_RANGES.map((r) => (
              <div
                key={r}
                className="px-4 py-1 rounded-full text-xs cursor-pointer"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: r === active ? 700 : 500,
                  background: r === active ? "#e76f51" : "transparent",
                  border: r === active ? "1.2px solid #1a1a1a" : "1.2px solid transparent",
                  color: "#1a1a1a",
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto">
          {/* Med card + stats */}
          <div
            className="flex gap-5 px-7 py-5"
            style={{ borderBottom: "1.4px solid #1a1a1a", alignItems: "stretch" }}
          >
            {/* Med info card */}
            <div
              className="flex flex-col gap-3 p-4 rounded-md"
              style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7", flexBasis: 320 }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: MED.color,
                    border: "1.4px solid #1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fafaf7",
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  Rx
                </div>
                <div className="flex flex-col">
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#1a1a1a",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {MED.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: 11,
                      color: "#4a4a4a",
                    }}
                  >
                    {MED.dose} · {MED.schedule}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span
                  style={{
                    ...tag,
                    border: "1px solid #d0cfc8",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {MED.note}
                </span>
                <span
                  style={{
                    ...tag,
                    border: "1px solid #d0cfc8",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {MED.prescriber}
                </span>
              </div>
              <div
                className="flex flex-col gap-1 text-sm"
                style={{ color: "#4a4a4a", fontFamily: "var(--font-inter)" }}
              >
                <div>
                  Refill:{" "}
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#1a1a1a" }}>
                    {MED.refill}
                  </span>
                </div>
                <div>
                  Best window:{" "}
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#1a1a1a" }}>
                    7:00–7:45 am
                  </span>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="flex flex-1 gap-4">
              {[
                {
                  label: "Overall adherence",
                  value: `${overall}%`,
                  sub: "last 12 wks",
                },
                {
                  label: "Current streak",
                  value: String(MED.streak),
                  sub: `days · longest ${MED.longestStreak}`,
                },
                {
                  label: "Missed / Late",
                  value: `${missed}`,
                  sub: `${late} taken late`,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 p-4 rounded-md flex-1"
                  style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
                >
                  <span style={tag}>{stat.label}</span>
                  <div className="flex items-baseline gap-2">
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 700,
                        fontSize: 36,
                        color: "#1a1a1a",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 12,
                        color: "#4a4a4a",
                      }}
                    >
                      {stat.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Month calendar */}
          <div className="flex flex-col gap-4 px-7 py-5">
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#1a1a1a",
                }}
              >
                This month
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: "#8a8a8a",
                  fontStyle: "italic",
                }}
              >
                ✓ on time · late · — missed
              </span>
            </div>
            <div
              className="p-5 rounded-md"
              style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
            >
              <MonthCalendar history={history} color={MED.color} />
            </div>

            {/* Legend */}
            <div
              className="flex items-center gap-5 text-xs"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#4a4a4a" }}
            >
              {[
                { label: "on time", bg: MED.color, border: "#1a1a1a", dashed: false },
                { label: "taken late", bg: MED.color + "55", border: "#1a1a1a", dashed: false },
                { label: "missed", bg: "transparent", border: "#8a8a8a", dashed: true },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      background: l.bg,
                      border: `1.2px ${l.dashed ? "dashed" : "solid"} ${l.border}`,
                      borderRadius: 3,
                      display: "inline-block",
                    }}
                  />
                  {l.label}
                </div>
              ))}
              <span style={{ marginLeft: "auto" }}>each square = 1 day · 12 weeks</span>
            </div>
          </div>

          {/* Footer actions */}
          <div
            className="flex items-center gap-3 px-7 py-4"
            style={{ borderTop: "1.4px solid #1a1a1a" }}
          >
            <button
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "#e76f51",
                border: "1.4px solid #1a1a1a",
                fontFamily: "var(--font-inter)",
                color: "#1a1a1a",
              }}
            >
              + Log dose now
            </button>
            {["Request refill", "Share with Dr. Patel"].map((label) => (
              <button
                key={label}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm"
                style={{
                  background: "transparent",
                  border: "1.4px solid #1a1a1a",
                  fontFamily: "var(--font-inter)",
                  color: "#1a1a1a",
                }}
              >
                {label}
              </button>
            ))}
            <span
              className="ml-auto"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "#8a8a8a",
                fontStyle: "italic",
              }}
            >
              auto-logged via pill cap · last sync 2m ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
