import { SideRail } from "@/components/SideRail";

const tag = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 10,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#8a8a8a",
};

const PROFILE = {
  name: "John Doe",
  initials: "JD",
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

const VITALS = [
  { label: "Resting HR", value: "62 bpm", trend: "↑ 4 from Feb" },
  { label: "BP (avg)", value: "118 / 76", trend: "stable" },
  { label: "Sleep avg", value: "6h 48m", trend: "↓ 22m" },
  { label: "Steps avg", value: "7,420", trend: "↑ 8%" },
  { label: "Weight", value: "168 lb", trend: "−1 lb / 90d" },
  { label: "HRV", value: "48 ms", trend: "↓ slightly" },
];

const CONDITIONS = [
  { name: "Migraine (episodic)", status: "active", since: "2019" },
  { name: "Seasonal allergies", status: "active", since: "2016" },
  { name: "Pre-diabetes", status: "monitoring", since: "2023" },
];

const MEDS = [
  { name: "Lisinopril 10 mg", note: "1× daily · adherence 92%" },
  { name: "Sumatriptan 50 mg", note: "as needed · 3× this month" },
  { name: "Vitamin D3 2000 IU", note: "1× daily" },
];

const TOP_PATTERNS = [
  {
    tag: "Recurring · 8 wks",
    title: "Headaches cluster after <6h sleep nights",
    body: "12 of 14 logged headaches followed a night under your 6.5h baseline. Median onset: 4h after waking. Sumatriptan used 3× this month — within prescribed range.",
    sources: ["sleep tracker", "symptom logs", "medication logs"],
    priority: "discuss" as const,
  },
  {
    tag: "Single event · May 22",
    title: "1h 22m in a tick-flagged area near Prospect Park",
    body: "Walked through tall-grass region during the Home → Gym route on Thursday. No bite reported. Tick check at next exam recommended; window for prophylaxis closes ~72h post-exposure.",
    sources: ["location history", "CDC tick risk overlay"],
    priority: "high" as const,
  },
  {
    tag: "Trend · 3 mo",
    title: "Resting HR drifted up by 4 bpm",
    body: "From a 58 bpm baseline in Feb to 62 bpm in May. Coincides with reduced cardio frequency (3.2 → 1.8 sessions/wk). Not yet outside healthy range.",
    sources: ["wearable HR", "workout logs"],
    priority: "monitor" as const,
  },
];

const SHARED_WITH = [
  { who: "Dr. Anjali Patel", what: "Full summary + last 12 wks", when: "shared May 18" },
  { who: "Mei Reyes (spouse)", what: "Emergency contact view", when: "always on" },
];

const EXCLUDED = [
  "Step count chart (excluded by user)",
  "Mood entries (kept private)",
];

function Pill({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "accent" | "soft" | "ghost";
}) {
  const styles = {
    ink: { bg: "#1a1a1a", fg: "#fafaf7" },
    accent: { bg: "#e76f51", fg: "#fafaf7" },
    soft: { bg: "#fbe3d8", fg: "#1a1a1a" },
    ghost: { bg: "transparent", fg: "#4a4a4a", border: "1px solid #8a8a8a" },
  }[tone];

  return (
    <span
      style={{
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: 10,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        background: styles.bg,
        color: styles.fg,
        padding: "2px 8px",
        borderRadius: 4,
        border: tone === "ghost" ? "1px solid #8a8a8a" : "none",
        display: "inline",
      }}
    >
      {children}
    </span>
  );
}

function PatternCard({
  p,
}: {
  p: (typeof TOP_PATTERNS)[number];
}) {
  const tone =
    p.priority === "high" ? "accent" : p.priority === "discuss" ? "ink" : "ghost";
  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-md"
      style={{
        border: "1.2px solid #1a1a1a",
        background: p.priority === "high" ? "#fbe3d8" : "#fafaf7",
      }}
    >
      <div className="flex items-center gap-2">
        <Pill tone={tone}>{p.priority}</Pill>
        <span style={tag}>{p.tag}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: 17,
          color: "#1a1a1a",
          lineHeight: 1.3,
        }}
      >
        {p.title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 13,
          color: "#4a4a4a",
          lineHeight: 1.5,
        }}
      >
        {p.body}
      </div>
      <div className="flex items-center justify-between mt-1">
        <div
          className="flex items-center gap-1 flex-wrap"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, color: "#8a8a8a" }}
        >
          <span>sources:</span>
          {p.sources.map((s, i) => (
            <span
              key={s}
              style={{ borderBottom: "1px dotted #8a8a8a" }}
            >
              {s}
              {i < p.sources.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {["edit", "exclude"].map((a) => (
            <button
              key={a}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                border: "1.2px solid #1a1a1a",
                background: "#fafaf7",
                fontFamily: "var(--font-inter)",
                color: "#1a1a1a",
              }}
            >
              {a}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              border: "1.2px solid #1a1a1a",
              background: "#fbe3d8",
              fontFamily: "var(--font-inter)",
              color: "#1a1a1a",
            }}
          >
            add to visit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#fafaf7" }}>
      <SideRail
        activePage="/profile"
        note={{
          tag: "What is this",
          body: "Meliora's AI keeps a living summary of your health. You can edit, exclude, or share any part. Nothing leaves your account without you saying so.",
          action: "privacy & data →",
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Identity strip */}
        <div
          className="flex items-center justify-between px-7 py-4 shrink-0 gap-6"
          style={{ borderBottom: "1.4px solid #1a1a1a" }}
        >
          <div className="flex items-center gap-4">
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "1.4px solid #1a1a1a",
                background: "#f3f2ec",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {PROFILE.initials}
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                }}
              >
                {PROFILE.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 11,
                  color: "#4a4a4a",
                }}
              >
                {PROFILE.age} · {PROFILE.pronouns} · {PROFILE.height} · {PROFILE.weight} · blood {PROFILE.bloodType}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: "#8a8a8a",
                  marginTop: 2,
                }}
              >
                {PROFILE.joined}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span style={tag}>Next visit</span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#1a1a1a",
                }}
              >
                {PROFILE.nextVisit}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: "#8a8a8a",
                }}
              >
                {PROFILE.primary}
              </span>
            </div>
            <button
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "#e76f51",
                border: "1.4px solid #1a1a1a",
                fontFamily: "var(--font-inter)",
                color: "#1a1a1a",
              }}
            >
              Prepare for visit →
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto">
          {/* AI summary banner */}
          <div
            className="flex flex-col gap-3 px-7 py-5"
            style={{ borderBottom: "1.4px solid #1a1a1a" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill tone="ink">AI summary</Pill>
                <span style={tag}>auto-generated · {PROFILE.lastSync}</span>
              </div>
              <div className="flex items-center gap-2">
                {["regenerate", "edit tone"].map((a) => (
                  <button
                    key={a}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      border: "1.2px solid #1a1a1a",
                      background: "#fafaf7",
                      fontFamily: "var(--font-inter)",
                      color: "#1a1a1a",
                    }}
                  >
                    {a}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    border: "1.2px solid #1a1a1a",
                    background: "#fbe3d8",
                    fontFamily: "var(--font-inter)",
                    color: "#1a1a1a",
                  }}
                >
                  export PDF
                </button>
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 20,
                lineHeight: 1.45,
                color: "#1a1a1a",
                padding: "8px 0",
              }}
            >
              &ldquo;Generally healthy 38-year-old. The two patterns worth flagging this visit:
              recurring headaches that follow short-sleep nights, and a tick-exposure event last Thursday.&rdquo;
            </div>
            <div
              className="flex items-center gap-1 flex-wrap text-xs"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#8a8a8a" }}
            >
              <span>Generated from:</span>
              {[
                "84 days of wearable data",
                "22 chat sessions",
                "3 medications",
                "location history",
              ].map((s, i, arr) => (
                <span key={s}>
                  <span style={{ borderBottom: "1px dotted #8a8a8a" }}>{s}</span>
                  {i < arr.length - 1 && <span className="mx-1">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Main content grid */}
          <div className="flex gap-5 px-7 py-5 items-start">
            {/* LEFT — patterns */}
            <div className="flex flex-col gap-4" style={{ flex: "1.5" }}>
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#1a1a1a",
                  }}
                >
                  Patterns to bring to your next visit
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: "#e76f51",
                    fontStyle: "italic",
                  }}
                >
                  3 of 8 surfaced · view all →
                </span>
              </div>
              {TOP_PATTERNS.map((p, i) => (
                <PatternCard key={i} p={p} />
              ))}
            </div>

            {/* RIGHT — vitals, conditions, meds, sharing */}
            <div className="flex flex-col gap-4" style={{ width: 360 }}>
              {/* Vitals */}
              <div
                className="flex flex-col gap-3 p-4 rounded-md"
                style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
              >
                <div className="flex items-center justify-between">
                  <span style={tag}>Vitals · 12-week snapshot</span>
                  <button
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: "#e76f51",
                      fontStyle: "italic",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    edit →
                  </button>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  {VITALS.map((v) => (
                    <div
                      key={v.label}
                      className="flex flex-col p-3 rounded-md"
                      style={{ border: "1px solid #d0cfc8" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "#8a8a8a",
                        }}
                      >
                        {v.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 700,
                          fontSize: 17,
                          color: "#1a1a1a",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {v.value}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 11,
                          color: "#4a4a4a",
                        }}
                      >
                        {v.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div
                className="flex flex-col gap-2 p-4 rounded-md"
                style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
              >
                <span style={tag}>Active conditions</span>
                {CONDITIONS.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between py-2"
                    style={{ borderTop: "1px dashed #d0cfc8" }}
                  >
                    <div className="flex flex-col">
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#1a1a1a",
                        }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: 10,
                          color: "#8a8a8a",
                        }}
                      >
                        since {c.since}
                      </span>
                    </div>
                    <Pill tone={c.status === "active" ? "ink" : "ghost"}>
                      {c.status}
                    </Pill>
                  </div>
                ))}
              </div>

              {/* Medications */}
              <div
                className="flex flex-col gap-2 p-4 rounded-md"
                style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
              >
                <div className="flex items-center justify-between">
                  <span style={tag}>Current medications</span>
                  <button
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: "#e76f51",
                      fontStyle: "italic",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    full list →
                  </button>
                </div>
                {MEDS.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between py-2"
                    style={{
                      borderTop: "1px dashed #d0cfc8",
                      fontFamily: "var(--font-inter)",
                      fontSize: 13,
                      color: "#1a1a1a",
                    }}
                  >
                    <span>{m.name}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 10,
                        color: "#8a8a8a",
                      }}
                    >
                      {m.note}
                    </span>
                  </div>
                ))}
              </div>

              {/* Excluded */}
              <div
                className="flex flex-col gap-2 p-4 rounded-md"
                style={{ border: "1.2px solid #1a1a1a", background: "#f3f2ec" }}
              >
                <span style={tag}>Excluded from summary</span>
                {EXCLUDED.map((x) => (
                  <div
                    key={x}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#4a4a4a", fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        color: "#8a8a8a",
                      }}
                    >
                      —
                    </span>
                    {x}
                  </div>
                ))}
                <button
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: "#e76f51",
                    fontStyle: "italic",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    marginTop: 4,
                  }}
                >
                  manage what AI can see →
                </button>
              </div>

              {/* Shared with */}
              <div
                className="flex flex-col gap-2 p-4 rounded-md"
                style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
              >
                <span style={tag}>Shared with</span>
                {SHARED_WITH.map((s) => (
                  <div
                    key={s.who}
                    className="flex flex-col py-2"
                    style={{ borderTop: "1px dashed #d0cfc8" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1a1a1a",
                      }}
                    >
                      {s.who}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 12,
                        color: "#4a4a4a",
                      }}
                    >
                      {s.what}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 10,
                        color: "#8a8a8a",
                        marginTop: 2,
                      }}
                    >
                      {s.when}
                    </span>
                  </div>
                ))}
                <button
                  className="inline-flex items-center px-4 py-2 rounded-full text-xs mt-2 self-start"
                  style={{
                    background: "transparent",
                    border: "1.4px solid #1a1a1a",
                    fontFamily: "var(--font-inter)",
                    color: "#1a1a1a",
                  }}
                >
                  + share with another provider
                </button>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div
            className="flex items-center gap-3 px-7 py-4"
            style={{ borderTop: "1.4px solid #1a1a1a" }}
          >
            <button
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "#e76f51",
                border: "1.4px solid #1a1a1a",
                fontFamily: "var(--font-inter)",
                color: "#1a1a1a",
              }}
            >
              Send summary to Dr. Patel
            </button>
            {["Download as PDF", "Print one-pager"].map((label) => (
              <button
                key={label}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm"
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
              you control what&apos;s shared · nothing sent without confirmation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
