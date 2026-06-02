"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Search, Delete, ChevronDown, ChevronUp } from "lucide-react"
import { mockFichas, mockAlunos } from "@/lib/mock-data"

type Step = "busca" | "ficha"

function maskCpf(digits: string) {
  const n = digits.slice(0, 11)
  if (n.length <= 3) return n
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`
}

export default function TreinosTotemPage() {
  const [step, setStep] = useState<Step>("busca")
  const [cpf, setCpf] = useState("")
  const [ficha, setFicha] = useState<typeof mockFichas[0] | null>(null)
  const [alunoNome, setAlunoNome] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [openTreino, setOpenTreino] = useState<number | null>(0)

  const nums = ["1","2","3","4","5","6","7","8","9","","0","⌫"]

  function pressKey(k: string) {
    if (cpf.replace(/\D/g, "").length >= 11) return
    setCpf(p => maskCpf(p.replace(/\D/g, "") + k))
  }

  function buscar() {
    if (cpf.replace(/\D/g, "").length < 11) return
    setNotFound(false)
    const aluno = mockAlunos[Math.floor(Math.random() * mockAlunos.length)]
    const fichaEncontrada = mockFichas.find(f => f.aluno === aluno.nome) ?? mockFichas[0]
    if (fichaEncontrada) {
      setFicha(fichaEncontrada)
      setAlunoNome(aluno.nome)
      setStep("ficha")
    } else {
      setNotFound(true)
    }
  }

  // ── FICHA ──
  if (step === "ficha" && ficha) return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      <header className="flex items-center justify-between px-12 py-6 border-b border-white/5 flex-shrink-0">
        <button onClick={() => setStep("busca")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>
        <div className="flex items-center gap-3">
          <Dumbbell className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-bold">Minha Ficha de Treino</span>
        </div>
        <div className="w-24" />
      </header>

      <div className="flex-1 overflow-y-auto px-12 py-6">
        {/* Header ficha */}
        <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-300 text-sm font-medium mb-1">Ficha de Treino</p>
              <h2 className="text-2xl font-black text-white">{alunoNome}</h2>
              <p className="text-white/50 text-sm mt-1">
                {ficha.instrutor} · Objetivo: <span className="text-indigo-300 font-semibold">{ficha.objetivo}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/30 text-xs">Criada em</p>
              <p className="text-white font-semibold">{new Date(ficha.criado).toLocaleDateString("pt-BR")}</p>
              <div className="mt-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl px-3 py-1.5">
                <p className="text-indigo-300 text-sm font-semibold">{ficha.treinos.length} treinos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Treinos accordion */}
        <div className="space-y-3">
          {ficha.treinos.map((treino, i) => (
            <div key={i} className={`rounded-3xl border transition-all overflow-hidden ${openTreino === i ? "border-indigo-500/50 bg-indigo-950/30" : "border-white/10 bg-white/5"}`}>
              <button
                className="w-full flex items-center justify-between px-6 py-5"
                onClick={() => setOpenTreino(openTreino === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
                    <span className="text-indigo-300 font-black">{String.fromCharCode(65 + i)}</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg">{treino.dia}</p>
                    <p className="text-white/40 text-sm">{treino.exercicios.length} exercícios</p>
                  </div>
                </div>
                {openTreino === i
                  ? <ChevronUp className="w-5 h-5 text-white/40" />
                  : <ChevronDown className="w-5 h-5 text-white/40" />
                }
              </button>

              {openTreino === i && (
                <div className="px-6 pb-5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {treino.exercicios.map((ex, j) => (
                      <div key={j} className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-3.5">
                        <div className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-300 text-xs font-black">{j + 1}</span>
                        </div>
                        <span className="text-white text-sm font-medium">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pb-4">
          <Link href="/totem/checkin"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-lg"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
            <Dumbbell className="w-5 h-5" /> Fazer Check-in Agora
          </Link>
        </div>
      </div>
    </div>
  )

  // ── BUSCA ──
  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      <header className="flex items-center justify-between px-12 py-6 border-b border-white/5">
        <Link href="/totem" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Início
        </Link>
        <div className="flex items-center gap-3">
          <Dumbbell className="w-5 h-5 text-indigo-400" />
          <span className="text-white font-bold">Ver Meu Treino</span>
        </div>
        <div className="w-24" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-12">
        <div className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-5">
            <Dumbbell className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Acesse sua Ficha</h1>
          <p className="text-white/50 text-lg">Digite seu CPF para ver seus exercícios de hoje</p>
        </div>

        {/* CPF Display */}
        <div className="w-full max-w-sm">
          <div className={`bg-white/5 border-2 rounded-2xl px-6 py-5 text-center overflow-hidden transition-colors ${notFound ? "border-red-500/50" : "border-white/10"}`}>
            <span className="text-4xl font-black text-white tracking-wide font-mono">
              {cpf || <span className="text-white/20">000.000.000-00</span>}
            </span>
          </div>
          {notFound && (
            <p className="text-red-400 text-center text-sm mt-2">CPF não encontrado no sistema</p>
          )}
        </div>

        {/* Numpad */}
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

        <button
          onClick={buscar}
          disabled={cpf.replace(/\D/g, "").length !== 11}
          className="w-full max-w-sm flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "linear-gradient(135deg, #ea580c, #db2777)" }}
        >
          <Search className="w-5 h-5" /> Buscar Treino
        </button>
      </div>
    </div>
  )
}
