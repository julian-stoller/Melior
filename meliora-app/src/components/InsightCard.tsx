interface InsightCardProps {
  title: string;
  body: string;
  accent?: boolean;
}

export function InsightCard({ title, body, accent }: InsightCardProps) {
  return (
    <div
      className="flex flex-col gap-2 p-4 rounded-md"
      style={{
        border: "1.2px solid #1a1a1a",
        background: accent ? "#fbe3d8" : "#fafaf7",
      }}
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
        Meliora noticed
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 600,
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
    </div>
  );
}
