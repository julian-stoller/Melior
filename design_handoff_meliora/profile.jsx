/* global React, BrowserFrame */

const PROFILE = {
  name: "John Doe",
  age: 38,
  pronouns: "he/him",
  height: "5'9\"",
  weight: "168 lb",
  bloodType: "O+",
  primary: "Dr. Anjali Patel · Park Slope Internal Medicine",
  nextVisit: "Fri, May 30 · 10:30 am",
  lastSync: "2 minutes ago",
  joined: "Joined Meliora · Feb 2024",
};

// AI-generated summary blocks. Every block has provenance + last-updated + user-edit/dismiss controls.
const SUMMARY = {
  oneLiner:
    "Generally healthy 38-year-old. The two patterns worth flagging this visit: recurring headaches that follow short-sleep nights, and a tick-exposure event last Thursday.",
  topPatterns: [
    {
      tag: "Recurring · 8 wks",
      title: "Headaches cluster after <6h sleep nights",
      body: "12 of 14 logged headaches followed a night under your 6.5h baseline. Median onset: 4h after waking. Sumatriptan used 3× this month — within prescribed range.",
      sources: ["sleep tracker", "symptom logs", "medication logs"],
      priority: "discuss",
    },
    {
      tag: "Single event · May 22",
      title: "1h 22m in a tick-flagged area near Prospect Park",
      body: "Walked through tall-grass region during the Home → Gym route on Thursday. No bite reported. Tick check at next exam recommended; window for prophylaxis closes ~72h post-exposure.",
      sources: ["location history", "CDC tick risk overlay"],
      priority: "high",
    },
    {
      tag: "Trend · 3 mo",
      title: "Resting HR drifted up by 4 bpm",
      body: "From a 58 bpm baseline in Feb to 62 bpm in May. Coincides with reduced cardio frequency (3.2 → 1.8 sessions/wk). Not yet outside healthy range.",
      sources: ["wearable HR", "workout logs"],
      priority: "monitor",
    },
  ],
  vitals: [
    { label: "Resting HR", value: "62 bpm", trend: "↑ 4 from Feb" },
    { label: "BP (avg)", value: "118 / 76", trend: "stable" },
    { label: "Sleep avg", value: "6h 48m", trend: "↓ 22m" },
    { label: "Steps avg", value: "7,420", trend: "↑ 8%" },
    { label: "Weight", value: "168 lb", trend: "−1 lb / 90d" },
    { label: "HRV", value: "48 ms", trend: "↓ slightly" },
  ],
  conditions: [
    { name: "Migraine (episodic)", status: "active", since: "2019" },
    { name: "Seasonal allergies", status: "active", since: "2016" },
    { name: "Pre-diabetes", status: "monitoring", since: "2023" },
  ],
  meds: [
    { name: "Lisinopril 10 mg", note: "1× daily · adherence 92%" },
    { name: "Sumatriptan 50 mg", note: "as needed · 3× this month" },
    { name: "Vitamin D3 2000 IU", note: "1× daily" },
  ],
  questions: [
    "Should I switch from sumatriptan to a daily preventative given the sleep correlation?",
    "Is the resting HR drift something to image, or wait another quarter?",
    "Permethrin treatment for clothes — worth doing routinely or only seasonally?",
  ],
  excluded: [
    "Step count chart (excluded by user)",
    "Mood entries (kept private)",
  ],
  sharedWith: [
    { who: "Dr. Anjali Patel", what: "Full summary + last 12 wks", when: "shared May 18" },
    { who: "Mei Reyes (spouse)", what: "Emergency contact view", when: "always on" },
  ],
};

function Pill({ children, tone = "ink" }) {
  const map = {
    ink:    { bg: "var(--ink)", fg: "var(--paper)" },
    accent: { bg: "var(--accent)", fg: "var(--paper)" },
    soft:   { bg: "var(--accent-soft)", fg: "var(--ink)" },
    ghost:  { bg: "transparent", fg: "var(--ink-soft)" },
  }[tone];
  return (
    <span style={{
      fontSize: 10, fontFamily: "var(--mono)", letterSpacing: "0.05em",
      background: map.bg, color: map.fg,
      padding: "2px 8px", borderRadius: 4,
      border: tone === "ghost" ? "1px solid var(--ink-faint)" : "none",
      textTransform: "uppercase",
    }}>{children}</span>
  );
}

