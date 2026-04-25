import Link from "next/link";
import { Nav } from "@/components/Nav";
import { RingChart } from "@/components/SvgPrimitives";

const STATS = [
  { label: "Sleep", value: "7h 12m avg" },
  { label: "Movement", value: "8.4k steps" },
  { label: "Locations", value: "12 places /wk" },
  { label: "Screen time", value: "4h 28m" },
];

function DeviceIcon({ kind }: { kind: "watch" | "ring" | "phone" }) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{
        border: "1.2px solid #1a1a1a",
        borderRadius: 8,
        padding: "10px 12px",
        background: "#fafaf7",
        minWidth: 80,
      }}
    >
      {kind === "watch" && (
        <svg width="32" height="40" viewBox="0 0 46 56">
          <rect x="6" y="2" width="34" height="8" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="1.6" />
          <rect x="6" y="46" width="34" height="8" rx="3" fill="none" stroke="#1a1a1a" strokeWidth="1.6" />
          <rect x="2" y="12" width="42" height="32" rx="6" fill="#f3f2ec" stroke="#1a1a1a" strokeWidth="1.6" />
          <circle cx="23" cy="28" r="6" fill="#e76f51" />
        </svg>
      )}
      {kind === "ring" && (
        <svg width="36" height="36" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="20" fill="none" stroke="#1a1a1a" strokeWidth="6" />
          <circle cx="28" cy="28" r="14" fill="none" stroke="#e76f51" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      )}
      {kind === "phone" && (
        <svg width="24" height="40" viewBox="0 0 36 60">
          <rect x="2" y="2" width="32" height="56" rx="5" fill="#f3f2ec" stroke="#1a1a1a" strokeWidth="1.6" />
          <line x1="8" y1="14" x2="28" y2="14" stroke="#1a1a1a" strokeWidth="1.4" />
          <line x1="8" y1="22" x2="22" y2="22" stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />
          <rect x="8" y="40" width="20" height="10" rx="2" fill="#e76f51" opacity="0.7" />
        </svg>
      )}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fafaf7" }}>
      <Nav />

      {/* Hero */}
      <section className="flex-1 flex flex-col">
        <div
          className="flex items-center gap-16 px-20 pt-16 pb-10 w-full"
          style={{ maxWidth: 1280, margin: "0 auto" }}
        >
          {/* Left copy */}
          <div className="flex flex-col gap-6" style={{ flex: "1.1" }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8a8a8a",
              }}
            >
              For people figuring it out
            </span>

            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: "clamp(38px, 4vw, 54px)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Your body&apos;s been
              <br />
              taking notes.
              <br />
              <span style={{ color: "#e76f51" }}>We help you read them.</span>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 18,
                lineHeight: 1.5,
                color: "#4a4a4a",
                maxWidth: 460,
                margin: 0,
              }}
            >
              Meliora pulls signals from devices you already wear — sleep, movement,
              location, screen time — and turns them into insights you (and your
              doctor) can actually use.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-base no-underline"
                style={{
                  background: "#e76f51",
                  border: "1.4px solid #1a1a1a",
                  color: "#1a1a1a",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Start with a few questions →
              </Link>
              <button
                className="inline-flex items-center px-5 py-3 rounded-full font-semibold text-base"
                style={{
                  background: "transparent",
                  border: "1.4px solid #1a1a1a",
                  color: "#1a1a1a",
                  fontFamily: "var(--font-inter)",
                }}
              >
                See how it works
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#8a8a8a",
                }}
              >
                Connects to:
              </span>
              <DeviceIcon kind="watch" />
              <DeviceIcon kind="ring" />
              <DeviceIcon kind="phone" />
            </div>
          </div>

          {/* Hero illustration */}
          <div style={{ flex: 1, position: "relative" }}>
            <div className="flex flex-col items-center justify-center relative">
              <RingChart size={320} />
              <div className="absolute text-center" style={{ pointerEvents: "none" }}>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 32,
                    color: "#e76f51",
                    letterSpacing: "-0.02em",
                  }}
                >
                  +18%
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#8a8a8a",
                  }}
                >
                  vs last month
                </div>
              </div>
            </div>
            <span
              style={{
                position: "absolute",
                top: 16,
                right: 0,
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "#8a8a8a",
                border: "1.2px dashed #8a8a8a",
                padding: "3px 8px",
                borderRadius: 4,
                background: "#fafaf7",
              }}
            >
              illustrative — sample insight ring
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="flex gap-10 px-20 py-8 w-full"
          style={{
            borderTop: "1.4px solid #1a1a1a",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {STATS.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1" style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#8a8a8a",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                }}
              >
                {value}
              </span>
              <div
                style={{
                  height: 1.8,
                  width: "70%",
                  background: "#1a1a1a",
                  borderRadius: 2,
                  marginTop: 6,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: "1.4px dashed #8a8a8a", background: "#f3f2ec" }}>
        <div
          className="flex gap-10 px-20 py-16"
          style={{ maxWidth: 1280, margin: "0 auto" }}
        >
          {[
            ["1.", "Connect a device", "Or skip — we work with manual logs too."],
            ["2.", "Tell us about you", "A few minutes. Nothing scary."],
            ["3.", "Notice things sooner", "Get a weekly read on patterns + symptoms."],
          ].map(([n, title, desc]) => (
            <div key={n} className="flex flex-col gap-2" style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "#e76f51",
                  letterSpacing: "-0.02em",
                }}
              >
                {n}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#1a1a1a",
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  color: "#4a4a4a",
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-20 py-6"
        style={{ borderTop: "1.4px solid #1a1a1a" }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 16,
            color: "#1a1a1a",
          }}
        >
          Meliora
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "#8a8a8a",
            fontStyle: "italic",
          }}
        >
          HIPAA-aligned · your data stays yours
        </span>
      </footer>
    </div>
  );
}
