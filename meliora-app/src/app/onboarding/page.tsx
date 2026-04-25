"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const STEPS = [
  { id: "basics", label: "Basics", fields: ["Name", "Date of birth"] },
  { id: "body", label: "Body", fields: ["Sex at birth", "Gender", "Height", "Weight"] },
  { id: "context", label: "Context", fields: ["Time zone", "Primary goal"] },
  { id: "history", label: "History", fields: ["Conditions", "Medications"] },
  { id: "devices", label: "Devices", fields: ["Wearables", "Phone"] },
  { id: "consent", label: "Consent", fields: ["Data permissions"] },
];

const CONDITIONS = [
  "Migraine", "Anxiety", "Hypertension", "Type 2 diabetes",
  "PCOS", "Asthma", "IBS", "None of these",
];

const tag = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 10,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#8a8a8a",
};

export default function OnboardingPage() {
  const current = 3; // "History" step — pre-positioned mid-flow
  const [selectedConditions, setSelectedConditions] = useState<string[]>(["Migraine", "Anxiety"]);

  const toggleCondition = (c: string) => {
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fafaf7" }}>
      {/* Top nav */}
      <nav
        className="flex items-center justify-between px-9 py-5"
        style={{ borderBottom: "1.4px solid #1a1a1a" }}
      >
        <Logo />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "#8a8a8a",
            fontStyle: "italic",
          }}
        >
          save & resume anytime
        </span>
      </nav>

      <div className="flex flex-1" style={{ minHeight: 0 }}>
        {/* Sidebar */}
        <aside
          className="flex flex-col gap-5 shrink-0"
          style={{
            width: 280,
            padding: "32px 28px",
            borderRight: "1.4px solid #1a1a1a",
            background: "#f3f2ec",
          }}
        >
          <div style={tag}>Setting up Meliora</div>
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1.3,
              color: "#1a1a1a",
            }}
          >
            About {current + 1} of {STEPS.length} done.
            <br />
            Hang in there.
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: 6,
              border: "1.2px solid #1a1a1a",
              borderRadius: 999,
              overflow: "hidden",
              background: "#fafaf7",
            }}
          >
            <div
              style={{
                width: `${((current + 1) / STEPS.length) * 100}%`,
                height: "100%",
                background: "#e76f51",
              }}
            />
          </div>

          {/* Step list */}
          <div className="flex flex-col gap-3 mt-2">
            {STEPS.map((step, i) => {
              const done = i < current;
              const active = i === current;
              return (
                <div key={step.id} className="flex items-start gap-3">
                  {/* step pill */}
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: active
                        ? "2px solid #1a1a1a"
                        : "1.6px solid #1a1a1a",
                      background: done
                        ? "#e76f51"
                        : active
                        ? "#fbe3d8"
                        : "#fafaf7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                      boxShadow: active
                        ? "0 0 0 3px #fafaf7, 0 0 0 4.5px #1a1a1a"
                        : undefined,
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: active ? 700 : 500,
                        fontSize: 15,
                        color: "#1a1a1a",
                        opacity: i > current ? 0.5 : 1,
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 10,
                        color: "#8a8a8a",
                      }}
                    >
                      {step.fields.join(" · ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why we ask */}
          <div
            className="mt-auto flex flex-col gap-2 p-3 rounded-md"
            style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
          >
            <span style={tag}>Why we ask</span>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#4a4a4a",
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              Meds & conditions help us avoid false alarms (and surface real ones).
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-5 overflow-auto px-14 py-10">
          <h2
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.01em",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Anything we should know already?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 16,
              lineHeight: 1.5,
              color: "#4a4a4a",
              maxWidth: 520,
              margin: 0,
            }}
          >
            Existing diagnoses or medications. Skip what doesn&apos;t apply — you can
            add more anytime.
          </p>

          {/* Conditions */}
          <div className="flex flex-col gap-3 mt-2">
            <span style={tag}>Conditions you&apos;ve been diagnosed with</span>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => {
                const on = selectedConditions.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCondition(c)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm cursor-pointer"
                    style={{
                      border: "1.4px solid #1a1a1a",
                      background: on ? "#fbe3d8" : "#fafaf7",
                      fontFamily: "var(--font-inter)",
                      fontWeight: on ? 600 : 400,
                      color: "#1a1a1a",
                    }}
                  >
                    {on && <span style={{ color: "#e76f51", marginRight: 4 }}>✓</span>}
                    {c}
                  </button>
                );
              })}
              <button
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm"
                style={{
                  border: "1.4px dashed #8a8a8a",
                  background: "transparent",
                  fontFamily: "var(--font-inter)",
                  color: "#8a8a8a",
                }}
              >
                + add other
              </button>
            </div>
          </div>

          {/* Medications */}
          <div className="flex flex-col gap-3 mt-4">
            <span style={tag}>Medications you take regularly</span>
            <div
              className="flex flex-col gap-2 rounded-md"
              style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
            >
              {[
                { name: "Sumatriptan", dose: "50mg", schedule: "as needed" },
                { name: "Sertraline", dose: "50mg", schedule: "daily" },
              ].map((med, i, arr) => (
                <div
                  key={med.name}
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    borderBottom: i < arr.length - 1 ? "1px dashed #d0cfc8" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 15,
                      color: "#1a1a1a",
                    }}
                  >
                    {med.name} · {med.dose} · {med.schedule}
                  </span>
                  <button
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 13,
                      color: "#e76f51",
                      fontStyle: "italic",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    edit
                  </button>
                </div>
              ))}
            </div>
            <input
              className="w-full px-4 py-3 rounded-md outline-none"
              style={{
                border: "1.4px solid #1a1a1a",
                background: "#fafaf7",
                fontFamily: "var(--font-inter)",
                fontSize: 15,
                color: "#1a1a1a",
              }}
              placeholder="+ add a medication (start typing…)"
            />
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "transparent",
                border: "1.4px solid #1a1a1a",
                fontFamily: "var(--font-inter)",
                color: "#1a1a1a",
              }}
            >
              ← Body
            </button>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  background: "transparent",
                  border: "1.4px solid #1a1a1a",
                  fontFamily: "var(--font-inter)",
                  color: "#1a1a1a",
                }}
              >
                Skip this step
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold no-underline"
                style={{
                  background: "#e76f51",
                  border: "1.4px solid #1a1a1a",
                  fontFamily: "var(--font-inter)",
                  color: "#1a1a1a",
                }}
              >
                Continue → Devices
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