function PatternCard({ p }) {
  const tone = p.priority === "high" ? "accent" : p.priority === "discuss" ? "ink" : "ghost";
  return (
    <div className="sk-box col gap-8" style={{
      padding: 16,
      background: p.priority === "high" ? "var(--accent-soft)" : "var(--paper)",
    }}>
      <div className="row gap-8 center">
        <Pill tone={tone}>{p.priority}</Pill>
        <span className="sk-tag">{p.tag}</span>
      </div>
      <div style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 19, lineHeight: 1.25 }}>
        {p.title}
      </div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
        {p.body}
      </div>
      <div className="row between center" style={{ marginTop: 4 }}>
        <div className="row gap-4 center" style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-faint)", flexWrap: "wrap" }}>
          <span>sources:</span>
          {p.sources.map((s, i) => (
            <span key={s} style={{ borderBottom: "1px dotted var(--ink-faint)" }}>
              {s}{i < p.sources.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
        <div className="row gap-6">
          <div className="sk-chip" style={{ fontSize: 11, padding: "3px 8px" }}>edit</div>
          <div className="sk-chip" style={{ fontSize: 11, padding: "3px 8px" }}>exclude</div>
          <div className="sk-chip on" style={{ fontSize: 11, padding: "3px 8px" }}>add to visit</div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <BrowserFrame url="meliora.health/profile">
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
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Medications</div>
            <div style={{ padding: "8px 10px", fontSize: 14, fontWeight: 700,
                          background: "var(--accent-soft)", border: "1.2px solid var(--ink)", borderRadius: 6 }}>
              Profile
            </div>
          </div>
          <div className="sk-box col gap-6" style={{ padding: 12, marginTop: "auto" }}>
            <span className="sk-tag">What is this</span>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.45 }}>
              Meliora's AI keeps a living summary of your health. You can edit, exclude, or
              share any part. Nothing leaves your account without you saying so.
            </div>
            <span className="sk-anno" style={{ fontSize: 11 }}>privacy & data →</span>
          </div>
        </div>

        {/* main */}
        <div className="col" style={{ flex: 1, overflow: "auto" }}>
          {/* identity strip */}
          <div className="row between center" style={{ padding: "18px 28px", borderBottom: "1.4px solid var(--ink)", gap: 24 }}>
            <div className="row gap-14 center">
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                border: "1.4px solid var(--ink)", background: "var(--paper-2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--hand)", fontWeight: 700, fontSize: 22,
              }}>JD</div>
              <div className="col">
                <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 24 }}>{PROFILE.name}</span>
                <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--ink-soft)" }}>
                  {PROFILE.age} · {PROFILE.pronouns} · {PROFILE.height} · {PROFILE.weight} · blood {PROFILE.bloodType}
                </span>
                <span style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>{PROFILE.joined}</span>
              </div>
            </div>
            <div className="row gap-10 center">
              <div className="col" style={{ alignItems: "flex-end" }}>
                <span className="sk-tag">Next visit</span>
                <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 16 }}>{PROFILE.nextVisit}</span>
                <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>{PROFILE.primary}</span>
              </div>
              <button className="sk-btn" style={{ padding: "8px 16px", fontSize: 13 }}>
                Prepare for visit →
              </button>
            </div>
          </div>

          {/* AI summary banner */}
          <div className="col gap-10" style={{ padding: "20px 28px", borderBottom: "1.4px solid var(--ink)" }}>
            <div className="row between center">
              <div className="row gap-8 center">
                <Pill tone="ink">AI summary</Pill>
                <span className="sk-tag">auto-generated · {PROFILE.lastSync}</span>
              </div>
              <div className="row gap-6">
                <div className="sk-chip" style={{ fontSize: 12 }}>regenerate</div>
                <div className="sk-chip" style={{ fontSize: 12 }}>edit tone</div>
                <div className="sk-chip on" style={{ fontSize: 12 }}>export PDF</div>
              </div>
            </div>
            <div style={{
              fontFamily: "var(--hand)", fontWeight: 600, fontSize: 22, lineHeight: 1.4,
              padding: "10px 0",
            }}>
              "{SUMMARY.oneLiner}"
            </div>
            <div className="row gap-8" style={{ flexWrap: "wrap", fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--mono)" }}>
              <span>Generated from:</span>
              <span style={{ borderBottom: "1px dotted var(--ink-faint)" }}>84 days of wearable data</span>
              <span>·</span>
              <span style={{ borderBottom: "1px dotted var(--ink-faint)" }}>22 chat sessions</span>
              <span>·</span>
              <span style={{ borderBottom: "1px dotted var(--ink-faint)" }}>3 medications</span>
              <span>·</span>
              <span style={{ borderBottom: "1px dotted var(--ink-faint)" }}>location history</span>
            </div>
          </div>

          {/* main content grid */}
          <div className="row" style={{ padding: "20px 28px", gap: 20, alignItems: "flex-start" }}>
            {/* LEFT — patterns + questions */}
            <div className="col gap-16" style={{ flex: 1.5 }}>
              <div className="col gap-10">
                <div className="row between center">
                  <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 20 }}>
                    Patterns to bring to your next visit
                  </span>
                  <span className="sk-anno" style={{ fontSize: 11 }}>3 of 8 surfaced · view all →</span>
                </div>
                <div className="col gap-10">
                  {SUMMARY.topPatterns.map((p, i) => <PatternCard key={i} p={p} />)}
                </div>
              </div>
            </div>

            {/* RIGHT — vitals, conditions, meds, sharing */}
            <div className="col gap-16" style={{ width: 380 }}>
              {/* Vitals snapshot */}
              <div className="sk-box col gap-8" style={{ padding: 14 }}>
                <div className="row between center">
                  <span className="sk-tag">Vitals · 12-week snapshot</span>
                  <span className="sk-anno" style={{ fontSize: 11 }}>edit →</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {SUMMARY.vitals.map(v => (
                    <div key={v.label} className="col" style={{
                      padding: "8px 10px", border: "1px solid var(--ink-faint)", borderRadius: 6,
                    }}>
                      <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--ink-faint)", textTransform: "uppercase" }}>
                        {v.label}
                      </span>
                      <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>{v.value}</span>
                      <span style={{ fontSize: 10, color: "var(--ink-soft)" }}>{v.trend}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div className="sk-box col gap-6" style={{ padding: 14 }}>
                <span className="sk-tag">Active conditions</span>
                <div className="col">
                  {SUMMARY.conditions.map(c => (
                    <div key={c.name} className="row between center" style={{
                      padding: "8px 0", borderTop: "1px dashed var(--ink-faint)",
                    }}>
                      <div className="col">
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</span>
                        <span style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--mono)" }}>
                          since {c.since}
                        </span>
                      </div>
                      <Pill tone={c.status === "active" ? "ink" : "ghost"}>{c.status}</Pill>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meds compact */}
              <div className="sk-box col gap-6" style={{ padding: 14 }}>
                <div className="row between center">
                  <span className="sk-tag">Current medications</span>
                  <span className="sk-anno" style={{ fontSize: 11 }}>full list →</span>
                </div>
                <div className="col">
                  {SUMMARY.meds.map(m => (
                    <div key={m.name} className="row between" style={{
                      padding: "6px 0", borderTop: "1px dashed var(--ink-faint)", fontSize: 13,
                    }}>
                      <span>{m.name}</span>
                      <span style={{ fontFamily: "var(--mono)", color: "var(--ink-faint)", fontSize: 11 }}>{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excluded from summary */}
              <div className="sk-box col gap-6" style={{ padding: 14, background: "var(--paper-2)" }}>
                <span className="sk-tag">Excluded from summary</span>
                <div className="col gap-2">
                  {SUMMARY.excluded.map(x => (
                    <div key={x} className="row gap-6 center" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
                      <span style={{ fontFamily: "var(--mono)" }}>—</span>
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
                <span className="sk-anno" style={{ fontSize: 11, marginTop: 4 }}>manage what AI can see →</span>
              </div>

              {/* Sharing */}
              <div className="sk-box col gap-6" style={{ padding: 14 }}>
                <span className="sk-tag">Shared with</span>
                <div className="col">
                  {SUMMARY.sharedWith.map(s => (
                    <div key={s.who} className="col" style={{
                      padding: "8px 0", borderTop: "1px dashed var(--ink-faint)",
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{s.who}</span>
                      <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.what}</span>
                      <span style={{ fontSize: 10, color: "var(--ink-faint)", fontFamily: "var(--mono)", marginTop: 2 }}>
                        {s.when}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="sk-btn ghost" style={{ padding: "6px 12px", fontSize: 12, marginTop: 6, alignSelf: "flex-start" }}>
                  + share with another provider
                </button>
              </div>
            </div>
          </div>

          {/* footer actions */}
          <div className="row gap-10 center" style={{
            padding: "14px 28px 22px", borderTop: "1.4px solid var(--ink)", gap: 10,
          }}>
            <button className="sk-btn" style={{ padding: "9px 18px", fontSize: 13 }}>
              Send summary to Dr. Patel
            </button>
            <button className="sk-btn ghost" style={{ padding: "9px 18px", fontSize: 13 }}>
              Download as PDF
            </button>
            <button className="sk-btn ghost" style={{ padding: "9px 18px", fontSize: 13 }}>
              Print one-pager
            </button>
            <span className="sk-anno" style={{ marginLeft: "auto", fontSize: 11 }}>
              you control what's shared · nothing sent without confirmation
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

Object.assign(window, { ProfilePage });
