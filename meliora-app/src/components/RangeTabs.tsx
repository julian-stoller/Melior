const RANGES = ["Day", "Week", "Month", "Year", "All"];

export function RangeTabs({ active = "Week" }: { active?: string }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full"
      style={{
        background: "#f3f2ec",
        padding: 4,
        border: "1.4px solid #1a1a1a",
      }}
    >
      {RANGES.map((r) => (
        <div
          key={r}
          className="px-4 py-1 rounded-full text-xs cursor-pointer"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: r === active ? 700 : 500,
            background: r === active ? "#e76f51" : "transparent",
            border:
              r === active ? "1.2px solid #1a1a1a" : "1.2px solid transparent",
            color: "#1a1a1a",
          }}
        >
          {r}
        </div>
      ))}
    </div>
  );
}
