import Link from "next/link";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard", label: "Chats" },
  { href: "/locations", label: "Locations" },
  { href: "/medications", label: "Medications" },
  { href: "/profile", label: "Profile" },
];

interface SideRailProps {
  activePage: string;
  note?: { tag: string; body: string; action?: string };
}

export function SideRail({ activePage, note }: SideRailProps) {
  return (
    <aside
      className="flex flex-col shrink-0"
      style={{
        width: 220,
        borderRight: "1.4px solid #1a1a1a",
        background: "#f3f2ec",
        padding: "20px 16px",
      }}
    >
      <Logo size="sm" />
      <nav className="flex flex-col gap-1 mt-4">
        {NAV_LINKS.map((link) => {
          const isActive = activePage === link.href && link.label !== "Chats" && link.label !== "Dashboard";
          const isDashActive = activePage === "/dashboard" && link.label === "Dashboard";
          const active = isActive || isDashActive;
          return (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-md text-sm no-underline"
              style={{
                background: active ? "#fbe3d8" : "transparent",
                border:
                  active
                    ? "1.2px solid #1a1a1a"
                    : "1.2px solid transparent",
                fontFamily: "var(--font-inter)",
                fontWeight: active ? 600 : 400,
                color: active ? "#1a1a1a" : "#4a4a4a",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {note && (
        <div
          className="mt-auto flex flex-col gap-2 p-3 rounded-md"
          style={{ border: "1.2px solid #1a1a1a", background: "#fafaf7" }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#8a8a8a",
            }}
          >
            {note.tag}
          </span>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              color: "#4a4a4a",
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            {note.body}
          </p>
          {note.action && (
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: "#e76f51",
                fontStyle: "italic",
              }}
            >
              {note.action}
            </span>
          )}
        </div>
      )}
    </aside>
  );
}
