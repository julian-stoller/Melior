/* global React, BrowserFrame, TrendLine, CalendarGrid */

const { useState: useDashState } = React;

const RANGES = ["Day", "Week", "Month", "Year", "All"];
const CHAT_HISTORY = [
  { date: "Today", items: ["Why am I waking up at 4am?", "Headache pattern this week"] },
  { date: "Yesterday", items: ["Is 6,200 steps enough?"] },
  { date: "This week", items: ["Sumatriptan side effects", "Sleep & screen time link", "Trip to Lisbon — jet lag plan"] },
  { date: "Earlier", items: ["First check-in", "Setting up Apple Watch", "How does Meliora work?"] },
];

const MEDS = [
  { name: "Sertraline", dose: "50 mg · daily", taken: [1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1] },
  { name: "Sumatriptan", dose: "50 mg · as needed", taken: [0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0] },
  { name: "Vitamin D", dose: "2000 IU · daily", taken: [1,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1] },
];

// ---------- shared bits ----------

function ChatRail() {
  return (
    <div className="col" style={{ width: 240, borderRight: "1.4px solid var(--ink)", background: "var(--paper-2)", overflow: "auto" }}>
      <div className="row gap-8 center" style={{ padding: "16px 16px 12px", borderBottom: "1.2px dashed var(--ink-soft)" }}>
        <div className="logo-glyph" style={{ width: 22, height: 22 }} />
        <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>Meliora</span>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <button className="sk-btn" style={{ width: "100%", justifyContent: "center", padding: "8px 12px", fontSize: 14 }}>
          + New chat
        </button>
        <input className="sk-input" placeholder="search chats…" style={{ marginTop: 10, fontSize: 13, padding: "6px 10px" }} />
      </div>
      <div className="col" style={{ padding: "4px 6px 16px", gap: 12 }}>
        {CHAT_HISTORY.map((g, gi) => (
          <div key={g.date} className="col gap-4">
            <div className="sk-tag" style={{ padding: "0 10px" }}>{g.date}</div>
            {g.items.map((t, i) => (
              <div key={i} className="row gap-6 center" style={{
                padding: "8px 10px",
                borderRadius: 6,
                background: gi === 0 && i === 0 ? "var(--accent-soft)" : "transparent",
                border: gi === 0 && i === 0 ? "1.2px solid var(--ink)" : "1.2px solid transparent",
                fontSize: 13, lineHeight: 1.3,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 50,
                  background: gi === 0 && i === 0 ? "var(--accent)" : "var(--ink-faint)",
                  flexShrink: 0,
                }} />
                <span style={{
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  fontWeight: gi === 0 && i === 0 ? 700 : 400,
                }}>{t}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto", padding: "12px 14px", borderTop: "1.2px dashed var(--ink-soft)", fontSize: 12, color: "var(--ink-faint)" }}>
        John · Settings
      </div>
    </div>
  );
}

function PromptBox({ compact = false }) {
  return (
    <div className="sk-box col gap-8" style={{ padding: compact ? 12 : 14, background: "var(--paper)" }}>
      <div className="row between center">
        <div className="row gap-8 center">
          <div style={{ width: 18, height: 18, borderRadius: 50, background: "var(--accent)", border: "1.4px solid var(--ink)" }} />
          <span className="sk-tag">Ask Claude · grounded in your data</span>
        </div>
        <span className="sk-anno" style={{ fontSize: 11 }}>private · not used for training</span>
      </div>
      <div style={{
        minHeight: compact ? 28 : 36,
        fontSize: compact ? 15 : 16,
        color: "var(--ink-soft)",
        fontFamily: "var(--hand)",
        lineHeight: 1.3,
      }}>
        Ask about a pattern, log a symptom, or describe how you're feeling…
      </div>
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="sk-btn" style={{ padding: "5px 14px", fontSize: 13 }}>Send →</button>
      </div>
    </div>
  );
}

function RangeTabs({ active = "Week" }) {
  return (
    <div className="row gap-6" style={{ background: "var(--paper-2)", padding: 4, borderRadius: 999, border: "1.4px solid var(--ink)", width: "fit-content" }}>
      {RANGES.map(r => (
        <div key={r} style={{
          padding: "5px 14px",
          fontSize: 13,
          fontWeight: r === active ? 700 : 500,
          background: r === active ? "var(--accent)" : "transparent",
          color: "var(--ink)",
          border: r === active ? "1.2px solid var(--ink)" : "1.2px solid transparent",
          borderRadius: 999,
          fontFamily: "var(--hand)",
        }}>{r}</div>
      ))}
    </div>
  );
}

// Bar chart for daily values, with y-axis + dashed average line
function BarSeries({ data, accent = false, height = 70, width: widthProp = 360, unit = "", yTickCount = 4, yMax }) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(widthProp);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = e.contentRect.width;
        if (w > 0) setWidth(w);
      }
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const max = Math.max(...data);
  const top = yMax != null
    ? yMax
    : (Math.ceil(max / 1000) * 1000 > 1000 ? Math.ceil(max / 1000) * 1000 : Math.ceil(max / 60) * 60);
  const axisW = 32;
  const plotW = width - axisW;
  const bw = (plotW - (data.length - 1) * 4) / data.length;
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const avgY = height - (avg / top) * height;
  const ticks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((top * i) / yTickCount));
  const fmt = v => v >= 1000 ? (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k" : v;
  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg width={width} height={height + 18} viewBox={`0 0 ${width} ${height + 18}`} style={{ display: "block" }}>
      {/* y-axis ticks */}
      {ticks.map((t, i) => {
        const y = height - (t / top) * height;
        return (
          <g key={i}>
            <line x1={axisW - 2} y1={y} x2={width} y2={y} stroke="var(--ink-faint)" strokeWidth={0.6} opacity={0.4} />
            <text x={axisW - 4} y={y + 3} textAnchor="end" fontSize="9" fontFamily="var(--mono)" fill="var(--ink-faint)">{fmt(t)}</text>
          </g>
        );
      })}
      {/* bars */}
      {data.map((v, i) => {
        const h = (v / top) * height;
        const x = axisW + i * (bw + 4);
        return (
          <rect key={i} x={x} y={height - h} width={bw} height={h}
            fill={accent ? "var(--accent)" : "var(--ink)"}
            opacity={i === data.length - 1 ? 1 : 0.75}
            stroke="var(--ink)" strokeWidth={1.2} rx={2} />
        );
      })}
      {/* average line */}
      <line x1={axisW} y1={avgY} x2={width} y2={avgY}
        stroke="var(--ink)" strokeWidth={1.4} strokeDasharray="5 4" />
      <text x={width - 2} y={avgY - 3} textAnchor="end" fontSize="10" fontFamily="var(--mono)"
        fill="var(--ink)" fontWeight="700">avg {fmt(Math.round(avg))}{unit}</text>
      {/* day labels */}
      {["M","T","W","T","F","S","S"].map((d, i) => (
        <text key={i} x={axisW + i * (bw + 4) + bw / 2} y={height + 14}
          textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="var(--ink-faint)">{d}</text>
      ))}
    </svg>
    </div>
  );
}

// Sleep total hours per night — single-color bars + y-axis + average line
function SleepStages({ width = 360, height = 70 }) {
  const totals = [5.2, 5.9, 3.8, 6.6, 5.5, 6.2, 6.0];
  // y-axis tops out at the max value (capped at 24h, never beyond)
  const max = Math.min(24, Math.max(...totals));
  return <BarSeries data={totals} accent height={height} width={width} unit="h" yTickCount={3} yMax={max} />;
}

// Med adherence calendar — last 28 days, grouped per med
function MedAdherence({ med, days = 28 }) {
  const cols = 7;
  const taken = med.taken.slice(-days);
  const pct = Math.round((taken.filter(Boolean).length / taken.length) * 100);
  const dayLabels = ["S","M","T","W","T","F","S"];
  return (
    <div className="col gap-8">
      <div className="row between center">
        <div className="col">
          <span style={{ fontSize: 15, fontWeight: 700 }}>{med.name}</span>
          <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>{med.dose}</span>
        </div>
        <div className="col" style={{ alignItems: "flex-end" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: pct > 85 ? "var(--accent)" : "var(--ink)" }}>{pct}%</span>
          <span className="sk-tag">last 4 wks</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4 }}>
        {dayLabels.map((d, i) => (
          <div key={i} style={{ fontSize: 9, fontFamily: "var(--mono)", color: "var(--ink-faint)", textAlign: "center" }}>{d}</div>
        ))}
        {taken.map((t, i) => {
          const isToday = i === taken.length - 1;
          const asNeeded = med.dose.includes("as needed");
          return (
            <div key={i} style={{
              aspectRatio: "1",
              borderRadius: 4,
              border: "1.2px solid var(--ink)",
              background: t ? (asNeeded ? "var(--ink)" : "var(--accent)") : "var(--paper)",
              position: "relative",
              outline: isToday ? "2px solid var(--ink)" : "none",
              outlineOffset: 1,
            }}>
              {!t && !asNeeded && (
                <svg width="100%" height="100%" viewBox="0 0 10 10">
                  <line x1="2" y1="2" x2="8" y2="8" stroke="var(--ink-faint)" strokeWidth="0.8" />
                  <line x1="8" y1="2" x2="2" y2="8" stroke="var(--ink-faint)" strokeWidth="0.8" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Insight card
function InsightCard({ title, body, accent }) {
  return (
    <div className="sk-box col gap-6" style={{ padding: 14, background: accent ? "var(--accent-soft)" : "var(--paper)" }}>
      <div className="sk-tag">Meliora noticed</div>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.4 }}>{body}</div>
    </div>
  );
}

// Stat card
function StatCard({ label, value, delta, accent }) {
  return (
    <div className="sk-box col gap-4" style={{ padding: 14 }}>
      <div className="sk-tag">{label}</div>
      <div className="row between" style={{ alignItems: "baseline" }}>
        <span style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--hand)" }}>{value}</span>
        {delta && <span className="sk-anno" style={{ fontSize: 12, color: accent ? "var(--accent)" : "var(--ink-soft)" }}>{delta}</span>}
      </div>
    </div>
  );
}

// =====================================================================
// Dashboard 1 — Standard rail + prompt + grid
// =====================================================================
function DashboardStandard() {
  return (
    <BrowserFrame url="meliora.health/home">
      <div className="row" style={{ height: "100%" }}>
        <ChatRail />
        <div className="col" style={{ flex: 1, overflow: "auto" }}>
          {/* Top bar */}
          <div className="row between center" style={{ padding: "14px 28px", borderBottom: "1.4px solid var(--ink)" }}>
            <div className="col">
              <span className="sk-tag">Wednesday · Apr 25</span>
              <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 22 }}>Good morning, John</span>
            </div>
            <RangeTabs active="Week" />
          </div>
          {/* Prompt */}
          <div style={{ padding: "20px 28px 12px" }}>
            <PromptBox />
            <div className="row gap-8" style={{ marginTop: 10 }}>
              <span className="sk-tag" style={{ alignSelf: "center" }}>Try:</span>
              <div className="sk-chip" style={{ fontSize: 12 }}>"Why are my headaches worse this week?"</div>
              <div className="sk-chip" style={{ fontSize: 12 }}>"Summarize for my doctor"</div>
              <div className="sk-chip" style={{ fontSize: 12 }}>"Log: woke up dizzy"</div>
            </div>
          </div>
          {/* Data grid */}
          <div style={{ padding: "16px 28px 28px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            <StatCard label="Sleep avg" value="6h 48m" delta="−22m vs last wk" />
            <StatCard label="Steps avg" value="7,420" delta="+8%" accent />
            <StatCard label="Resting HR" value="62 bpm" delta="steady" />
            <StatCard label="Screen evening" value="2h 12m" delta="−18m" accent />

            <div className="sk-box col gap-8" style={{ padding: 14, gridColumn: "span 2" }}>
              <div className="row between">
                <span className="sk-tag">Sleep · this week</span>
                <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>light · deep · rem</span>
              </div>
              <SleepStages width={420} height={90} />
            </div>
            <div className="sk-box col gap-8" style={{ padding: 14, gridColumn: "span 2" }}>
              <div className="row between">
                <span className="sk-tag">Steps · this week</span>
                <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>goal 8,000</span>
              </div>
              <BarSeries data={[6200, 8400, 5100, 9200, 7300, 4800, 11200]} accent height={90} width={420} />
            </div>

            <div className="sk-box col gap-8" style={{ padding: 14, gridColumn: "span 2" }}>
              <div className="row between">
                <span className="sk-tag">Symptom log · this week</span>
                <span className="sk-anno" style={{ fontSize: 12 }}>+ add</span>
              </div>
              <div className="col gap-6" style={{ fontSize: 13 }}>
                <div className="row gap-8 center"><span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: 50 }} /> Tue 3pm · headache, mild · 90 min</div>
                <div className="row gap-8 center"><span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: 50 }} /> Thu 11am · headache, moderate · 3h</div>
                <div className="row gap-8 center"><span style={{ width: 6, height: 6, background: "var(--ink)", borderRadius: 50 }} /> Fri am · woke up dizzy</div>
              </div>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <InsightCard accent
                title="Headaches cluster after <6h sleep nights"
                body="3 of 4 reported headaches this week followed nights below your 6.5h baseline. Worth flagging at your appointment Friday."
              />
            </div>

            {/* Med adherence row */}
            <div className="sk-box col gap-14" style={{ padding: 16, gridColumn: "span 4", display: "none" }}>
              <div className="row between center">
                <div className="col">
                  <span className="sk-tag">Medication adherence · last 4 weeks</span>
                  <span style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>You're on a 5-day Sertraline streak.</span>
                </div>
                <div className="row gap-12 center" style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-faint)" }}>
                  <span className="row gap-4 center"><span style={{ width: 12, height: 12, background: "var(--accent)", border: "1.2px solid var(--ink)", borderRadius: 3 }} />taken (daily)</span>
                  <span className="row gap-4 center"><span style={{ width: 12, height: 12, background: "var(--ink)", border: "1.2px solid var(--ink)", borderRadius: 3 }} />as needed</span>
                  <span className="row gap-4 center"><span style={{ width: 12, height: 12, background: "var(--paper)", border: "1.2px solid var(--ink)", borderRadius: 3 }} />missed</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                {MEDS.map(m => <MedAdherence key={m.name} med={m} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Dashboard 2 — Compact, denser, rail + 3-col grid
// =====================================================================
function DashboardCompact() {
  return (
    <BrowserFrame url="meliora.health/home">
      <div className="row" style={{ height: "100%" }}>
        <ChatRail />
        <div className="col" style={{ flex: 1, overflow: "auto" }}>
          <div className="row between center" style={{ padding: "12px 24px", borderBottom: "1.4px solid var(--ink)", gap: 16 }}>
            <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>Your week, so far</span>
            <RangeTabs active="Week" />
            <div className="row gap-6">
              <div className="sk-chip" style={{ fontSize: 12 }}>Export PDF</div>
              <div className="sk-chip on" style={{ fontSize: 12 }}>Share with Dr. Patel</div>
            </div>
          </div>
          {/* Prompt - compact */}
          <div style={{ padding: "14px 24px 8px" }}>
            <PromptBox compact />
          </div>
          <div style={{ padding: "12px 24px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {/* Row 1 — stats */}
            <StatCard label="Sleep" value="6h 48m" delta="−22m" />
            <StatCard label="HRV" value="48 ms" delta="↓ slightly" />
            <StatCard label="Mood (logged)" value="3.4 / 5" delta="6 entries" accent />

            {/* Row 2 — chart trio */}
            <div className="sk-box col gap-6" style={{ padding: 12 }}>
              <span className="sk-tag">Sleep stages</span>
              <SleepStages width={260} height={70} />
            </div>
            <div className="sk-box col gap-6" style={{ padding: 12 }}>
              <span className="sk-tag">Steps</span>
              <BarSeries data={[6200, 8400, 5100, 9200, 7300, 4800, 11200]} accent height={70} width={260} />
            </div>
            <div className="sk-box col gap-6" style={{ padding: 12 }}>
              <span className="sk-tag">Resting HR</span>
              <TrendLine width={260} height={70} />
            </div>

            {/* Row 3 — geolocation + screen time */}
            <div className="sk-box col gap-8" style={{ padding: 12 }}>
              <span className="sk-tag">Locations · 7 days</span>
              <div className="row gap-4">
                {[1,1,1,1,0,1,1].map((v, i) => (
                  <div key={i} style={{ flex: 1, height: 28, border: "1.2px solid var(--ink)", borderRadius: 3,
                    background: v ? "var(--accent-soft)" : "var(--paper)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "var(--mono)" }}>
                    {[3,5,2,4,0,1,6][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>places visited per day</span>
            </div>
            <div className="sk-box col gap-8" style={{ padding: 12 }}>
              <span className="sk-tag">Screen time · evening</span>
              <BarSeries data={[120, 95, 165, 80, 110, 220, 140]} height={70} width={260} />
            </div>
            <InsightCard accent
              title="Screen-heavy evenings → shorter sleep"
              body="Saturday's 3h+ evening screen lined up with 5h 12m sleep — your shortest of the week."
            />

            {/* Med adherence */}
            <div className="sk-box col gap-12" style={{ padding: 14, gridColumn: "span 3", display: "none" }}>
              <div className="row between center">
                <span className="sk-tag">Medication adherence · last 4 weeks</span>
                <div className="row gap-10 center" style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-faint)" }}>
                  <span className="row gap-4 center"><span style={{ width: 10, height: 10, background: "var(--accent)", border: "1.2px solid var(--ink)" }} />taken</span>
                  <span className="row gap-4 center"><span style={{ width: 10, height: 10, background: "var(--ink)", border: "1.2px solid var(--ink)" }} />as needed</span>
                  <span className="row gap-4 center"><span style={{ width: 10, height: 10, background: "var(--paper)", border: "1.2px solid var(--ink)" }} />missed</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                {MEDS.map(m => <MedAdherence key={m.name} med={m} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Dashboard 3 — Conversation-led: prompt is hero, data feels like answers
// =====================================================================
function DashboardConversational() {
  return (
    <BrowserFrame url="meliora.health/home">
      <div className="row" style={{ height: "100%" }}>
        <ChatRail />
        <div className="col" style={{ flex: 1, overflow: "auto" }}>
          <div className="row between center" style={{ padding: "14px 32px", borderBottom: "1.4px solid var(--ink)" }}>
            <span className="sk-tag">Wed · Apr 25 · Brooklyn, NY</span>
            <div className="row gap-12 center">
              <button className="sk-btn ghost" style={{ padding: "6px 14px", fontSize: 13 }}>Locations →</button>
              <RangeTabs active="Week" />
            </div>
          </div>
          {/* Hero prompt */}
          <div style={{ padding: "32px 32px 16px" }}>
            <div className="col gap-8" style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 26 }}>What's on your mind, John?</span>
              <span className="sk-body" style={{ fontSize: 15 }}>I've got your last 7 days loaded. Ask anything, or just describe how you're feeling.</span>
            </div>
            <PromptBox />
          </div>
          {/* "Today's read" — feels like an answer */}
          <div style={{ padding: "16px 32px 28px" }}>
            <div className="sk-box col gap-12" style={{ padding: 18, background: "var(--accent-soft)" }}>
              <div className="row between center">
                <span className="sk-tag">Today's read · auto-generated</span>
                <span className="sk-anno" style={{ fontSize: 12 }}>open as chat ↗</span>
              </div>
              <div style={{ fontSize: 18, lineHeight: 1.45 }}>
                You slept <b>6h 48m</b> on average — about <b>22 minutes less</b> than last week. Two of three reported
                headaches followed nights under 6h. Sertraline adherence is steady at <b>93%</b>; you've missed Vitamin D
                three times this week.
              </div>
              <div className="row gap-8">
                <button className="sk-btn" style={{ padding: "6px 14px", fontSize: 13 }}>Dig into headaches →</button>
                <button className="sk-btn ghost" style={{ padding: "6px 14px", fontSize: 13 }}>Save for doctor</button>
              </div>
            </div>
          </div>
          {/* Compact data row */}
          <div style={{ padding: "0 32px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <StatCard label="Sleep avg" value="6h 48m" delta="−22m" />
            <StatCard label="Steps avg" value="7,420" delta="+8%" accent />
            <StatCard label="Headaches" value="3" delta="2 above baseline" />
          </div>
          {/* Charts */}
          <div style={{ padding: "0 32px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="sk-box col gap-8" style={{ padding: 14 }}>
              <div className="row between center">
                <span className="sk-tag">Sleep · this week</span>
              </div>
              <SleepStages width={420} height={90} />
            </div>
            <div className="sk-box col gap-8" style={{ padding: 14 }}>
              <div className="row between center">
                <span className="sk-tag">Steps · this week</span>
              </div>
              <BarSeries data={[6200, 8400, 5100, 9200, 7300, 4800, 11200]} accent height={90} width={420} />
            </div>
          </div>
          {/* Screentime + Time in the sun — side by side */}
          <div style={{ padding: "0 32px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Screentime */}
            <div className="sk-box col gap-12" style={{ padding: 16 }}>
              <div className="row between center">
                <div className="col">
                  <span className="sk-tag">Screentime · this week</span>
                  <span style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>4h 12m/day average · ↑ 38m vs last week</span>
                </div>
              </div>
              <BarSeries data={[3.4, 4.1, 3.8, 4.6, 4.2, 6.1, 3.2]} accent height={90} width={420} unit="h" yTickCount={3} yMax={6.1} />
            </div>
            {/* Time in the sun */}
            <div className="sk-box col gap-12" style={{ padding: 16 }}>
              <div className="row between center">
                <div className="col">
                  <span className="sk-tag">Time seeing the sun · this week</span>
                  <span style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>34 min/day average · below the 60 min target</span>
                </div>
              </div>
              <BarSeries data={[28, 42, 18, 65, 50, 12, 22]} accent height={90} width={420} unit="m" yTickCount={3} yMax={65} />
            </div>
          </div>
          {/* Med adherence */}
          <div style={{ padding: "0 32px 32px", display: "none" }}>
            <div className="sk-box col gap-12" style={{ padding: 16 }}>
              <div className="row between center">
                <div className="col">
                  <span className="sk-tag">Medication adherence · last 4 weeks</span>
                  <span style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>3 doses missed this week — all Vitamin D, all Sundays.</span>
                </div>
                <button className="sk-btn ghost" style={{ padding: "4px 12px", fontSize: 12 }}>set reminder</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                {MEDS.map(m => <MedAdherence key={m.name} med={m} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

Object.assign(window, {
  DashboardStandard, DashboardCompact, DashboardConversational,
});
