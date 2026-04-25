import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = { sm: 20, md: 26, lg: 32 }[size];
  const fontSize = { sm: 16, md: 20, lg: 26 }[size];

  return (
    <Link href="/" className="inline-flex items-center gap-2 no-underline">
      <span
        style={{
          width: sz,
          height: sz,
          borderRadius: "50%",
          border: "1.6px solid #1a1a1a",
          background: "#e76f51",
          display: "inline-block",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: "5px",
            border: "1.4px solid #1a1a1a",
            borderRadius: "50%",
            display: "block",
          }}
        />
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize,
          color: "#1a1a1a",
          letterSpacing: "-0.01em",
        }}
      >
        Meliora
      </span>
    </Link>
  );
}
