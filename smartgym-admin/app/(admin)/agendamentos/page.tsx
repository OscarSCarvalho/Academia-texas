"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { mockAulas, mockInstrutores } from "@/lib/mock-data"

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const horariosGrade = ["06:00", "07:00", "08:00", "09:00", "10:00", "18:00", "19:00", "20:00"]

function getOcupacaoCor(inscritos: number, vagas: number) {
  const pct = inscritos / vagas
  if (pct >= 1) return "bg-red-100 text-red-700 border-red-200"
  if (pct >= 0.8) return "bg-amber-100 text-amber-700 border-amber-200"
  return "bg-emerald-100 text-emerald-700 border-emerald-200"
}

export default function AgendamentosPage() {
  const [diaAtivo, setDiaAtivo] = useState("Seg")

  const aulasDoDia = mockAulas.filter(a => a.dias.includes(diaAtivo))

  const hoje = new Date()
  const diasMes = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hoje)
    d.setDate(hoje.getDate() - hoje.getDay() + i)
    return d
  })

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-500 text-sm mt-1">Aulas em grupo, avaliações e personal trainer</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
          <Plus className="h-4 w-4" /> Nova Aula
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Aulas Cadastradas", value: mockAulas.length },
          { label: "Total de Vagas", value: mockAulas.reduce((s, a) => s + a.vagas, 0) },
          { label: "Inscritos Hoje", value: aulasDoDia.reduce((s, a) => s + a.inscritos, 0) },
          { label: "Aulas Lotadas", value: mockAulas.filter(a => a.inscritos >= a.vagas).length },
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Grade semanal */}
        <div className="col-span-2 space-y-4">
          {/* Day selector */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {diasMes.map((d, i) => {
                    const nomeDia = diasSemana[d.getDay()]
                    const isHoje = d.toDateString() === hoje.toDateString()
                    const isAtivo = nomeDia === diaAtivo
                    return (
                      <button
                        key={i}
                        onClick={() => setDiaAtivo(nomeDia)}
                        className={`flex flex-col items-center py-2 px-1 rounded-xl text-center transition-all ${
                          isAtivo ? "bg-indigo-600 text-white" :
                          isHoje ? "bg-indigo-50 text-indigo-600" :
                          "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        <span className="text-xs font-medium">{nomeDia}</span>
                        <span className={`text-sm font-bold mt-0.5 ${isAtivo ? "text-white" : "text-gray-900"}`}>
                          {d.getDate()}
                        </span>
                        {isHoje && !isAtivo && <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1" />}
                      </button>
                    )
                  })}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Aulas do dia */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Aulas de {diaAtivo}feira ({aulasDoDia.length} aulas)
            </p>
            {aulasDoDia.length > 0 ? aulasDoDia.map((aula) => (
              <Card key={aula.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-black text-indigo-600">{aula.horario}</div>
                        <div className="text-xs text-gray-400">{aula.duracao}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{aula.nome}</p>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <Avatar className="h-4 w-4 inline">
                            <AvatarFallback className="text-[8px] bg-gray-100">{aula.instrutor.split(" ").pop()![0]}</AvatarFallback>
                          </Avatar>
                          {aula.instrutor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getOcupacaoCor(aula.inscritos, aula.vagas)}`}>
                          {aula.inscritos}/{aula.vagas} vagas
                        </div>
                        <Progress
                          value={(aula.inscritos / aula.vagas) * 100}
                          className="mt-1.5 h-1.5 w-24"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        Ver inscritos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-12 text-gray-400">
                <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhuma aula agendada para {diaAtivo}feira</p>
                <Button size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700 gap-2">
                  <Plus className="h-4 w-4" /> Criar Aula
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Todas as aulas */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Todas as Aulas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 p-4 pt-0">
              {mockAulas.map((aula) => (
                <div key={aula.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{aula.nome}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" />{aula.horario} · {aula.duracao}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {aula.dias.map(d => (
                        <span key={d} className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-medium">{d}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getOcupacaoCor(aula.inscritos, aula.vagas)}`}>
                    {aula.inscritos}/{aula.vagas}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instrutores */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Instrutores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-0">
              {mockInstrutores.map((inst) => (
                <div key={inst.id} className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">{inst.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{inst.nome}</p>
                    <p className="text-xs text-gray-400 truncate">{inst.especialidade}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
