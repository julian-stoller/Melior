import { SideRail } from "@/components/SideRail";

const tag = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 10,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#8a8a8a",
};

function LocationMapSvg() {
  const width = 640;
  const height = 400;

  // Anchored to the Cayuga Heights basemap.
  // Work = upper-right, Café = mid-right, Home = centre, Gym = lower-left (near waterfront).
  const dots: [number, number, number][] = [
    // home cluster
    [0.46, 0.62, 1.0], [0.47, 0.61, 0.95], [0.45, 0.63, 0.9], [0.46, 0.60, 0.85],
    // work cluster
    [0.78, 0.48, 0.9], [0.79, 0.47, 0.85], [0.77, 0.49, 0.8], [0.80, 0.48, 0.7],
    // café cluster
    [0.66, 0.55, 0.7], [0.67, 0.56, 0.6], [0.65, 0.555, 0.5],
    // gym cluster (near Cayuga Waterfront Trailhead)
    [0.25, 0.79, 0.55], [0.24, 0.78, 0.5], [0.26, 0.80, 0.4],
  ];

  const blueShade = (t: number) => {
    const r = Math.round(207 + (26 - 207) * t);
    const g = Math.round(230 + (63 - 230) * t);
    const b = Math.round(245 + (136 - 245) * t);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ borderRadius: 6, display: "block" }}
    >
      <defs>
        <clipPath id="mapClip">
          <rect width={width} height={height} rx={6} />
        </clipPath>
      </defs>

      <g clipPath="url(#mapClip)">
        {/* real basemap */}
        <image href="/basemap.png" x={0} y={0} width={width} height={height} preserveAspectRatio="xMidYMid slice" />

      {/* tick-flagged region */}
      <path
        d={`M ${width * 0.04} ${height * 0.85}
            Q ${width * 0.10} ${height * 0.76} ${width * 0.22} ${height * 0.84}
            Q ${width * 0.26} ${height * 0.95} ${width * 0.18} ${height * 1.02}
            Q ${width * 0.08} ${height * 1.04} ${width * 0.04} ${height * 0.94} Z`}
        fill="rgba(231,111,81,0.15)"
        stroke="#e76f51"
        strokeWidth={1.8}
        strokeDasharray="6 5"
      />
      <rect
        x={width * 0.06}
        y={height * 0.70}
        width={180}
        height={22}
        rx={11}
        fill="#fafaf7"
        stroke="#e76f51"
        strokeWidth={1.4}
      />
      <text
        x={width * 0.06 + 90}
        y={height * 0.70 + 14}
        textAnchor="middle"
        fontSize={11}
        fontFamily="var(--font-inter)"
        fontWeight={700}
        fill="#e76f51"
      >
        ⚠ Tall grass · tick bites likely
      </text>

      {/* travel path */}
      <path
        d={`M ${width * 0.78} ${height * 0.48}
            Q ${width * 0.72} ${height * 0.52} ${width * 0.66} ${height * 0.55}
            Q ${width * 0.58} ${height * 0.59} ${width * 0.46} ${height * 0.62}
            Q ${width * 0.36} ${height * 0.70} ${width * 0.25} ${height * 0.79}`}
        fill="none"
        stroke="#e76f51"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray="7 5"
      />

      {/* location dots */}
      {dots.map(([xf, yf, weight], k) => (
        <circle
          key={k}
          cx={xf * width}
          cy={yf * height}
          r={4 + weight * 6}
          fill={blueShade(weight)}
          stroke="#0d2d6a"
          strokeWidth={0.6}
          opacity={0.9}
        />
      ))}

      {/* place labels */}
      {[
        { x: 0.46, y: 0.62, label: "Home" },
        { x: 0.78, y: 0.48, label: "Work" },
        { x: 0.66, y: 0.55, label: "Café" },
        { x: 0.25, y: 0.79, label: "Gym" },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <rect
            x={x * width + 10}
            y={y * height - 10}
            width={label.length * 7 + 8}
            height={18}
            rx={3}
            fill="#fafaf7"
            opacity={0.9}
          />
          <text
            x={x * width + 14}
            y={y * height + 3}
            fontSize={11}
            fontFamily="var(--font-inter)"
            fontWeight={700}
            fill="#1a1a1a"
          >
            {label}
          </text>
        </g>
      ))}

      {/* compass */}
      <g transform={`translate(${width - 32}, ${height - 32})`}>
        <circle cx={0} cy={0} r={14} fill="#fafaf7" stroke="#1a1a1a" strokeWidth={1.2} />
        <text x={0} y={-4} textAnchor="middle" fontSize={9} fontFamily="var(--font-jetbrains-mono)" fill="#1a1a1a">N</text>
        <path d="M 0 -10 L 3 0 L 0 -3 L -3 0 Z" fill="#1a1a1a" />
      </g>
      </g>
    </svg>
  );
}

interface ConclusionCardProps {
  priority: "HIGH PRIORITY" | "NOTICE" | "POSITIVE";
  tag: string;
  title: string;
  body: string;
  actions?: React.ReactNode;
}

