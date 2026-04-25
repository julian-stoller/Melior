"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PromptBoxProps {
  compact?: boolean;
  placeholder?: string;
}

export function PromptBox({
  compact = false,
  placeholder = "Ask about a pattern, log a symptom, or describe how you're feeling…",
}: PromptBoxProps) {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    setValue("");
    router.push(`/chat?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div
      className="flex flex-col rounded-md"
      style={{
        border: "1.2px solid #1a1a1a",
        background: "#fafaf7",
        padding: compact ? "10px 12px" : "14px 16px",
        gap: compact ? 8 : 10,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#e76f51",
              border: "1.2px solid #1a1a1a",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#8a8a8a",
            }}
          >
            Ask Claude · grounded in your data
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 11,
            color: "#e76f51",
            fontStyle: "italic",
          }}
        >
          private · not used for training
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={compact ? 2 : 3}
        placeholder={placeholder}
        className="resize-none outline-none bg-transparent w-full"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: compact ? 14 : 15,
          color: "#1a1a1a",
          lineHeight: 1.4,
          border: "none",
        }}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: "#e76f51",
            border: "1.4px solid #1a1a1a",
            color: "#1a1a1a",
            fontFamily: "var(--font-inter)",
            cursor: "pointer",
          }}
        >
          Send →
        </button>
      </div>
    </div>
  );
}
