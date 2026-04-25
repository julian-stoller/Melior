/* global React, BrowserFrame, Nav, RingChart, TrendLine, BodyOutline, CalendarGrid, MapSketch, DeviceCard */

// =====================================================================
// Landing 1 — Classic centered hero w/ ring chart
// "Data-driven insights, gently."
// =====================================================================
function LandingRings() {
  return (
    <BrowserFrame url="meliora.health">
      <Nav active="home" />
      <div className="row" style={{ padding: "60px 80px 40px", gap: 60, alignItems: "center" }}>
        <div className="col gap-24" style={{ flex: 1.1 }}>
          <div className="sk-tag">For people figuring it out</div>
          <h1 className="sk-h1">
            Your body's been<br />
            taking notes.<br />
            <span style={{ color: "var(--accent)" }}>We help you read them.</span>
          </h1>
          <div className="sk-body" style={{ maxWidth: 460 }}>
            Meliora pulls signals from devices you already wear — sleep, movement,
            location, screen time — and turns them into insights you (and your
            doctor) can actually use.
          </div>
          <div className="row gap-16 center">
            <button className="sk-btn">Start with a few questions →</button>
            <button className="sk-btn ghost">See how it works</button>
          </div>
          <div className="row gap-16 center" style={{ marginTop: 12 }}>
            <span className="sk-tag">Connects to:</span>
            <DeviceCard label="Apple Watch" kind="watch" />
            <DeviceCard label="Oura" kind="ring" />
            <DeviceCard label="iPhone" kind="phone" />
          </div>
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <div className="col center" style={{ position: "relative" }}>
            <RingChart size={300} />
            <div style={{ position: "absolute", textAlign: "center" }}>
              <div className="sk-h2" style={{ color: "var(--accent)" }}>+18%</div>
              <div className="sk-tag">vs last month</div>
            </div>
          </div>
          <div className="anno-pill" style={{ top: 20, right: 0 }}>illustrative — sample insight ring</div>
        </div>
      </div>
      <div className="row" style={{ padding: "30px 80px 60px", borderTop: "1.4px solid var(--ink)", gap: 40 }}>
        {[
          ["Sleep", "7h 12m avg"],
          ["Movement", "8.4k steps"],
          ["Locations", "12 places /wk"],
          ["Screen time", "4h 28m"],
        ].map(([k, v]) => (
          <div key={k} className="col gap-4" style={{ flex: 1 }}>
            <div className="sk-tag">{k}</div>
            <div className="sk-h3">{v}</div>
            <div className="sk-line" style={{ width: "70%", marginTop: 6 }} />
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Landing 2 — Body silhouette as central metaphor (sparse)
// =====================================================================
function LandingBody() {
  return (
    <BrowserFrame url="meliora.health">
      <Nav active="home" />
      <div className="col center" style={{ padding: "80px 60px 60px", textAlign: "center", gap: 28 }}>
        <div className="sk-tag">Meliora · /məˈlɪərə/ · to make better</div>
        <h1 className="sk-h1" style={{ maxWidth: 720 }}>
          Stop guessing.<br />Start noticing.
        </h1>
        <div className="sk-body" style={{ maxWidth: 520 }}>
          We collect what your devices already know, ask the questions only you
          can answer, and surface patterns worth talking to a doctor about.
        </div>
      </div>
      <div className="row center" style={{ padding: "20px 60px 40px", gap: 60, alignItems: "flex-start" }}>
        <div className="col gap-12" style={{ width: 220, paddingTop: 40 }}>
          {[
            ["Sleep depth", "Last 7 nights"],
            ["Heart variability", "Trending ↑"],
            ["Daily movement", "Mostly indoors"],
          ].map(([k, v], i) => (
            <div key={k} className="sk-box col gap-4" style={{ padding: "10px 12px", textAlign: "left" }}>
              <div className="sk-tag">{k}</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{v}</div>
              <div className="sk-textbar short" style={{ marginTop: 4 }} />
            </div>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <BodyOutline height={320} />
          <div className="anno-pill" style={{ top: 30, right: -50 }}>sleep · 7h 12m</div>
          <div className="anno-pill" style={{ top: 100, left: -40 }}>HRV · 52ms</div>
          <div className="anno-pill" style={{ bottom: 30, right: -40 }}>steps · 8.4k</div>
        </div>
        <div className="col gap-12" style={{ width: 220, paddingTop: 40 }}>
          {[
            ["Symptom log", "3 entries this week"],
            ["Locations visited", "8 places"],
            ["Screen evening", "Down 22 min"],
          ].map(([k, v]) => (
            <div key={k} className="sk-box col gap-4" style={{ padding: "10px 12px", textAlign: "left" }}>
              <div className="sk-tag">{k}</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{v}</div>
              <div className="sk-textbar med" style={{ marginTop: 4 }} />
            </div>
          ))}
        </div>
      </div>
      <div className="row center" style={{ padding: "10px 0 60px", gap: 16 }}>
        <button className="sk-btn">Tell us about you →</button>
        <span className="sk-anno">~3 minutes · skip anything</span>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Landing 3 — Timeline / story metaphor (left-aligned, dense)
// =====================================================================
function LandingTimeline() {
  return (
    <BrowserFrame url="meliora.health">
      <Nav active="home" />
      <div className="col" style={{ padding: "50px 80px 30px", gap: 18 }}>
        <div className="sk-tag">A health journal that writes itself</div>
        <h1 className="sk-h1" style={{ maxWidth: 820 }}>
          Six months ago you slept badly for two weeks straight.<br />
          <span style={{ color: "var(--accent)" }}>Would you remember?</span>
        </h1>
        <div className="sk-body" style={{ maxWidth: 620 }}>
          Meliora keeps a quiet timeline of your body, your habits, and the things
          you mention. When something feels off, the pattern is already there.
        </div>
      </div>
      <div className="col" style={{ padding: "20px 80px 40px", gap: 20 }}>
        {/* Big timeline */}
        <div className="sk-box" style={{ padding: 24, position: "relative" }}>
          <div className="row between" style={{ marginBottom: 10 }}>
            <div className="sk-tag">Jan</div>
            <div className="sk-tag">Mar</div>
            <div className="sk-tag">May</div>
            <div className="sk-tag">Jul</div>
            <div className="sk-tag">Sep</div>
            <div className="sk-tag">Nov</div>
          </div>
          <TrendLine width={780} height={80} />
          <div className="row between" style={{ marginTop: 10 }}>
            {[
              "started running",
              "trip to Lisbon",
              "headaches?",
              "switched coffee",
              "doctor visit",
              "feeling better",
            ].map((t, i) => (
              <div key={i} className="col center gap-4" style={{ width: 110, textAlign: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: 50, background: i === 2 ? "var(--accent)" : "var(--ink)" }} />
                <div className="sk-anno" style={{ fontSize: 12 }}>{t}</div>
              </div>
            ))}
          </div>
          <div className="anno-pill" style={{ top: 80, right: 30 }}>illustrative · last 12 mo.</div>
        </div>
        <div className="row gap-16">
          <button className="sk-btn">Build my timeline →</button>
          <button className="sk-btn ghost">Read the science</button>
          <span className="sk-anno" style={{ marginLeft: "auto" }}>HIPAA-aligned · your data stays yours</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Landing 4 — Map metaphor (geolocation forward)
// =====================================================================
function LandingMap() {
  return (
    <BrowserFrame url="meliora.health">
      <Nav active="home" />
      <div className="row" style={{ padding: "50px 70px", gap: 40 }}>
        <div className="col gap-20" style={{ flex: 1 }}>
          <div className="sk-tag">Where you go shapes how you feel</div>
          <h1 className="sk-h1">
            Your health<br />
            has a map.
          </h1>
          <div className="sk-body" style={{ maxWidth: 440 }}>
            Allergens by neighborhood. Sleep on hotel nights. Mood after that
            one café. Meliora connects place, time, and how you actually feel.
          </div>
          <div className="col gap-8" style={{ marginTop: 8 }}>
            {[
              "Headaches cluster on Mondays",
              "Sleep dips when you're south of the river",
              "Step count up 30% near the park",
            ].map((t, i) => (
              <div key={i} className="row gap-8 center">
                <div style={{ width: 8, height: 8, borderRadius: 50, background: "var(--accent)" }} />
                <div style={{ fontSize: 16 }}>{t}</div>
              </div>
            ))}
          </div>
          <button className="sk-btn" style={{ alignSelf: "flex-start", marginTop: 8 }}>
            Map my next 30 days →
          </button>
        </div>
        <div className="col gap-12" style={{ flex: 1.1 }}>
          <div className="sk-box" style={{ padding: 14, position: "relative" }}>
            <MapSketch width={460} height={300} />
            <div className="anno-pill" style={{ top: 60, left: 200 }}>café visited 14×</div>
            <div className="anno-pill" style={{ bottom: 70, left: 30 }}>home base</div>
          </div>
          <div className="row gap-8">
            <div className="sk-chip on">Last 30 days</div>
            <div className="sk-chip">Sleep overlay</div>
            <div className="sk-chip">Headache log</div>
            <div className="sk-chip">+ add overlay</div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Landing 5 — Calendar / heatmap metaphor (dense, daily-rhythm)
// =====================================================================
function LandingCalendar() {
  return (
    <BrowserFrame url="meliora.health">
      <Nav active="home" />
      <div className="col center" style={{ padding: "50px 60px 20px", textAlign: "center", gap: 16 }}>
        <div className="sk-tag">A year of you, at a glance</div>
        <h1 className="sk-h1" style={{ maxWidth: 760 }}>
          One square a day.<br />
          <span style={{ color: "var(--accent)" }}>A year of answers.</span>
        </h1>
        <div className="sk-body" style={{ maxWidth: 540 }}>
          Every day, Meliora quietly logs what your devices saw and what you
          shared. Patterns show up before you'd notice them on your own.
        </div>
      </div>
      <div className="col center" style={{ padding: "20px 60px 30px", gap: 16 }}>
        <div className="sk-box" style={{ padding: 24, position: "relative" }}>
          <div className="row gap-32 center">
            <div className="col gap-8">
              <div className="sk-tag">Sleep quality</div>
              <CalendarGrid cols={20} rows={6} />
            </div>
          </div>
          <div className="row between" style={{ marginTop: 14, fontSize: 12, color: "var(--ink-faint)" }}>
            <span>Apr 25, 2025</span>
            <span>each square = 1 day</span>
            <span>Apr 25, 2026</span>
          </div>
          <div className="anno-pill" style={{ top: 30, right: 30 }}>filled = good night</div>
        </div>
        <div className="row gap-16 center" style={{ marginTop: 10 }}>
          <button className="sk-btn">Start your first square →</button>
          <span className="sk-anno">No data yet? We'll show you why that's fine.</span>
        </div>
      </div>
      <div className="row" style={{ padding: "20px 60px 50px", gap: 20, borderTop: "1.4px dashed var(--ink-soft)", marginTop: 20 }}>
        {[
          ["1.", "Connect a device", "Or skip — we work with manual logs too."],
          ["2.", "Tell us about you", "A few minutes. Nothing scary."],
          ["3.", "Notice things sooner", "Get a weekly read on patterns + symptoms."],
        ].map(([n, t, d]) => (
          <div key={n} className="col gap-6" style={{ flex: 1 }}>
            <div className="sk-h2" style={{ color: "var(--accent)" }}>{n}</div>
            <div className="sk-h3">{t}</div>
            <div className="sk-body" style={{ fontSize: 15 }}>{d}</div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

// =====================================================================
// Landing 6 — "Journal / letter" voice-forward (warmest, sparsest)
// =====================================================================
function LandingJournal() {
  return (
    <BrowserFrame url="meliora.health">
      <Nav active="home" />
      <div className="row center" style={{ padding: "70px 80px 40px", gap: 60, alignItems: "stretch" }}>
        <div className="col gap-24" style={{ flex: 1, maxWidth: 460, justifyContent: "center" }}>
          <div className="sk-tag">Hi, we're Meliora.</div>
          <h1 className="sk-h1">
            Something feels<br />
            off and you<br />
            can't quite say<br />
            what.
          </h1>
          <div className="sk-body">
            We've been there. Meliora is a quiet companion that listens to your
            devices and to you, then helps you put words on it — for yourself,
            or for the doctor across the desk.
          </div>
          <div className="row gap-16 center">
            <button className="sk-btn">Begin →</button>
            <span className="sk-anno">3 min · skip anything · delete anytime</span>
          </div>
        </div>
        <div className="col gap-14" style={{ flex: 1, maxWidth: 480 }}>
          <div className="sk-box" style={{ padding: 22, transform: "rotate(-1deg)" }}>
            <div className="sk-tag">Tuesday, sample log</div>
            <div style={{ fontSize: 22, lineHeight: 1.4, marginTop: 8 }}>
              "Headache around 3pm again. Slept 5h 40m. Skipped lunch.
              Felt better after a walk."
            </div>
            <div className="row between" style={{ marginTop: 14 }}>
              <span className="sk-anno">— you, in your own words</span>
              <span className="sk-tag">3rd time this month</span>
            </div>
          </div>
          <div className="sk-box" style={{ padding: 18, transform: "rotate(0.6deg)", background: "var(--accent-soft)" }}>
            <div className="sk-tag">Meliora noticed</div>
            <div style={{ fontSize: 18, marginTop: 6, lineHeight: 1.4 }}>
              Headaches in the last 30 days line up with nights under 6h of
              sleep. Worth mentioning at your next appointment?
            </div>
            <div className="row gap-8" style={{ marginTop: 12 }}>
              <div className="sk-chip on">Save to share</div>
              <div className="sk-chip">Not relevant</div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

Object.assign(window, {
  LandingRings, LandingBody, LandingTimeline,
  LandingMap, LandingCalendar, LandingJournal,
});
