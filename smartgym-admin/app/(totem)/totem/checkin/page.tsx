"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { QrCode, Keyboard, ArrowLeft, CheckCircle2, XCircle, RefreshCw, Dumbbell, Scan, Delete } from "lucide-react"
import { mockAlunos } from "@/lib/mock-data"
import { useLang } from "../../language-context"
import { LangSwitcher } from "../../lang-switcher"

type Step = "choose" | "qr" | "cpf" | "success" | "blocked"

const FOUND_ALUNO = mockAlunos[0]
const BLOCKED_ALUNO = mockAlunos[2]

function maskCpf(digits: string) {
  const n = digits.slice(0, 11)
  if (n.length <= 3) return n
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`
}

export default function CheckinPage() {
  const router = useRouter()
  const { t } = useLang()
  const [step, setStep] = useState<Step>("choose")
  const [cpf, setCpf] = useState("")
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [resultAluno, setResultAluno] = useState<typeof mockAlunos[0] | null>(null)
  const [countdown, setCountdown] = useState(5)

  function startScan() {
    setScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setScanning(false)
          const aluno = Math.random() > 0.2 ? FOUND_ALUNO : BLOCKED_ALUNO
          setResultAluno(aluno)
          setStep(aluno.status === "inadimplente" ? "blocked" : "success")
          return 100
        }
        return p + 4
      })
    }, 80)
  }

  useEffect(() => {
    if (step === "success" || step === "blocked") {
      setCountdown(5)
      const timer = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) { clearInterval(timer); router.push("/totem"); return 0 }
          return c - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step])

  function pressKey(k: string) {
    if (cpf.replace(/\D/g, "").length >= 11) return
    setCpf(p => maskCpf(p.replace(/\D/g, "") + k))
  }

  function searchCpf() {
    const nums = cpf.replace(/\D/g, "")
    if (nums.length !== 11) return
    const aluno = Math.random() > 0.3 ? FOUND_ALUNO : BLOCKED_ALUNO
    setResultAluno(aluno)
    setTimeout(() => setStep(aluno.status === "inadimplente" ? "blocked" : "success"), 600)
  }

  // ── CHOOSE ──
  if (step === "choose") return (
    <div className="h-screen bg-gray-950 flex flex-col">
      <header className="flex items-center justify-between px-12 py-8 border-b border-white/5">
        <Link href="/totem" className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> {t.back}
        </Link>
        <div className="flex items-center gap-3">
          <Dumbbell className="w-6 h-6 text-indigo-400" />
          <span className="text-white font-bold text-lg">YMCA of Central Texas</span>
        </div>
        <LangSwitcher compact />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-12 gap-10">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white mb-3">{t.checkinTitle}</h1>
          <p className="text-white/50 text-xl">{t.checkinSub}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
          <button
            onClick={() => { setStep("qr"); startScan() }}
            className="group relative overflow-hidden rounded-3xl p-10 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
            <QrCode className="w-14 h-14 text-white mb-6" />
            <h2 className="text-2xl font-black text-white mb-2">{t.qrLabel}</h2>
            <p className="text-white/60 text-base">{t.qrSub}</p>
          </button>

          <button
            onClick={() => setStep("cpf")}
            className="group relative overflow-hidden rounded-3xl p-10 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #0f766e, #0891b2)" }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
            <Keyboard className="w-14 h-14 text-white mb-6" />
            <h2 className="text-2xl font-black text-white mb-2">{t.idLabel}</h2>
            <p className="text-white/60 text-base">{t.idSub}</p>
          </button>
        </div>
      </div>
    </div>
  )

  // ── QR SCAN ──
  if (step === "qr") return (
    <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-10 px-12">
      <div className="text-center">
        <h1 className="text-4xl font-black text-white mb-2">{t.qrInstruction}</h1>
        <p className="text-white/50 text-lg">{t.qrHint}</p>
      </div>

      <div className="relative w-72 h-72">
        {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-12 h-12`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-400 rounded" />
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400 rounded" />
          </div>
        ))}
        <div className="absolute inset-4 overflow-hidden">
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
            style={{ top: `${scanProgress}%`, transition: "top 0.08s linear", boxShadow: "0 0 12px 2px rgba(99,102,241,0.5)" }}
          />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Scan className={`w-16 h-16 text-white/20 ${scanning ? "animate-pulse" : ""}`} />
        </div>
      </div>

      <div className="w-72 space-y-2">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${scanProgress}%` }} />
        </div>
        <p className="text-center text-white/40 text-sm">
          {scanning ? t.scanning : t.waiting}
        </p>
      </div>

      <button
        onClick={() => setStep("choose")}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> {t.back}
      </button>
    </div>
  )

  // ── CPF / ID ──
  if (step === "cpf") {
    const nums = ["1","2","3","4","5","6","7","8","9","","0","⌫"]
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-8 px-12">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-2">{t.idTitle}</h1>
          <p className="text-white/50 text-lg">{t.idHint}</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center overflow-hidden">
            <span className="text-4xl font-black text-white tracking-wide font-mono">
              {cpf || <span className="text-white/20">{t.idPlaceholder}</span>}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
          {nums.map((k, i) => (
            <button
              key={i}
              onClick={() => {
                if (k === "⌫") setCpf(p => maskCpf(p.replace(/\D/g, "").slice(0, -1)))
                else if (k !== "") pressKey(k)
              }}
              disabled={k === ""}
              className={`
                h-16 rounded-2xl text-xl font-bold transition-all duration-100
                ${k === "" ? "opacity-0 pointer-events-none" : "active:scale-90"}
                ${k === "⌫"
                  ? "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                  : "bg-white/10 border border-white/10 text-white hover:bg-white/20"
                }
              `}
            >
              {k === "⌫" ? <Delete className="w-5 h-5 mx-auto" /> : k}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          <button
            onClick={() => setStep("choose")}
            className="flex-1 h-14 rounded-2xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </button>
          <button
            onClick={searchCpf}
            disabled={cpf.replace(/\D/g, "").length !== 11}
            className="flex-1 h-14 rounded-2xl font-bold text-white transition-all text-base disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
          >
            {t.confirm}
          </button>
        </div>
      </div>
    )
  }

  // ── SUCCESS ──
  if (step === "success" && resultAluno) return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 px-12"
      style={{ background: "linear-gradient(135deg, #022c22, #064e3b, #065f46)" }}>
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-emerald-400/20 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-16 h-16 text-emerald-400" />
        </div>
        {[1,2].map(n => (
          <div key={n} className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping"
            style={{ animationDelay: `${n * 0.3}s` }} />
        ))}
      </div>

      <div className="text-center">
        <p className="text-emerald-300 text-xl font-semibold mb-2">{t.accessGranted}</p>
        <h1 className="text-5xl font-black text-white mb-3">
          {t.welcomeMsg} {resultAluno.nome.split(" ")[0]}!
        </h1>
        <p className="text-white/50 text-lg">{resultAluno.plano} · {new Date(resultAluno.vencimento).toLocaleDateString("pt-BR")}</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
          <span className="text-white text-2xl font-black">{resultAluno.avatar}</span>
        </div>
        <p className="text-emerald-400 font-semibold">{t.goodWorkout}</p>
      </div>

      <div className="flex items-center gap-3 text-white/40">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span className="text-sm">{t.returningIn} {countdown}s</span>
      </div>
    </div>
  )

  // ── BLOCKED ──
  if (step === "blocked" && resultAluno) return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 px-12"
      style={{ background: "linear-gradient(135deg, #1c0505, #450a0a, #7f1d1d)" }}>
      <div className="w-32 h-32 rounded-full bg-red-400/20 flex items-center justify-center">
        <XCircle className="w-16 h-16 text-red-400" />
      </div>

      <div className="text-center">
        <p className="text-red-400 text-xl font-semibold mb-2">{t.accessDenied}</p>
        <h1 className="text-5xl font-black text-white mb-3">
          {t.helloMsg} {resultAluno.nome.split(" ")[0]}
        </h1>
        <p className="text-white/50 text-lg max-w-md">{t.blockedMsg}</p>
      </div>

      <div className="flex gap-4">
        <Link href="/totem/cadastro"
          className="px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg, #dc2626, #9f1239)" }}>
          {t.regularize}
        </Link>
        <Link href="/totem"
          className="px-8 py-4 rounded-2xl font-bold text-white/60 text-lg border border-white/10 hover:border-white/30 hover:text-white transition-all">
          {t.backToHome}
        </Link>
      </div>

      <div className="flex items-center gap-3 text-white/30">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span className="text-sm">{t.returningIn} {countdown}s</span>
      </div>
    </div>
  )

  return null
}
