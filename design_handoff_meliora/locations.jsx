/* global React, BrowserFrame */

const { useState: useLocState } = React;

const LOC_RANGES = ["Day", "Week", "Month", "Year"];

// A dot density / heat-style location map drawn over a real basemap image
function LocationMap({ width = 720, height = 480 }) {
  // Tuned to the Cayuga Heights basemap. Travel order: Work → Café → Home → Gym.
  // The Home → Gym leg detours through the tall-grass / tick-flagged region.
  const ANCHORS = {
    work: [0.78, 0.48],
    cafe: [0.66, 0.55],
    home: [0.46, 0.62],
    gym:  [0.25, 0.79],
  };
  const ROUTES = [
    // work → café (E Upland Rd)
    [[0.76, 0.50], [0.74, 0.52], [0.72, 0.53], [0.70, 0.54], [0.68, 0.545]],
    // café → home (W Upland → N Sunset Dr)
    [[0.64, 0.555], [0.61, 0.57], [0.58, 0.585], [0.54, 0.60], [0.50, 0.61]],
    // home → gym, routed THROUGH the tall-grass region near the waterfront
    [[0.42, 0.66], [0.36, 0.72], [0.28, 0.78], [0.20, 0.83], [0.14, 0.88],
     [0.12, 0.91], [0.16, 0.92], [0.20, 0.88], [0.24, 0.83], [0.26, 0.80]],
  ];
  const dots = [
    // home cluster
    [0.46, 0.62, 1.0], [0.46, 0.62, 1.0], [0.47, 0.61, 1.0], [0.45, 0.63, 0.95],
    [0.46, 0.60, 0.9], [0.47, 0.62, 0.85], [0.45, 0.61, 0.8],
    // work cluster
    [0.78, 0.48, 0.9], [0.79, 0.47, 0.85], [0.77, 0.49, 0.8], [0.78, 0.46, 0.75],
    [0.80, 0.48, 0.7],
    // café cluster
    [0.66, 0.55, 0.7], [0.67, 0.56, 0.6], [0.66, 0.54, 0.55], [0.65, 0.555, 0.5],
    // gym cluster
    [0.25, 0.79, 0.55], [0.24, 0.78, 0.5], [0.26, 0.79, 0.45], [0.25, 0.80, 0.4],
    // route dots
    ...ROUTES.flat().map(([x, y]) => [x, y, 0.3]),
    // misc light
    [0.55, 0.30, 0.15], [0.62, 0.72, 0.18],
    [0.85, 0.30, 0.12], [0.34, 0.85, 0.15],
  ];

  const blueAt = (i) => {
    const stops = [
      { t: 0.0, c: "#cfe6f5" },
      { t: 0.35, c: "#7ab8e0" },
      { t: 0.65, c: "#3b7fc0" },
      { t: 1.0,  c: "#1a3f88" },
    ];
    let a = stops[0], b = stops[stops.length - 1];
    for (let k = 0; k < stops.length - 1; k++) {
      if (i >= stops[k].t && i <= stops[k + 1].t) { a = stops[k]; b = stops[k + 1]; break; }
    }
    const tNorm = (i - a.t) / (b.t - a.t);
    const ah = a.c.slice(1), bh = b.c.slice(1);
    const ar = parseInt(ah.slice(0,2), 16), ag = parseInt(ah.slice(2,4), 16), ab = parseInt(ah.slice(4,6), 16);
    const br = parseInt(bh.slice(0,2), 16), bg = parseInt(bh.slice(2,4), 16), bb = parseInt(bh.slice(4,6), 16);
    const r = Math.round(ar + (br - ar) * tNorm);
    const g = Math.round(ag + (bg - ag) * tNorm);
    const b2 = Math.round(ab + (bb - ab) * tNorm);
    return `rgb(${r},${g},${b2})`;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ borderRadius: 6, display: "block" }}>
      <defs>
        <clipPath id="mapClip">
          <rect x="0" y="0" width={width} height={height} rx="6" />
        </clipPath>
      </defs>
      <g clipPath="url(#mapClip)">
        {/* basemap */}
        <image href="assets/basemap.png" x="0" y="0" width={width} height={height} preserveAspectRatio="xMidYMid slice" />

        {/* health-significant region — tall grass / ticks (Stewart Park / waterfront edge) */}
        <path d={`M ${width*0.04} ${height*0.85}
                  Q ${width*0.10} ${height*0.78} ${width*0.22} ${height*0.84}
                  Q ${width*0.26} ${height*0.92} ${width*0.20} ${height*0.99}
                  Q ${width*0.10} ${height*1.02} ${width*0.04} ${height*0.95} Z`}
          fill="rgba(231, 111, 81, 0.18)"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinejoin="round" />
        <g transform={`translate(${width*0.13}, ${height*0.74})`}>
          <rect x="-92" y="-13" width="184" height="24" rx="12"
            fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="0" y="4" textAnchor="middle"
            fontSize="12" fontFamily="var(--label)" fontWeight="700" fill="var(--accent)">
            ⚠ Tall grass · tick bites likely
          </text>
        </g>
        <line x1={width*0.13} y1={height*0.76} x2={width*0.13} y2={height*0.85}
          stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 3" />

        {/* second flagged region — high-pollen corridor near sewage plant trees */}
        <path d={`M ${width*0.30} ${height*0.18}
                  Q ${width*0.40} ${height*0.12} ${width*0.48} ${height*0.20}
                  Q ${width*0.50} ${height*0.32} ${width*0.42} ${height*0.36}
                  Q ${width*0.32} ${height*0.34} ${width*0.30} ${height*0.18} Z`}
          fill="rgba(231, 111, 81, 0.10)"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          opacity="0.85" />
        <g transform={`translate(${width*0.40}, ${height*0.07})`}>
          <rect x="-72" y="-11" width="144" height="20" rx="10"
            fill="var(--paper)" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle"
            fontSize="10" fontFamily="var(--label)" fontWeight="700" fill="var(--accent)">
            High pollen · spring
          </text>
        </g>

        {/* location dots */}
        {dots.map(([x, y, i], k) => (
          <circle key={k} cx={x * width} cy={y * height}
            r={4 + i * 5}
            fill={blueAt(i)}
            stroke="#0d2d6a"
            strokeWidth="0.6"
            opacity={0.88} />
        ))}

        {/* place labels — pinned to user's actual stops */}
        <g fontFamily="var(--label)" fontSize="11" fill="var(--ink)" fontWeight="700">
          <g>
            <rect x={width*0.46 + 8} y={height*0.62 - 9} width="44" height="16" rx="3" fill="var(--paper)" opacity="0.85" />
            <text x={width*0.46 + 12} y={height*0.62 + 3}>Home</text>
          </g>
          <g>
            <rect x={width*0.78 + 8} y={height*0.48 - 9} width="40" height="16" rx="3" fill="var(--paper)" opacity="0.85" />
            <text x={width*0.78 + 12} y={height*0.48 + 3}>Work</text>
          </g>
          <g>
            <rect x={width*0.66 + 8} y={height*0.55 - 9} width="36" height="16" rx="3" fill="var(--paper)" opacity="0.85" />
            <text x={width*0.66 + 12} y={height*0.55 + 3}>Café</text>
          </g>
          <g>
            <rect x={width*0.24 + 8} y={height*0.78 - 9} width="36" height="16" rx="3" fill="var(--paper)" opacity="0.85" />
            <text x={width*0.24 + 12} y={height*0.78 + 3}>Gym</text>
          </g>
        </g>

        {/* compass */}
        <g transform={`translate(${width - 36}, ${height - 36})`}>
          <circle cx="0" cy="0" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2" />
          <text x="0" y="-4" textAnchor="middle" fontSize="9" fontFamily="var(--mono)" fill="var(--ink)">N</text>
          <path d="M 0 -10 L 3 0 L 0 -3 L -3 0 Z" fill="var(--ink)" />
        </g>
      </g>
    </svg>
  );
}

