import Link from "next/link";
import { ChatRail } from "@/components/ChatRail";
import { PromptBox } from "@/components/PromptBox";
import { RangeTabs } from "@/components/RangeTabs";
import { StatCard } from "@/components/StatCard";
import { InsightCard } from "@/components/InsightCard";
import { BarSeries, SleepChart } from "@/components/BarSeries";

const tag = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 10,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#8a8a8a",
};

function DataCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-md"
      style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
    >
      <span style={tag}>{label}</span>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#fafaf7" }}>
      <ChatRail activePage="/dashboard" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-8 py-4 shrink-0"
          style={{ borderBottom: "1.4px solid #1a1a1a" }}
        >
          <span style={tag}>Wed · Apr 25 · Brooklyn, NY</span>
          <div className="flex items-center gap-6">
            <Link
              href="/locations"
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm no-underline"
              style={{
                background: "transparent",
                border: "1.4px solid #1a1a1a",
                fontFamily: "var(--font-inter)",
                color: "#1a1a1a",
              }}
            >
              Locations →
            </Link>
            <RangeTabs active="Week" />
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-auto">
          {/* Hero prompt */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex flex-col gap-2 mb-4">
              <h2
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 26,
                  letterSpacing: "-0.01em",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                What&apos;s on your mind, John?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  color: "#4a4a4a",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                I&apos;ve got your last 7 days loaded. Ask anything, or just describe
                how you&apos;re feeling.
              </p>
            </div>
            <PromptBox />
          </div>

          {/* Today's read */}
          <div className="px-8 pb-4">
            <div
              className="flex flex-col gap-3 p-5 rounded-md"
              style={{
                border: "1.2px solid #1a1a1a",
                background: "#fbe3d8",
              }}
            >
              <div className="flex items-center justify-between">
                <span style={tag}>Today&apos;s read · auto-generated</span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "#e76f51",
                    fontStyle: "italic",
                  }}
                >
                  open as chat ↗
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                You slept <strong>6h 48m</strong> on average — about{" "}
                <strong>22 minutes less</strong> than last week. Two of three
                reported headaches followed nights under 6h. Sertraline adherence
                is steady at <strong>93%</strong>; you&apos;ve missed Vitamin D
                three times this week.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{
                    background: "#e76f51",
                    border: "1.4px solid #1a1a1a",
                    fontFamily: "var(--font-inter)",
                    color: "#1a1a1a",
                  }}
                >
                  Dig into headaches →
                </button>
                <button
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold"
                  style={{
                    background: "transparent",
                    border: "1.4px solid #1a1a1a",
                    fontFamily: "var(--font-inter)",
                    color: "#1a1a1a",
                  }}
                >
                  Save for doctor
                </button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="px-8 pb-4 grid gap-3"
            style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
          >
            <StatCard label="Sleep avg" value="6h 48m" delta="−22m" />
            <StatCard label="Steps avg" value="7,420" delta="+8%" accent />
            <StatCard label="Headaches" value="3" delta="2 above baseline" />
            <StatCard label="Resting HR" value="62 bpm" delta="↑ 4 bpm" />
          </div>

          {/* Charts row */}
          <div
            className="px-8 pb-4 grid gap-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <DataCard label="Sleep · this week">
              <SleepChart />
            </DataCard>
            <DataCard label="Steps · this week">
              <BarSeries
                data={[6200, 8400, 5100, 9200, 7300, 4800, 11200]}
                accent
              />
            </DataCard>
          </div>

          {/* Screentime + Sun */}
          <div
            className="px-8 pb-4 grid gap-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <DataCard label="Screentime · this week">
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#1a1a1a",
                  marginBottom: 4,
                }}
              >
                4h 12m/day average · ↑ 38m vs last week
              </div>
              <BarSeries
                data={[3.4, 4.1, 3.8, 4.6, 4.2, 6.1, 3.2]}
                accent
                unit="h"
                yTickCount={3}
                yMax={6.1}
              />
            </DataCard>
            <DataCard label="Time seeing the sun · this week">
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#1a1a1a",
                  marginBottom: 4,
                }}
              >
                34 min/day average · below the 60 min target
              </div>
              <BarSeries
                data={[28, 42, 18, 65, 50, 12, 22]}
                accent
                unit="m"
                yTickCount={3}
                yMax={65}
              />
            </DataCard>
          </div>

          {/* Symptom log + Insight */}
          <div
            className="px-8 pb-8 grid gap-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            <DataCard label="Symptom log · this week">
              <div className="flex flex-col gap-2 mt-1">
                {[
                  "Tue 3pm · headache, mild · 90 min",
                  "Thu 11am · headache, moderate · 3h",
                  "Fri am · woke up dizzy",
                ].map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: i < 2 ? "#e76f51" : "#1a1a1a",
                        flexShrink: 0,
                      }}
                    />
                    {entry}
                  </div>
                ))}
                <button
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "#e76f51",
                    fontStyle: "italic",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    marginTop: 2,
                  }}
                >
                  + add
                </button>
              </div>
            </DataCard>
            <InsightCard
              accent
              title="Headaches cluster after <6h sleep nights"
              body="3 of 4 reported headaches this week followed nights below your 6.5h baseline. Worth flagging at your appointment Friday."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
