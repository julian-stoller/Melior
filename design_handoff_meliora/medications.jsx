/* global React, BrowserFrame */

const MED_RANGES = ["Month", "3 Months", "6 Months", "Year"];

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

// 12 weeks = 84 days. Status: 1 on-time, 0.6 late, 0 missed
function genHistory(seed, days, rate) {
  const out = [];
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

const DAYS = 12 * 7; // 12 weeks
const MONTHS_AXIS = ["Mar", "Apr", "May"];

function CalendarHeatmap({ history, color }) {
  // GitHub-style: 7 rows (S-S), 12 columns (weeks). Each cell 22px.
  const cell = 22;
  const gap = 4;
  const rows = 7;
  const cols = 12;
  const cellsTotal = rows * cols;
  const padded = history.length < cellsTotal
    ? Array(cellsTotal - history.length).fill(-1).concat(history)
    : history.slice(-cellsTotal);

  // weekday labels — show every other one
  const weekdayLabels = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

  return (
    <div className="col gap-8">
      {/* month axis */}
      <div className="row" style={{ marginLeft: 44, gap: 0, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)" }}>
        {MONTHS_AXIS.map((m, i) => (
          <span key={m} style={{ width: (cols / MONTHS_AXIS.length) * (cell + gap), textAlign: "left" }}>{m}</span>
        ))}
      </div>

      <div className="row" style={{ gap: 8, alignItems: "flex-start" }}>
        {/* weekday axis */}
        <div className="col" style={{ gap, paddingTop: 0, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", width: 36 }}>
          {weekdayLabels.map((l, i) => (
            <div key={i} style={{ height: cell, display: "flex", alignItems: "center" }}>{l}</div>
          ))}
        </div>

        {/* the grid: render column-by-column (week-by-week) */}
        <div className="row" style={{ gap }}>
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="col" style={{ gap }}>
              {Array.from({ length: rows }).map((_, r) => {
                const idx = c * rows + r;
                const s = padded[idx];
                let bg, border, dashed = false;
                if (s === -1) {
                  bg = "transparent"; border = "transparent";
                } else if (s === 1) {
                  bg = color; border = "var(--ink)";
                } else if (s === 0.6) {
                  bg = color + "55"; border = "var(--ink)";
                } else {
                  bg = "transparent"; border = "var(--ink-faint)"; dashed = true;
                }
                return (
                  <div key={r} style={{
                    width: cell, height: cell,
                    background: bg,
                    border: border === "transparent" ? "none" : `1.2px ${dashed ? "dashed" : "solid"} ${border}`,
                    borderRadius: 4,
                  }} />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="row gap-16 center" style={{ marginTop: 6, fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-soft)" }}>
        <span className="row gap-6 center">
          <span style={{ width: 14, height: 14, background: color, border: "1.2px solid var(--ink)", borderRadius: 3 }} />
          on time
        </span>
        <span className="row gap-6 center">
          <span style={{ width: 14, height: 14, background: color + "55", border: "1.2px solid var(--ink)", borderRadius: 3 }} />
          taken late
        </span>
        <span className="row gap-6 center">
          <span style={{ width: 14, height: 14, background: "transparent", border: "1.2px dashed var(--ink-faint)", borderRadius: 3 }} />
          missed
        </span>
        <span style={{ marginLeft: "auto" }}>each square = 1 day · 12 weeks</span>
      </div>
    </div>
  );
}

function MonthCalendar({ history, color }) {
  // The most recent ~30 days, displayed as a real month grid.
  // We'll show one labeled month: "May 2025" with weeks Sun–Sat.
  const cell = 56;
  const recent = history.slice(-30); // last 30 days
  // start the month grid on the right Sunday — for sketch purposes assume first day = Wed
  const firstDayOffset = 3; // Wed (Sun=0)
  const totalCells = firstDayOffset + recent.length;
  const cells = [
    ...Array(firstDayOffset).fill(null),
    ...recent.map((s, i) => ({ s, day: i + 1 })),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="col gap-8">
      <div className="row gap-8 center between">
        <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>May 2025</span>
        <div className="row gap-6">
          <span className="sk-chip" style={{ fontSize: 11 }}>‹ April</span>
          <span className="sk-chip" style={{ fontSize: 11 }}>June ›</span>
        </div>
      </div>

      <div className="row" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {weekdays.map(w => (
          <div key={w} style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-faint)", padding: "0 4px" }}>
            {w}
          </div>
        ))}
        {cells.map((c, i) => {
          if (!c) return <div key={i} style={{ height: cell }} />;
          const { s, day } = c;
          let bg, border, dashed = false, glyph = null;
          if (s === 1) { bg = color; border = "var(--ink)"; glyph = "✓"; }
          else if (s === 0.6) { bg = color + "55"; border = "var(--ink)"; glyph = "late"; }
          else { bg = "transparent"; border = "var(--ink-faint)"; dashed = true; glyph = "—"; }
          return (
            <div key={i} style={{
              height: cell,
              background: bg,
              border: `1.2px ${dashed ? "dashed" : "solid"} ${border}`,
              borderRadius: 6,
              padding: 6,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              position: "relative",
            }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: s === 1 ? "var(--paper)" : "var(--ink-soft)" }}>{day}</span>
              <span style={{
                fontFamily: "var(--hand)", fontWeight: 700, fontSize: glyph === "late" ? 11 : 16,
                alignSelf: "flex-end",
                color: s === 1 ? "var(--paper)" : "var(--ink-soft)",
              }}>{glyph}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MedicationsPage() {
  const active = "3 Months";
  const history = React.useMemo(() => genHistory(17, DAYS, MED.rate), []);
  const onTime = history.filter(s => s === 1).length;
  const late = history.filter(s => s === 0.6).length;
  const missed = history.filter(s => s === 0).length;
  const overall = Math.round(((onTime + late * 0.5) / history.length) * 100);

  return (
    <BrowserFrame url="meliora.health/medications">
      <div className="row" style={{ height: "100%" }}>
        {/* left rail */}
        <div className="col gap-12" style={{ width: 220, padding: "20px 16px", borderRight: "1.4px solid var(--ink)", background: "var(--paper-2)" }}>
          <div className="row gap-8 center">
            <div className="logo-glyph" style={{ width: 22, height: 22 }} />
            <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>Meliora</span>
          </div>
          <div className="col gap-6" style={{ marginTop: 12 }}>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>← Dashboard</div>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Chats</div>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Locations</div>
            <div style={{ padding: "8px 10px", fontSize: 14, fontWeight: 700,
                          background: "var(--accent-soft)", border: "1.2px solid var(--ink)", borderRadius: 6 }}>
              Medications
            </div>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Profile</div>
          </div>
          <div className="sk-box col gap-6" style={{ padding: 12, marginTop: "auto" }}>
            <span className="sk-tag">Logging</span>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>
              Tap a day to log a dose retroactively, or set up auto-logging from your pill cap.
            </div>
            <span className="sk-anno" style={{ fontSize: 11 }}>connect device →</span>
          </div>
        </div>

        {/* main */}
        <div className="col" style={{ flex: 1, overflow: "auto" }}>
          {/* header */}
          <div className="row between center" style={{ padding: "14px 28px", borderBottom: "1.4px solid var(--ink)" }}>
            <div className="col">
              <span className="sk-tag">Medication · 1 active</span>
              <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 22 }}>Adherence History</span>
            </div>
            <div className="row gap-6" style={{ background: "var(--paper-2)", padding: 4, borderRadius: 999, border: "1.4px solid var(--ink)" }}>
              {MED_RANGES.map(r => (
                <div key={r} style={{
                  padding: "5px 14px",
                  fontSize: 13,
                  fontWeight: r === active ? 700 : 500,
                  background: r === active ? "var(--accent)" : "transparent",
                  border: r === active ? "1.2px solid var(--ink)" : "1.2px solid transparent",
                  borderRadius: 999,
                  fontFamily: "var(--hand)",
                }}>{r}</div>
              ))}
            </div>
          </div>

          {/* med card + stats strip */}
          <div className="row" style={{ padding: "20px 28px", gap: 20, alignItems: "stretch", borderBottom: "1.4px solid var(--ink)" }}>
            <div className="sk-box col gap-6" style={{ padding: 16, flex: "0 0 320px" }}>
              <div className="row gap-10 center">
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: MED.color, border: "1.4px solid var(--ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--paper)", fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18,
                }}>Rx</div>
                <div className="col">
                  <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 22 }}>{MED.name}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)", fontFamily: "var(--mono)" }}>{MED.dose} · {MED.schedule}</span>
                </div>
              </div>
              <div className="row gap-6" style={{ marginTop: 4, flexWrap: "wrap" }}>
                <span className="sk-tag" style={{ fontSize: 10 }}>{MED.note}</span>
                <span className="sk-tag" style={{ fontSize: 10 }}>{MED.prescriber}</span>
              </div>
              <div className="col gap-2" style={{ marginTop: 6, fontSize: 12, color: "var(--ink-soft)" }}>
                <div>Refill: <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>{MED.refill}</span></div>
                <div>Best window: <span style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>7:00–7:45 am</span></div>
              </div>
            </div>

            <div className="row" style={{ flex: 1, gap: 16 }}>
              <div className="sk-box col gap-2" style={{ padding: "12px 16px", flex: 1 }}>
                <span className="sk-tag">Overall adherence</span>
                <div className="row gap-6" style={{ alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 36 }}>{overall}%</span>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>last 12 wks</span>
                </div>
              </div>
              <div className="sk-box col gap-2" style={{ padding: "12px 16px", flex: 1 }}>
                <span className="sk-tag">Current streak</span>
                <div className="row gap-6" style={{ alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 36 }}>{MED.streak}</span>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>days · longest {MED.longestStreak}</span>
                </div>
              </div>
              <div className="sk-box col gap-2" style={{ padding: "12px 16px", flex: 1 }}>
                <span className="sk-tag">Missed / Late</span>
                <div className="row gap-6" style={{ alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 36 }}>{missed}<span style={{ fontSize: 18, color: "var(--ink-soft)" }}> / {late}</span></span>
                  <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>doses</span>
                </div>
              </div>
            </div>
          </div>

          {/* CALENDAR — full month detail */}
          <div className="col gap-8" style={{ padding: "20px 28px" }}>
            <div className="row between center">
              <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>This month</span>
              <span className="sk-anno" style={{ fontSize: 11 }}>✓ on time · late · — missed</span>
            </div>
            <div className="sk-box" style={{ padding: 16 }}>
              <MonthCalendar history={history} color={MED.color} />
            </div>
          </div>

          {/* footer actions */}
          <div className="row gap-10" style={{ padding: "12px 28px 24px", borderTop: "1.4px solid var(--ink)" }}>
            <button className="sk-btn" style={{ padding: "8px 16px", fontSize: 13 }}>+ Log dose now</button>
            <button className="sk-btn ghost" style={{ padding: "8px 16px", fontSize: 13 }}>Request refill</button>
            <button className="sk-btn ghost" style={{ padding: "8px 16px", fontSize: 13 }}>Share with Dr. Patel</button>
            <span className="sk-anno" style={{ marginLeft: "auto", fontSize: 11, alignSelf: "center" }}>
              auto-logged via pill cap · last sync 2m ago
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

Object.assign(window, { MedicationsPage });