function ConclusionCard({ priority, tag: tagLabel, title, body, actions }: ConclusionCardProps) {
  const isHigh = priority === "HIGH PRIORITY";
  const isPositive = priority === "POSITIVE";
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-md"
      style={{
        border: "1.2px solid #1a1a1a",
        background: isHigh ? "#fbe3d8" : "#fafaf7",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 10,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            background: isHigh ? "#e76f51" : isPositive ? "#4a4a4a" : "#1a1a1a",
            color: "#fafaf7",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          {priority}
        </span>
        <span style={tag}>{tagLabel}</span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: 15,
          color: "#1a1a1a",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 13,
          color: "#4a4a4a",
          lineHeight: 1.5,
        }}
      >
        {body}
      </div>
      {actions}
    </div>
  );
}

const RANGES = ["Day", "Week", "Month", "Year"];

export default function LocationsPage() {
  const active = "Week";

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#fafaf7" }}>
      <SideRail
        activePage="/locations"
        note={{
          tag: "Privacy",
          body: "Location data is processed on-device. You can delete any place or any day, anytime.",
          action: "manage data →",
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-4 shrink-0"
          style={{ borderBottom: "1.4px solid #1a1a1a" }}
        >
          <div className="flex flex-col">
            <span style={tag}>Locations · Brooklyn, NY</span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.01em",
                color: "#1a1a1a",
              }}
            >
              Location History
            </span>
          </div>
          <div
            className="flex items-center gap-1 rounded-full"
            style={{ background: "#f3f2ec", padding: 4, border: "1.4px solid #1a1a1a" }}
          >
            {RANGES.map((r) => (
              <div
                key={r}
                className="px-4 py-1 rounded-full text-xs cursor-pointer"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: r === active ? 700 : 500,
                  background: r === active ? "#e76f51" : "transparent",
                  border: r === active ? "1.2px solid #1a1a1a" : "1.2px solid transparent",
                  color: "#1a1a1a",
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto">
          <div className="flex gap-5 p-7 items-start">
            {/* Map column */}
            <div className="flex flex-col gap-4" style={{ flex: "1.6" }}>
              <div
                className="rounded-md overflow-hidden"
                style={{ border: "1.2px solid #1a1a1a" }}
              >
                <LocationMapSvg />
              </div>

              {/* Action items */}
              <div
                className="rounded-md overflow-hidden"
                style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
              >
                {[
                  {
                    tag: "UV exposure to increase",
                    action: "Buy sunscreen",
                    detail: "Avg 11 min outdoors midday — set a SPF 30 stick by the door",
                  },
                  {
                    tag: "Tall-grass exposure",
                    action: "Add permethrin spray to laundry",
                    detail: "Treat the running shoes & lake-trail jacket once every 6 weeks",
                  },
                  {
                    tag: "Step count gap",
                    action: "Walk the café leg instead of driving",
                    detail: "Work → café is 0.6 mi · would close ~1,400 steps/day on avg",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 gap-4"
                    style={{
                      borderBottom: i < arr.length - 1 ? "1px dashed #d0cfc8" : "none",
                    }}
                  >
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            fontFamily: "var(--font-jetbrains-mono)",
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            color: "#8a8a8a",
                          }}
                        >
                          {item.tag}
                        </span>
                        <span style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#8a8a8a", fontSize: 12 }}>→</span>
                        <span
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "#1a1a1a",
                          }}
                        >
                          {item.action}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 12,
                          color: "#4a4a4a",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.detail}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {["add to list", "dismiss"].map((a) => (
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right rail — conclusions */}
            <div className="flex flex-col gap-4" style={{ width: 300 }}>
              <div className="flex flex-col">
                <span style={tag}>Conclusions · this week</span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#1a1a1a",
                    marginTop: 2,
                  }}
                >
                  3 things from where you&apos;ve been
                </span>
              </div>

              <ConclusionCard
                priority="HIGH PRIORITY"
                tag="tick exposure"
                title="Check for ticks at next examination"
                body="You spent 1h 22m on Thursday inside a tall-grass area near Prospect Park flagged for tick activity in April. Ticks can attach unnoticed; a full-body check within 24h is recommended."
                actions={
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "#e76f51",
                        border: "1.4px solid #1a1a1a",
                        fontFamily: "var(--font-inter)",
                        color: "#1a1a1a",
                      }}
                    >
                      How to check →
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-full text-xs"
                      style={{
                        background: "transparent",
                        border: "1.4px solid #1a1a1a",
                        fontFamily: "var(--font-inter)",
                        color: "#1a1a1a",
                      }}
                    >
                      Add to doctor note
                    </button>
                  </div>
                }
              />

              <ConclusionCard
                priority="NOTICE"
                tag="pollen corridor"
                title="Allergy symptoms align with your gym route"
                body="4 of 5 sneezing episodes this week were logged within 90 min of walking through Park Slope's high-pollen corridor."
              />

              <ConclusionCard
                priority="POSITIVE"
                tag="sun exposure"
                title="Park visits are your best sun days"
                body="Days with a Prospect Park visit averaged 58 min outdoors — almost double your weekly baseline of 34 min."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
