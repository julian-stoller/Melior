interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  accent?: boolean;
}

export function StatCard({ label, value, delta, accent }: StatCardProps) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-md"
      style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
    >
      <div
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#8a8a8a",
        }}
      >
        {label}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 24,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </span>
        {delta && (
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              color: accent ? "#e76f51" : "#4a4a4a",
              fontStyle: "italic",
            }}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
