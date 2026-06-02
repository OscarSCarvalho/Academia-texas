"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Dumbbell, QrCode, UserPlus, ClipboardList, ChevronRight, Zap, Trophy, Flame } from "lucide-react"

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1400&q=80",
  "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=1400&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1400&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1400&q=80",
]

const STATS = [
  { icon: Trophy, label: "Alunos Ativos", value: "248" },
  { icon: Zap, label: "Aulas Hoje", value: "12" },
  { icon: Flame, label: "Check-ins Hoje", value: "67" },
]

const ACTIONS = [
  {
    href: "/totem/checkin",
    icon: QrCode,
    label: "Fazer Check-in",
    desc: "Entrada rápida por QR Code ou CPF",
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/40",
    size: "normal",
  },
  {
    href: "/totem/cadastro",
    icon: UserPlus,
    label: "Quero me Matricular",
    desc: "Cadastro e pagamento na hora",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/40",
    size: "normal",
  },
  {
    href: "/totem/treinos",
    icon: ClipboardList,
    label: "Ver Meu Treino",
    desc: "Acesse sua ficha de exercícios",
    color: "from-orange-500 to-pink-600",
    glow: "shadow-orange-500/40",
    size: "normal",
  },
]

export default function TotemHomePage() {
  const [bgIndex, setBgIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [idle, setIdle] = useState(false)
  const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Troca de background
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

  // Relógio
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }))
      setDate(now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }))
    }
    tick()
    const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [])

  // Idle mode (30s sem interação)
  useEffect(() => {
    const resetIdle = () => {
      setIdle(false)
      if (idleTimer) clearTimeout(idleTimer)
      const t = setTimeout(() => setIdle(true), 30000)
      setIdleTimer(t)
    }
    resetIdle()
    window.addEventListener("touchstart", resetIdle)
    window.addEventListener("mousemove", resetIdle)
    window.addEventListener("click", resetIdle)
    return () => {
      window.removeEventListener("touchstart", resetIdle)
      window.removeEventListener("mousemove", resetIdle)
      window.removeEventListener("click", resetIdle)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">

      {/* ── BACKGROUND SLIDESHOW ── */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === bgIndex ? 1 : (i === prevIndex ? (transitioning ? 0 : 1) : 0),
            transitionDuration: "1200ms",
            zIndex: i === bgIndex ? 1 : (i === prevIndex ? 0 : -1),
          }}
        />
      ))}

      {/* ── OVERLAY GRADIENTES ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* ── PARTÍCULAS / SCANLINES ── */}
      <div className="absolute inset-0 z-10 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)" }} />

      {/* ── IDLE MODE: Tela de atratividade ── */}
      {idle && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setIdle(false)}
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div className="text-center animate-pulse">
            <div className="mb-6">
              <div
                className="w-28 h-28 mx-auto rounded-full border-4 border-white/20 flex items-center justify-center"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent)" }}
              >
                <Dumbbell className="w-14 h-14 text-white/80" />
              </div>
            </div>
            <p className="text-5xl font-black text-white tracking-tight mb-2">TOQUE PARA COMEÇAR</p>
            <p className="text-white/50 text-xl">Autoatendimento disponível 24 horas</p>
          </div>

          {/* Rings animados */}
          {[1, 2, 3].map(n => (
            <div
              key={n}
              className="absolute rounded-full border border-indigo-400/20 animate-ping"
              style={{
                width: `${n * 180}px`,
                height: `${n * 180}px`,
                animationDelay: `${n * 0.4}s`,
                animationDuration: "2.5s",
              }}
            />
          ))}
        </div>
      )}

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="relative z-20 flex flex-col h-full px-8 py-8">

        {/* TOP BAR */}
        <div className="flex items-start justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl border border-white/20 backdrop-blur-sm"
              style={{ background: "rgba(99,102,241,0.3)" }}>
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-white font-black text-3xl tracking-tight leading-none">
                YMCA<span className="text-indigo-400"> of Central Texas</span>
              </div>
              <div className="text-white/50 text-sm font-medium tracking-widest uppercase">Control</div>
            </div>
          </div>

          {/* Relógio */}
          <div className="text-right">
            <div className="text-white font-black text-5xl leading-none tabular-nums tracking-tight">
              {time}
            </div>
            <div className="text-white/60 text-sm mt-1 capitalize">{date}</div>
          </div>
        </div>

        {/* HERO TEXT */}
        <div className="mt-auto mb-0 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm mb-6"
              style={{ background: "rgba(255,255,255,0.08)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Academia aberta agora · 247 membros ativos</span>
            </div>

            <h1 className="text-5xl font-black text-white leading-[0.95] tracking-tight mb-4">
              SEU TREINO<br />
              <span className="text-transparent"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}>
                COMEÇA
              </span>{" "}
              <span className="text-indigo-400">AQUI.</span>
            </h1>

            <p className="text-white/60 text-base font-light max-w-lg leading-relaxed">
              Faça check-in, acesse sua ficha de treino ou se matricule agora mesmo — sem espera, sem fila.
            </p>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="flex gap-6 mb-4">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="p-2 rounded-xl border border-white/10"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <Icon className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="text-white font-bold text-xl leading-none">{value}</div>
                <div className="text-white/40 text-xs mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pb-2">
          {ACTIONS.map((action) => (
            <Link key={action.href} href={action.href} className="group">
              <div
                className="relative overflow-hidden rounded-2xl px-6 py-5 cursor-pointer flex items-center gap-5 transition-all duration-200 group-hover:scale-[1.02] group-active:scale-[0.97]"
                style={{ boxShadow: "0 8px 32px -6px rgba(0,0,0,0.5)" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-90`} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />

                <div className="relative z-10 p-3 bg-white/20 rounded-2xl backdrop-blur-sm flex-shrink-0">
                  <action.icon className="w-7 h-7 text-white" />
                </div>

                <div className="relative z-10 flex-1 min-w-0">
                  <h2 className="text-white font-black text-xl leading-tight">{action.label}</h2>
                  <p className="text-white/70 text-sm mt-0.5 truncate">{action.desc}</p>
                </div>

                <ChevronRight className="relative z-10 w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
          <p className="text-white/30 text-xs">Toque em qualquer opção para começar</p>
          <div className="flex gap-1.5">
            {BG_IMAGES.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === bgIndex ? "w-6 bg-white/60" : "w-1.5 bg-white/20"}`} />
            ))}
          </div>
          <p className="text-white/30 text-xs">YMCA of Central Texas v1.0</p>
        </div>
      </div>
    </div>
  )
}