function LocationsPage() {
  const active = "Week";
  return (
    <BrowserFrame url="meliora.health/locations">
      <div className="row" style={{ height: "100%" }}>
        {/* simplified left rail link back */}
        <div className="col gap-12" style={{ width: 220, padding: "20px 16px", borderRight: "1.4px solid var(--ink)", background: "var(--paper-2)" }}>
          <div className="row gap-8 center">
            <div className="logo-glyph" style={{ width: 22, height: 22 }} />
            <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18 }}>Meliora</span>
          </div>
          <div className="col gap-6" style={{ marginTop: 12 }}>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>← Dashboard</div>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Chats</div>
            <div style={{ padding: "8px 10px", fontSize: 14, fontWeight: 700,
                          background: "var(--accent-soft)", border: "1.2px solid var(--ink)", borderRadius: 6 }}>
              Locations
            </div>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Medications</div>
            <div style={{ padding: "8px 10px", fontSize: 14, color: "var(--ink-soft)" }}>Profile</div>
          </div>
          <div className="sk-box col gap-6" style={{ padding: 12, marginTop: "auto" }}>
            <span className="sk-tag">Privacy</span>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>
              Location data is processed on-device. You can delete any place or any day, anytime.
            </div>
            <span className="sk-anno" style={{ fontSize: 11 }}>manage data →</span>
          </div>
        </div>

        {/* main */}
        <div className="col" style={{ flex: 1, overflow: "auto" }}>
          <div className="row between center" style={{ padding: "14px 28px", borderBottom: "1.4px solid var(--ink)" }}>
            <div className="col">
              <span className="sk-tag">Locations · Brooklyn, NY</span>
              <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 22 }}>Location History</span>
            </div>
            {/* range tabs */}
            <div className="row gap-6" style={{ background: "var(--paper-2)", padding: 4, borderRadius: 999, border: "1.4px solid var(--ink)" }}>
              {LOC_RANGES.map(r => (
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

          <div className="row" style={{ flex: 1, padding: "20px 28px", gap: 20, alignItems: "flex-start" }}>
            {/* map column */}
            <div className="col gap-12" style={{ flex: 1.6 }}>
              <div className="sk-box col gap-10" style={{ padding: 12, position: "relative" }}>
                <LocationMap width={720} height={460} />
              </div>

              {/* action items — non-medical, system-level changes */}
              <div className="col gap-8">
                <div className="sk-box col" style={{ padding: 0, overflow: "hidden" }}>
                  {[
                    {
                      tag: "UV exposure to increase",
                      arrow: "Buy sunscreen",
                      sub: "Avg 11 min outdoors midday — set a SPF 30 stick by the door",
                    },
                    {
                      tag: "Tall-grass exposure",
                      arrow: "Add permethrin spray to laundry",
                      sub: "Treat the running shoes & lake-trail jacket once every 6 weeks",
                    },
                    {
                      tag: "Step count gap",
                      arrow: "Walk the café leg instead of driving",
                      sub: "Work → café is 0.6 mi · would close ~1,400 steps/day on avg",
                    },
                  ].map((item, i, arr) => (
                    <div
                      key={i}
                      className="row between center"
                      style={{
                        padding: "12px 14px",
                        borderBottom: i < arr.length - 1 ? "1px dashed var(--ink-faint)" : "none",
                        gap: 16,
                      }}
                    >
                      <div className="col gap-2" style={{ flex: 1 }}>
                        <div className="row gap-8 center" style={{ flexWrap: "wrap" }}>
                          <span style={{
                            fontSize: 11, fontFamily: "var(--mono)",
                            letterSpacing: "0.04em", color: "var(--ink-soft)",
                            textTransform: "uppercase",
                          }}>
                            {item.tag}
                          </span>
                          <span style={{
                            fontFamily: "var(--mono)", color: "var(--ink-faint)",
                            fontSize: 13,
                          }}>→</span>
                          <span style={{
                            fontFamily: "var(--hand)", fontWeight: 700, fontSize: 17,
                          }}>
                            {item.arrow}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                          {item.sub}
                        </div>
                      </div>
                      <div className="row gap-6 center">
                        <div className="sk-chip" style={{ fontSize: 11, padding: "3px 8px" }}>add to list</div>
                        <div className="sk-chip" style={{ fontSize: 11, padding: "3px 8px" }}>dismiss</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* right rail — conclusions */}
            <div className="col gap-12" style={{ width: 320 }}>
              <div className="col">
                <span className="sk-tag">Conclusions · this week</span>
                <span style={{ fontFamily: "var(--hand)", fontWeight: 700, fontSize: 18, marginTop: 2 }}>
                  3 things from where you've been
                </span>
              </div>

              <div className="sk-box col gap-8" style={{ padding: 14, background: "var(--accent-soft)" }}>
                <div className="row gap-8 center">
                  <span style={{
                    fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.05em",
                    background: "var(--accent)", color: "var(--paper)",
                    padding: "2px 8px", borderRadius: 4,
                  }}>HIGH PRIORITY</span>
                  <span className="sk-tag">tick exposure</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
                  Check for ticks at next examination
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                  You spent 1h 22m on Thursday inside a tall-grass area near Prospect Park
                  flagged for tick activity in April. Ticks can attach unnoticed; a full-body
                  check within 24h is recommended.
                </div>
                <div className="row gap-8" style={{ marginTop: 4 }}>
                  <button className="sk-btn" style={{ padding: "5px 12px", fontSize: 12 }}>How to check →</button>
                  <button className="sk-btn ghost" style={{ padding: "5px 12px", fontSize: 12 }}>Add to doctor note</button>
                </div>
              </div>

              <div className="sk-box col gap-6" style={{ padding: 14 }}>
                <div className="row gap-8 center">
                  <span style={{
                    fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.05em",
                    background: "var(--ink)", color: "var(--paper)",
                    padding: "2px 8px", borderRadius: 4,
                  }}>NOTICE</span>
                  <span className="sk-tag">pollen corridor</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>
                  Allergy symptoms align with your gym route
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                  4 of 5 sneezing episodes this week were logged within 90 min of walking
                  through Park Slope's high-pollen corridor.
                </div>
              </div>

              <div className="sk-box col gap-6" style={{ padding: 14 }}>
                <div className="row gap-8 center">
                  <span style={{
                    fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.05em",
                    background: "var(--ink)", color: "var(--paper)",
                    padding: "2px 8px", borderRadius: 4,
                  }}>POSITIVE</span>
                  <span className="sk-tag">sun exposure</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>
                  Park visits are your best sun days
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                  Days with a Prospect Park visit averaged 58 min outdoors —
                  almost double your weekly baseline of 34 min.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

Object.assign(window, { LocationsPage });
