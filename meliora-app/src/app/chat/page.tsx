"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChatRail } from "@/components/ChatRail";
import { PromptBox } from "@/components/PromptBox";

const RESPONSE =
  "That sounds like it could be from how you were holding the phone — pressure on the nerves in your hand or arm can cause numbness and tingling, especially if you held it in one position for a while. It usually goes away within minutes once you change position and shake it out.\n\nI'll add potential carpal tunnel to your health profile so you can be screened at your next checkup.";

const CHAR_DELAY_MS = 16;
const THINK_DELAY_MS = 380;

const tag = {
  fontFamily: "var(--font-jetbrains-mono)",
  fontSize: 10,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "#8a8a8a",
};

function ChatContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [displayed, setDisplayed] = useState("");
  const [streaming, setStreaming] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayed("");
    setStreaming(true);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(RESPONSE.slice(0, i));
        if (i >= RESPONSE.length) {
          clearInterval(interval);
          setStreaming(false);
        }
      }, CHAR_DELAY_MS);
    }, THINK_DELAY_MS);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [query]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [displayed]);

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "#fafaf7" }}>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <ChatRail activePage="/dashboard" />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center px-8 py-4 shrink-0"
          style={{ borderBottom: "1.4px solid #1a1a1a" }}
        >
          <span style={tag}>Chat · grounded in your data</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-8 py-8 flex flex-col gap-8">
          {/* User bubble */}
          {query && (
            <div className="flex justify-end">
              <div
                className="rounded-md px-4 py-3"
                style={{
                  maxWidth: 520,
                  background: "#fbe3d8",
                  border: "1.2px solid #1a1a1a",
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  color: "#1a1a1a",
                  lineHeight: 1.55,
                }}
              >
                {query}
              </div>
            </div>
          )}

          {/* Meliora bubble */}
          <div className="flex flex-col gap-2" style={{ maxWidth: 600 }}>
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "#e76f51",
                  border: "1.2px solid #1a1a1a",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span style={tag}>
                Meliora ·{" "}
                {streaming ? "thinking…" : "grounded in your data"}
              </span>
            </div>
            <div
              className="rounded-md px-4 py-3"
              style={{
                background: "#fafaf7",
                border: "1.2px solid #1a1a1a",
                fontFamily: "var(--font-inter)",
                fontSize: 15,
                color: "#1a1a1a",
                lineHeight: 1.65,
                whiteSpace: "pre-wrap",
                minHeight: 56,
              }}
            >
              {displayed}
              {streaming && (
                <span
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "0.9em",
                    background: "#e76f51",
                    marginLeft: 1,
                    verticalAlign: "text-bottom",
                    animation: "blink 0.8s step-end infinite",
                  }}
                />
              )}
            </div>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Bottom prompt */}
        <div
          className="px-8 py-4 shrink-0"
          style={{ borderTop: "1.4px solid #1a1a1a" }}
        >
          <PromptBox compact />
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatContent />
    </Suspense>
  );
}
