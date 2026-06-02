"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { IconBarbell, IconPlayerPlay, IconId, IconClipboardList } from "@tabler/icons-react"
import { useLang } from "../language-context"
import { LangSwitcher } from "../lang-switcher"

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=80",
  "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1400&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1400&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1400&q=80",
]

export default function TotemHomePage() {
  const { t } = useLang()
  const [bgIndex, setBgIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(bgIndex)
      setTransitioning(true)
      setTimeout(() => {
        setBgIndex(i => (i + 1) % BG_IMAGES.length)
        setTransitioning(false)
        setPrevIndex(null)
      }, 1200)
    }, 5000)
    return () => clearInterval(interval)
  }, [bgIndex])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }))
      setDate(now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const BUTTONS = [
    {
      href: "/totem/checkin",
      icon: IconPlayerPlay,
      iconColor: "#ffffff",
      bg: "#5555cc",
      label: t.btnCheckin,
      sub: t.btnCheckinSub,
    },
    {
      href: "/totem/cadastro",
      icon: IconId,
      iconColor: "#6ee7b7",
      bg: "#0f6e56",
      label: t.btnEnroll,
      sub: t.btnEnrollSub,
    },
    {
      href: "/totem/treinos",
      icon: IconClipboardList,
      iconColor: "#fbbf24",
      bg: "#854F0B",
      label: t.btnWorkout,
      sub: t.btnWorkoutSub,
    },
  ]

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", background: "#000" }}>

      {/* BACKGROUND SLIDESHOW */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === bgIndex ? 1 : i === prevIndex ? (transitioning ? 0 : 1) : 0,
            transition: "opacity 1200ms",
            zIndex: i === bgIndex ? 1 : i === prevIndex ? 0 : -1,
          }}
        />
      ))}

      {/* OVERLAYS */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent, rgba(0,0,0,0.5))" }} />

      {/* CONTEÚDO */}
      <div style={{ position: "relative", zIndex: 20, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1rem" }}>
        <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", flex: 1 }}>

          {/* HEADER */}
          <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(124,124,255,0.25)", border: "1px solid rgba(124,124,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconBarbell size={24} color="#7c7cff" />
              </div>
              <div>
                <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}>
                  YMCA <span style={{ color: "#7c7cff" }}>of Central Texas</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>
                  {t.tagline}
                </div>
              </div>
            </div>

            {/* Centro: seletor de idioma */}
            <LangSwitcher />

            {/* Relógio */}
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "2rem", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                {time}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginTop: 4, textTransform: "capitalize" }}>
                {date}
              </div>
            </div>
          </header>

          {/* HERO */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "2.5rem" }}>

            {/* Ícone central */}
            <div style={{ position: "relative", marginBottom: "2rem" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(124,124,255,0.15)", border: "2px solid rgba(124,124,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconBarbell size={56} color="#7c7cff" />
              </div>
              <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "1px solid rgba(124,124,255,0.12)", pointerEvents: "none" }} />
            </div>

            {/* Título */}
            <h1 style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: 900, textAlign: "center", margin: "0 0 2.5rem", lineHeight: 1.1, textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              {t.heroTitle} <span style={{ color: "#7c7cff" }}>{t.heroHighlight}</span>
            </h1>

            {/* BOTÕES */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, width: "100%", marginBottom: "2.5rem" }}>
              {BUTTONS.map((btn) => (
                <Link key={btn.href} href={btn.href} style={{ textDecoration: "none" }}>
                  <div
                    style={{ background: btn.bg, borderRadius: 20, padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", cursor: "pointer", transition: "transform 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
                    onMouseUp={e => (e.currentTarget.style.transform = "scale(1.03)")}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <btn.icon size={28} color={btn.iconColor} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#ffffff", fontWeight: 800, fontSize: "1rem", lineHeight: 1.2 }}>
                        {btn.label}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", marginTop: 6, lineHeight: 1.4 }}>
                        {btn.sub}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* RODAPÉ */}
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", marginBottom: "2rem" }}>
              {t.footerHint}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
