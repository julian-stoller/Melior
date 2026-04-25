import Link from "next/link";
import { Logo } from "./Logo";

const CHAT_HISTORY = [
  {
    date: "Today",
    items: ["Why am I waking up at 4am?", "Headache pattern this week"],
  },
  { date: "Yesterday", items: ["Is 6,200 steps enough?"] },
  {
    date: "This week",
    items: [
      "Sumatriptan side effects",
      "Sleep & screen time link",
      "Trip to Lisbon — jet lag plan",
    ],
  },
  {
    date: "Earlier",
    items: [
      "First check-in",
      "Setting up Apple Watch",
      "How does Meliora work?",
    ],
  },
];

const NAV_LINKS = [
  { href: "/dashboard", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/medications", label: "Medications" },
  { href: "/profile", label: "Profile" },
];

export function ChatRail({ activePage }: { activePage?: string }) {
  return (
    <aside
      className="flex flex-col shrink-0 overflow-auto"
      style={{
        width: 240,
        borderRight: "1.4px solid #1a1a1a",
        background: "#f3f2ec",
      }}
    >
      {/* brand */}
      <div
        className="flex items-center gap-2 px-4 py-4"
        style={{ borderBottom: "1.2px dashed #8a8a8a" }}
      >
        <Logo size="sm" />
      </div>

      {/* actions */}
      <div className="px-3 pt-3 pb-2 flex flex-col gap-2">
        <button
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full text-sm font-semibold"
          style={{
            background: "#e76f51",
            border: "1.4px solid #1a1a1a",
            color: "#1a1a1a",
          }}
        >
          + New chat
        </button>
        <input
          className="w-full px-3 py-1.5 rounded-md text-xs"
          style={{
            border: "1.4px solid #1a1a1a",
            background: "#fafaf7",
            color: "#1a1a1a",
            fontFamily: "var(--font-inter)",
          }}
          placeholder="search chats…"
        />
      </div>

      {/* chat history */}
      <div className="flex flex-col gap-3 px-2 pb-4 overflow-auto">
        {CHAT_HISTORY.map((group, gi) => (
          <div key={group.date} className="flex flex-col gap-1">
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8a8a8a",
                padding: "0 10px",
              }}
            >
              {group.date}
            </div>
            {group.items.map((text, i) => {
              const isActive = gi === 0 && i === 0;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer text-xs"
                  style={{
                    background: isActive ? "#fbe3d8" : "transparent",
                    border: isActive
                      ? "1.2px solid #1a1a1a"
                      : "1.2px solid transparent",
                    fontFamily: "var(--font-inter)",
                    fontWeight: isActive ? 600 : 400,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: isActive ? "#e76f51" : "#8a8a8a",
                      flexShrink: 0,
                    }}
                  />
                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* page nav */}
      <div
        className="mt-auto flex flex-col gap-1 px-2 py-3"
        style={{ borderTop: "1.2px dashed #8a8a8a" }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-md text-sm no-underline"
            style={{
              background:
                activePage === link.href ? "#fbe3d8" : "transparent",
              border:
                activePage === link.href
                  ? "1.2px solid #1a1a1a"
                  : "1.2px solid transparent",
              fontFamily: "var(--font-inter)",
              fontWeight: activePage === link.href ? 600 : 400,
              color: activePage === link.href ? "#1a1a1a" : "#4a4a4a",
            }}
          >
            {link.label}
          </Link>
        ))}
        <div
          className="px-3 py-2 text-xs"
          style={{ color: "#8a8a8a", fontFamily: "var(--font-inter)" }}
        >
          John · Settings
        </div>
      </div>
    </aside>
  );
}
