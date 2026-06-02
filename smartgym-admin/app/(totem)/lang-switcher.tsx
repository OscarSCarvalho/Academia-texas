"use client"

import { useLang } from "./language-context"
import { Lang } from "./translations"

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
]

export function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang()

  return (
    <div style={{ display: "flex", gap: compact ? 4 : 6 }}>
      {LANGS.map(({ code, flag, label }) => {
        const active = lang === code
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: compact ? 4 : 6,
              padding: compact ? "4px 10px" : "8px 14px",
              borderRadius: 999,
              border: active ? "1.5px solid rgba(124,124,255,0.7)" : "1.5px solid rgba(255,255,255,0.12)",
              background: active ? "rgba(124,124,255,0.18)" : "rgba(255,255,255,0.05)",
              color: active ? "#c4c4ff" : "rgba(255,255,255,0.45)",
              fontWeight: active ? 700 : 500,
              fontSize: compact ? "0.72rem" : "0.82rem",
              cursor: "pointer",
              transition: "all 0.15s",
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ fontSize: compact ? "0.9rem" : "1rem" }}>{flag}</span>
            {label}
          </button>
        )
      })}
    </div>
  )
}
