"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Dumbbell, CreditCard, Loader2, QrCode, Star } from "lucide-react"
import { getPlanos, type Plano } from "@/lib/db"
import { useLang } from "../../language-context"
import { LangSwitcher } from "../../lang-switcher"

type Step = "plano" | "dados" | "pagamento" | "sucesso"

function maskCpf(digits: string) {
  const n = digits.slice(0, 11)
  if (n.length <= 3) return n
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`
}

function maskTel(digits: string) {
  const n = digits.slice(0, 11)
  if (n.length <= 2) return n.length ? `(${n}` : ""
  if (n.length <= 7) return `(${n.slice(0, 2)}) ${n.slice(2)}`
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
}

export default function CadastroPage() {
  const router = useRouter()
  const { t } = useLang()
  const [planos, setPlanos] = useState<Plano[]>([])
  const [step, setStep] = useState<Step>("plano")
  const [planoId, setPlanoId] = useState<string | null>(null)
  const [metodo, setMetodo] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [form, setForm] = useState({ nome: "", cpf: "", email: "", tel: "" })

  useEffect(() => { getPlanos().then(setPlanos) }, [])

  const planoSel = planos.find(p => p.id === planoId)

  const METODOS = [
    { id: "pix",      label: t.methodPix,    icon: "💠", desc: t.methodPixDesc },
    { id: "credito",  label: t.methodCredit, icon: "💳", desc: t.methodCreditDesc },
    { id: "debito",   label: t.methodDebit,  icon: "🏦", desc: t.methodDebitDesc },
    { id: "dinheiro", label: t.methodCash,   icon: "💵", desc: t.methodCashDesc },
  ]

  function confirmarPagamento() {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setStep("sucesso") }, 2500)
  }

  const stepIdx = { plano: 0, dados: 1, pagamento: 2, sucesso: 3 }[step]
  const steps = [t.stepPlan, t.stepData, t.stepPayment, t.stepDone]

  // ── SUCESSO ──
  if (step === "sucesso") return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 px-12"
      style={{ background: "linear-gradient(135deg, #0c0a1e, #1e1b4b, #312e81)" }}>
      <div className="text-center">
        <div className="relative mb-6 inline-block">
          <div className="w-28 h-28 rounded-full bg-indigo-400/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-14 h-14 text-indigo-300" />
          </div>
          <Star className="absolute -top-2 -right-2 w-7 h-7 text-yellow-400 fill-yellow-400" />
        </div>
        <p className="text-indigo-300 font-semibold text-xl mb-2">{t.enrollConfirmed}</p>
        <h1 className="text-5xl font-black text-white mb-4">
          {t.enrollWelcome}<br /><span className="text-indigo-400">YMCA of Central Texas!</span>
        </h1>
        <p className="text-white/50 text-lg max-w-sm mx-auto">
          {t.enrollMsgPre} {form.email || t.enrollEmailFallback}.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center w-full max-w-xs">
        <QrCode className="w-20 h-20 text-indigo-300 mx-auto mb-4 opacity-60" />
        <p className="text-white font-bold text-lg">{planoSel?.nome}</p>
        <p className="text-white/50 text-sm mt-1">R$ {planoSel?.preco.toFixed(2)} · {planoSel?.duracao} {t.days}</p>
        <p className="text-xs text-white/30 mt-4">{t.qrSentMsg}</p>
      </div>

      <Link href="/totem"
        className="px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
        {t.goCheckin}
      </Link>
    </div>
  )

  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-12 py-6 border-b border-white/5">
        {step !== "plano" ? (
          <button
            onClick={() => setStep(step === "dados" ? "plano" : step === "pagamento" ? "dados" : "plano")}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> {t.back}
          </button>
        ) : (
          <Link href="/totem" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> {t.home}
          </Link>
        )}
        <div className="flex items-center gap-3">
          <Dumbbell className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-bold">YMCA of Central Texas</span>
        </div>
        <LangSwitcher compact />
      </header>

      {/* Progress */}
      <div className="flex items-center justify-center gap-0 px-12 py-5 border-b border-white/5">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              i === stepIdx ? "bg-indigo-600 text-white" :
              i < stepIdx ? "text-emerald-400" : "text-white/30"
            }`}>
              {i < stepIdx
                ? <CheckCircle2 className="w-4 h-4" />
                : <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-xs">{i + 1}</span>
              }
              {s}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 rounded ${i < stepIdx ? "bg-emerald-500" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-12 py-8">

        {/* STEP 1 — PLANO */}
        {step === "plano" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-black text-white mb-2">{t.choosePlan}</h1>
              <p className="text-white/50 text-lg">{t.choosePlanSub}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {planos.map(plano => {
                const selected = planoId === plano.id
                return (
                  <button
                    key={plano.id}
                    onClick={() => setPlanoId(plano.id)}
                    className={`relative p-6 rounded-3xl text-left transition-all duration-200 border-2 ${
                      selected ? "border-indigo-500 bg-indigo-950/50 scale-[1.02]" : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    {selected && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle2 className="w-6 h-6 text-indigo-400" />
                      </div>
                    )}
                    {plano.nome === "Anual" && (
                      <span className="absolute -top-3 left-6 px-3 py-1 bg-yellow-400 text-black text-xs font-black rounded-full">
                        {t.mostPopular}
                      </span>
                    )}
                    <p className="text-3xl font-black text-white mb-1">R$ {plano.preco.toFixed(2)}</p>
                    <p className="text-white/50 text-sm mb-4">
                      {plano.duracao < 60 ? t.perMonth : plano.duracao < 180 ? t.per3Months : t.perYear}
                    </p>
                    <p className="text-white font-bold text-lg mb-2">{plano.nome}</p>
                    <p className="text-white/50 text-sm">{plano.descricao}</p>
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => planoId && setStep("dados")}
                disabled={!planoId}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
              >
                {t.continue} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — DADOS */}
        {step === "dados" && (
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-black text-white mb-2">{t.yourData}</h1>
              <p className="text-white/50 text-lg">{t.yourDataSub}</p>
            </div>

            <div className="space-y-4">
              {[
                { key: "nome",  label: t.fullName,  placeholder: t.fullNamePlaceholder, type: "text" },
                { key: "cpf",   label: t.idLabel,    placeholder: t.idPlaceholder,       type: "text" },
                { key: "email", label: "E-mail",     placeholder: t.emailPlaceholder,    type: "email" },
                { key: "tel",   label: t.phone,      placeholder: t.phonePlaceholder,    type: "tel" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-white/60 text-sm font-medium mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => {
                      if (field.key === "cpf") {
                        setForm(f => ({ ...f, cpf: maskCpf(e.target.value.replace(/\D/g, "")) }))
                      } else if (field.key === "tel") {
                        setForm(f => ({ ...f, tel: maskTel(e.target.value.replace(/\D/g, "")) }))
                      } else {
                        setForm(f => ({ ...f, [field.key]: e.target.value }))
                      }
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => { if (!form.nome || !form.cpf || !form.email) return; setStep("pagamento") }}
              disabled={!form.nome || !form.cpf || !form.email}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              {t.continue} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 3 — PAGAMENTO */}
        {step === "pagamento" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-black text-white mb-2">{t.paymentTitle}</h1>
              <p className="text-white/50 text-lg">{t.paymentSub}</p>
            </div>

            <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-300 text-sm font-medium">{t.selectedPlan}</p>
                  <p className="text-white font-bold text-lg">{planoSel?.nome}</p>
                  <p className="text-white/50 text-sm">{planoSel?.descricao}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white">R$ {planoSel?.preco.toFixed(2)}</p>
                  <p className="text-white/40 text-xs">{planoSel?.duracao} {t.days}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {METODOS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMetodo(m.id)}
                  className={`p-5 rounded-2xl text-left border-2 transition-all ${
                    metodo === m.id ? "border-indigo-500 bg-indigo-950/50" : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="text-3xl mb-2">{m.icon}</div>
                  <p className="text-white font-bold">{m.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{m.desc}</p>
                  {metodo === m.id && <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-2" />}
                </button>
              ))}
            </div>

            <button
              onClick={confirmarPagamento}
              disabled={!metodo || processing}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #059669, #0d9488)" }}
            >
              {processing ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> {t.processing}</>
              ) : (
                <><CreditCard className="w-5 h-5" /> {t.confirmPayment} · R$ {planoSel?.preco.toFixed(2)}</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
