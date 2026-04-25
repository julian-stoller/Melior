/* global React, BrowserFrame, Nav, DeviceCard */

const STEPS = [
  { id: "basics", label: "Basics", fields: ["Name", "Date of birth"] },
  { id: "body", label: "Body", fields: ["Sex at birth", "Gender", "Height", "Weight"] },
  { id: "context", label: "Context", fields: ["Time zone", "Primary goal"] },
  { id: "history", label: "History", fields: ["Conditions", "Medications"] },
  { id: "devices", label: "Devices", fields: ["Wearables", "Phone"] },
  { id: "consent", label: "Consent", fields: ["Data permissions"] },
];

// =====================================================================
// Intake 1 — Linear top progress bar (classic, dense)
// =====================================================================
function IntakeLinear() {
  const current = 1; // "Body" step
  return (
    <BrowserFrame url="meliora.health/onboarding">
      <Nav active="home" />
      {/* Progress bar */}
      <div className="col" style={{ padding: "20px 80px 0" }}>
        <div className="row between" style={{ fontSize: 12, marginBottom: 6 }}>
          <span className="sk-tag">Step {current + 1} of {STEPS.length}</span>
          <span className="sk-tag">~2 minutes left · save & resume</span>
        </div>
        <div style={{ height: 10, border: "1.4px solid var(--ink)", borderRadius: 999, overflow: "hidden", background: "var(--paper)" }}>
          <div style={{ width: `${((current + 1) / STEPS.length) * 100}%`, height: "100%", background: "var(--accent)" }} />
        </div>
        <div className="row between" style={{ marginTop: 8 }}>
          {STEPS.map((s, i) => (
            <div key={s.id} className="col center gap-4">
              <div className="step-pill" style={{
                background: i < current ? "var(--accent)" : i === current ? "var(--accent-soft)" : "var(--paper)",
                fontSize: 12, width: 22, height: 22,
              }}>{i + 1}</div>
              <span style={{ fontSize: 12, opacity: i === current ? 1 : 0.6, fontWeight: i === current ? 700 : 400 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col" style={{ padding: "30px 80px 50px", gap: 22 }}>
        <h2 className="sk-h2">A bit about your body</h2>
        <div className="sk-body">These help us calibrate baselines. None of it is shared.</div>
        <div className="row gap-20" style={{ flexWrap: "wrap" }}>
          <label className="col gap-6" style={{ flex: "1 1 240px" }}>
            <span className="sk-tag">Sex assigned at birth</span>
            <div className="row gap-8">
              <div className="sk-chip on">Female</div>
              <div className="sk-chip">Male</div>
              <div className="sk-chip">Intersex</div>
              <div className="sk-chip">Prefer not to say</div>
            </div>
          </label>
          <label className="col gap-6" style={{ flex: "1 1 240px" }}>
            <span className="sk-tag">Gender identity</span>
            <input className="sk-input" placeholder="how you describe yourself…" defaultValue="Woman" />
          </label>
          <label className="col gap-6" style={{ flex: "1 1 200px" }}>
            <span className="sk-tag">Height</span>
            <div className="row gap-6">
              <input className="sk-input" defaultValue="5" style={{ width: 60 }} />
              <span style={{ alignSelf: "center" }}>ft</span>
              <input className="sk-input" defaultValue="6" style={{ width: 60 }} />
              <span style={{ alignSelf: "center" }}>in</span>
            </div>
          </label>
          <label className="col gap-6" style={{ flex: "1 1 200px" }}>
            <span className="sk-tag">Weight</span>
            <div className="row gap-6">
              <input className="sk-input" defaultValue="142" style={{ width: 90 }} />
              <span style={{ alignSelf: "center" }}>lbs</span>
            </div>
          </label>
        </div>
        <div className="row between center" style={{ marginTop: 24 }}>
          <button className="sk-btn ghost">← Back</button>
          <div className="row gap-12 center">
            <span className="sk-anno">all answers editable later</span>
            <button className="sk-btn">Continue →</button>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Intake 2 — Sidebar steps (dense, info-rich, two-column)
// =====================================================================
function IntakeSidebar() {
  const current = 3;
  return (
    <BrowserFrame url="meliora.health/onboarding">
      <Nav active="home" />
      <div className="row" style={{ minHeight: "calc(100% - 60px)" }}>
        {/* Sidebar */}
        <div className="col gap-16" style={{ width: 260, padding: 28, borderRight: "1.4px solid var(--ink)", background: "var(--paper-2)" }}>
          <div className="sk-tag">Setting up Meliora</div>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>About 4 of 6 done.<br />Hang in there.</div>
          <div style={{ height: 6, border: "1.2px solid var(--ink)", borderRadius: 999, overflow: "hidden", background: "var(--paper)" }}>
            <div style={{ width: `${((current + 1) / STEPS.length) * 100}%`, height: "100%", background: "var(--accent)" }} />
          </div>
          <div className="col gap-10" style={{ marginTop: 8 }}>
            {STEPS.map((s, i) => (
              <div key={s.id} className="row gap-10 center">
                <div className={"step-pill " + (i < current ? "done" : i === current ? "active" : "")}>{i < current ? "✓" : i + 1}</div>
                <div className="col">
                  <span style={{ fontSize: 15, fontWeight: i === current ? 700 : 500, opacity: i > current ? 0.55 : 1 }}>{s.label}</span>
                  <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>{s.fields.join(" · ")}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="sk-box" style={{ padding: 12, marginTop: "auto", background: "var(--paper)" }}>
            <div className="sk-tag">Why we ask</div>
            <div style={{ fontSize: 13, marginTop: 4, color: "var(--ink-soft)" }}>
              Meds & conditions help us avoid false alarms (and surface real ones).
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="col" style={{ flex: 1, padding: "32px 48px 40px", gap: 18 }}>
          <h2 className="sk-h2">Anything we should know already?</h2>
          <div className="sk-body" style={{ maxWidth: 520 }}>
            Existing diagnoses or medications. Skip what doesn't apply — you can
            add more anytime.
          </div>
          <div className="col gap-10" style={{ marginTop: 8 }}>
            <span className="sk-tag">Conditions you've been diagnosed with</span>
            <div className="row gap-8" style={{ flexWrap: "wrap" }}>
              {["Migraine", "Anxiety", "Hypertension", "Type 2 diabetes", "PCOS", "Asthma", "IBS", "None of these"].map((c, i) => (
                <div key={c} className={"sk-chip" + (i === 0 || i === 1 ? " on" : "")}>{c}</div>
              ))}
              <div className="sk-chip">+ add other</div>
            </div>
          </div>
          <div className="col gap-10" style={{ marginTop: 16 }}>
            <span className="sk-tag">Medications you take regularly</span>
            <div className="sk-box col gap-8" style={{ padding: 12 }}>
              <div className="row between center">
                <span style={{ fontSize: 16 }}>Sumatriptan · 50mg · as needed</span>
                <span className="sk-anno">edit</span>
              </div>
              <div className="sk-line" style={{ opacity: 0.2 }} />
              <div className="row between center">
                <span style={{ fontSize: 16 }}>Sertraline · 50mg · daily</span>
                <span className="sk-anno">edit</span>
              </div>
            </div>
            <input className="sk-input" placeholder="+ add a medication (start typing…)" />
          </div>
          <div className="row between center" style={{ marginTop: 28 }}>
            <button className="sk-btn ghost">← Body</button>
            <div className="row gap-12 center">
              <button className="sk-btn ghost">Skip this step</button>
              <button className="sk-btn">Continue → Devices</button>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Intake 3 — Conversational, one question at a time (sparse)
// =====================================================================
function IntakeConversational() {
  return (
    <BrowserFrame url="meliora.health/onboarding">
      <Nav active="home" />
      {/* progress dots */}
      <div className="row center gap-8" style={{ padding: "20px 0" }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{
            width: i === 1 ? 32 : 10, height: 10,
            borderRadius: 999,
            border: "1.4px solid var(--ink)",
            background: i < 1 ? "var(--accent)" : i === 1 ? "var(--accent-soft)" : "var(--paper)",
          }} />
        ))}
      </div>
      <div className="col center" style={{ padding: "60px 60px 30px", textAlign: "center", gap: 28 }}>
        <div className="sk-tag">Question 3 of 12 · Body</div>
        <h2 className="sk-h2" style={{ fontSize: 44, maxWidth: 700 }}>
          Roughly how tall are you?
        </h2>
        <div className="sk-body" style={{ maxWidth: 460 }}>
          Helps us spot what's normal for you specifically — not the average person.
        </div>
        <div className="row gap-12 center" style={{ marginTop: 10 }}>
          <input className="sk-input" defaultValue="5" style={{ width: 80, fontSize: 28, textAlign: "center", padding: "16px 8px" }} />
          <span style={{ fontSize: 22 }}>ft</span>
          <input className="sk-input" defaultValue="6" style={{ width: 80, fontSize: 28, textAlign: "center", padding: "16px 8px" }} />
          <span style={{ fontSize: 22 }}>in</span>
          <span style={{ fontSize: 16, color: "var(--ink-faint)", marginLeft: 12 }}>or use cm</span>
        </div>
        <div className="row gap-12 center" style={{ marginTop: 28 }}>
          <button className="sk-btn ghost">← previous</button>
          <button className="sk-btn">Next →</button>
          <button className="sk-btn ghost">skip</button>
        </div>
        <div className="sk-anno" style={{ marginTop: 24 }}>↵ press Enter to continue</div>
      </div>
      {/* footer trail */}
      <div className="col center" style={{ padding: "20px 60px 40px", borderTop: "1.4px dashed var(--ink-soft)", gap: 8 }}>
        <span className="sk-tag">You've told us</span>
        <div className="row gap-8" style={{ flexWrap: "wrap", justifyContent: "center", maxWidth: 600 }}>
          <div className="sk-chip on">Name · Maya</div>
          <div className="sk-chip on">Born · 1991</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Intake 4 — Card stack (swipe metaphor, single-column, illustrative)
// =====================================================================
function IntakeCardStack() {
  return (
    <BrowserFrame url="meliora.health/onboarding">
      <Nav active="home" />
      <div className="col center" style={{ padding: "30px 0 10px" }}>
        <div className="sk-tag">Tell us about you · 12 cards</div>
        <div className="row center gap-4" style={{ marginTop: 8 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              width: 26, height: 4,
              background: i < 4 ? "var(--accent)" : i === 4 ? "var(--ink)" : "var(--ink-faint)",
              opacity: i === 4 ? 1 : i < 4 ? 1 : 0.3,
              borderRadius: 2,
            }} />
          ))}
        </div>
      </div>
      <div className="col center" style={{ padding: "20px 60px 40px", position: "relative", flex: 1 }}>
        {/* stack of cards */}
        <div style={{ position: "relative", width: 520, height: 360 }}>
          {/* back card */}
          <div className="sk-box" style={{ position: "absolute", inset: 0, transform: "rotate(2.5deg) translate(14px, 14px)", background: "var(--paper-2)", opacity: 0.7 }} />
          <div className="sk-box" style={{ position: "absolute", inset: 0, transform: "rotate(-1.5deg) translate(-8px, 6px)", background: "var(--paper-2)", opacity: 0.85 }} />
          {/* front card */}
          <div className="sk-box col" style={{ position: "absolute", inset: 0, padding: 30, gap: 18, background: "var(--paper)" }}>
            <div className="row between">
              <span className="sk-tag">Card 5 / 12 · Sex assigned at birth</span>
              <span className="sk-anno">why we ask →</span>
            </div>
            <div className="sk-h2">What sex were you assigned at birth?</div>
            <div className="sk-body" style={{ fontSize: 16 }}>
              Affects baselines for things like resting heart rate, iron, and sleep cycles.
            </div>
            <div className="col gap-10" style={{ marginTop: 8 }}>
              {["Female", "Male", "Intersex", "Prefer not to say"].map((o, i) => (
                <div key={o} className={"sk-box row between center" + (i === 0 ? " on" : "")} style={{
                  padding: "12px 16px", cursor: "pointer",
                  background: i === 0 ? "var(--accent-soft)" : "var(--paper)",
                }}>
                  <span style={{ fontSize: 18 }}>{o}</span>
                  <div style={{ width: 18, height: 18, borderRadius: 50, border: "1.6px solid var(--ink)",
                    background: i === 0 ? "var(--accent)" : "var(--paper)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row gap-16 center" style={{ marginTop: 28 }}>
          <button className="sk-btn ghost" style={{ padding: "10px 14px" }}>← swipe back</button>
          <button className="sk-btn">Confirm & next card →</button>
          <button className="sk-btn ghost" style={{ padding: "10px 14px" }}>skip card</button>
        </div>
        <div className="anno-pill" style={{ top: 60, right: 80 }}>drag or use arrow keys</div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Intake 5 — Two-column with live profile preview (dense, summary-forward)
// =====================================================================
function IntakeLivePreview() {
  return (
    <BrowserFrame url="meliora.health/onboarding">
      <Nav active="home" />
      <div className="col" style={{ padding: "16px 36px 0" }}>
        <div className="row between center">
          <div className="row gap-10 center">
            <span className="sk-tag">Your profile</span>
            {STEPS.map((s, i) => (
              <span key={s.id} className={"sk-chip" + (i <= 4 ? " on" : "")} style={{ fontSize: 12, padding: "3px 10px" }}>
                {i < 4 ? "✓ " : ""}{s.label}
              </span>
            ))}
          </div>
          <span className="sk-anno">82% done · resume anytime</span>
        </div>
      </div>
      <div className="row" style={{ padding: "20px 36px 40px", gap: 28, alignItems: "flex-start" }}>
        {/* form column */}
        <div className="col gap-18" style={{ flex: 1.3 }}>
          <h2 className="sk-h2">Connect what you've got</h2>
          <div className="sk-body" style={{ maxWidth: 540 }}>
            Pick anything you already use. We pull from official health APIs —
            we never read your messages, photos, or apps.
          </div>
          <div className="row gap-12" style={{ flexWrap: "wrap", marginTop: 8 }}>
            <DeviceCard label="Apple Health" kind="phone" />
            <DeviceCard label="Apple Watch" kind="watch" />
            <DeviceCard label="Oura Ring" kind="ring" />
            <DeviceCard label="Withings Scale" kind="scale" />
            <DeviceCard label="Fitbit" kind="watch" />
            <div className="sk-box col center gap-4" style={{ width: 110, height: 120, padding: 10, borderStyle: "dashed" }}>
              <div style={{ fontSize: 28 }}>+</div>
              <div style={{ fontSize: 13, fontFamily: "var(--label)" }}>Other</div>
            </div>
          </div>
          <div className="col gap-8" style={{ marginTop: 14 }}>
            <span className="sk-tag">Or skip — log manually</span>
            <div className="row gap-8">
              <div className="sk-chip">Sleep</div>
              <div className="sk-chip">Steps</div>
              <div className="sk-chip">Mood</div>
              <div className="sk-chip">Symptoms</div>
            </div>
          </div>
          <div className="row between center" style={{ marginTop: 24 }}>
            <button className="sk-btn ghost">← History</button>
            <button className="sk-btn">Continue → Consent</button>
          </div>
        </div>
        {/* live preview column */}
        <div className="col gap-12" style={{ width: 280 }}>
          <div className="sk-tag">Profile so far</div>
          <div className="sk-box col gap-10" style={{ padding: 18 }}>
            <div className="row between">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Name</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Maya R.</span>
            </div>
            <div className="row between">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Age</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>34</span>
            </div>
            <div className="row between">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Sex / Gender</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Female / Woman</span>
            </div>
            <div className="row between">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Height / Weight</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>5'6" · 142 lb</span>
            </div>
            <div className="row between">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Time zone</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>America / NY</span>
            </div>
            <div className="sk-line" style={{ opacity: 0.2, margin: "4px 0" }} />
            <div className="col gap-4">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Goal</span>
              <span style={{ fontSize: 15 }}>Figure out the headaches</span>
            </div>
            <div className="col gap-4">
              <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>Conditions</span>
              <div className="row gap-6">
                <div className="sk-chip on" style={{ fontSize: 11, padding: "2px 8px" }}>Migraine</div>
                <div className="sk-chip on" style={{ fontSize: 11, padding: "2px 8px" }}>Anxiety</div>
              </div>
            </div>
          </div>
          <div className="sk-box col gap-6" style={{ padding: 14, background: "var(--accent-soft)" }}>
            <span className="sk-tag">First insight unlocks at</span>
            <div style={{ fontSize: 16, fontWeight: 700 }}>~7 days of data</div>
            <div className="sk-textbar long" />
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

Object.assign(window, {
  IntakeLinear, IntakeSidebar, IntakeConversational,
  IntakeCardStack, IntakeLivePreview,
});
