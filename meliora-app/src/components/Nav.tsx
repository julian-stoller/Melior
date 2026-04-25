import Link from "next/link";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { id: "how", label: "How it works", href: "#" },
  { id: "privacy", label: "Privacy", href: "#" },
  { id: "science", label: "Science", href: "#" },
];

export function Nav() {
  return (
    <nav
      className="flex items-center justify-between px-9 py-5"
      style={{ borderBottom: "1.4px solid #1a1a1a" }}
    >
      <Logo />
      <div className="flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="text-base font-medium no-underline"
            style={{ color: "#4a4a4a" }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full no-underline"
          style={{
            border: "1.4px solid #1a1a1a",
            color: "#1a1a1a",
            background: "transparent",
          }}
        >
          Sign in
        </Link>
      </div>
    </nav>
  );
}
