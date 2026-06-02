"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Dumbbell, ClipboardList, Edit, ChevronDown, ChevronRight } from "lucide-react"
import { getFichas, getInstrutores, getAlunos, type Instrutor, type FichaRow } from "@/lib/db"

const exerciciosBanco = [
  { grupo: "Peito", exercicios: ["Supino Reto", "Supino Inclinado", "Crucifixo", "Cross Over", "Flexão de Braço"] },
  { grupo: "Costas", exercicios: ["Puxada Frontal", "Remada Curvada", "Remada Unilateral", "Pull-down", "Levantamento Terra"] },
  { grupo: "Ombros", exercicios: ["Desenvolvimento", "Elevação Lateral", "Elevação Frontal", "Remada Alta"] },
  { grupo: "Bíceps", exercicios: ["Rosca Direta", "Rosca Martelo", "Rosca Concentrada", "Rosca Scott"] },
  { grupo: "Tríceps", exercicios: ["Tríceps Corda", "Tríceps Francês", "Mergulho", "Extensão Testa"] },
  { grupo: "Pernas", exercicios: ["Agachamento", "Leg Press", "Cadeira Extensora", "Cadeira Flexora", "Stiff", "Panturrilha"] },
  { grupo: "Core / Abdomen", exercicios: ["Prancha", "Abdominal Crunch", "Prancha Lateral", "Mountain Climber", "Russian Twist"] },
]

export default function TreinosPage() {
  const [fichas, setFichas] = useState<FichaRow[]>([])
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [totalAlunos, setTotalAlunos] = useState(0)
  const [search, setSearch] = useState("")
  const [openGrupo, setOpenGrupo] = useState<string | null>(null)

  useEffect(() => {
    getFichas().then(setFichas)
    getInstrutores().then(setInstrutores)
    getAlunos().then(a => setTotalAlunos(a.length))
  }, [])

  const fichasFiltradas = fichas.filter(f =>
    f.aluno.toLowerCase().includes(search.toLowerCase()) ||
    f.instrutor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Treinos</h1>
          <p className="text-gray-500 text-sm mt-1">Fichas de treino e banco de exercícios</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
          <Plus className="h-4 w-4" /> Nova Ficha
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Fichas Ativas", value: fichas.length, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Sem Ficha", value: Math.max(0, totalAlunos - fichas.length), color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Instrutores", value: instrutores.length, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Exercícios", value: exerciciosBanco.reduce((s, g) => s + g.exercicios.length, 0), color: "text-violet-600", bg: "bg-violet-50" },
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="fichas">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="fichas" className="text-xs gap-2">
            <ClipboardList className="h-3.5 w-3.5" /> Fichas de Treino
          </TabsTrigger>
          <TabsTrigger value="banco" className="text-xs gap-2">
            <Dumbbell className="h-3.5 w-3.5" /> Banco de Exercícios
          </TabsTrigger>
          <TabsTrigger value="instrutores" className="text-xs gap-2">
            <Avatar className="h-3.5 w-3.5"><AvatarFallback className="text-[8px]">I</AvatarFallback></Avatar>
            Instrutores
          </TabsTrigger>
        </TabsList>

        {/* Fichas tab */}
        <TabsContent value="fichas" className="mt-4 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar por aluno ou instrutor..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="space-y-4">
            {fichasFiltradas.map((ficha) => (
              <Card key={ficha.id} className="border-0 shadow-sm">
                <CardHeader className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
                          {ficha.aluno.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{ficha.aluno}</p>
                        <p className="text-xs text-gray-500">{ficha.instrutor} · Criada em {new Date(ficha.criado).toLocaleDateString("pt-BR")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs">
                        {ficha.objetivo}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-gray-500">
                        <Edit className="h-3.5 w-3.5" /> Editar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {ficha.treinos.map((treino, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-3">
                        <p className="text-xs font-semibold text-indigo-700 mb-2">{treino.dia}</p>
                        <ul className="space-y-1">
                          {treino.exercicios.map((ex, j) => (
                            <li key={j} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <span className="w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-[10px] mt-0.5">{j + 1}</span>
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {fichasFiltradas.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <ClipboardList className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhuma ficha encontrada</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Banco tab */}
        <TabsContent value="banco" className="mt-4">
          <div className="space-y-2">
            {exerciciosBanco.map((grupo) => (
              <Card key={grupo.grupo} className="border-0 shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenGrupo(openGrupo === grupo.grupo ? null : grupo.grupo)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-indigo-100 rounded-lg">
                      <Dumbbell className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="font-semibold text-sm text-gray-900">{grupo.grupo}</span>
                    <Badge variant="outline" className="text-xs bg-gray-50 text-gray-500 border-gray-200">
                      {grupo.exercicios.length} exercícios
                    </Badge>
                  </div>
                  {openGrupo === grupo.grupo ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                </button>
                {openGrupo === grupo.grupo && (
                  <div className="px-5 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {grupo.exercicios.map((ex) => (
                        <div key={ex} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Instrutores tab */}
        <TabsContent value="instrutores" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {instrutores.map((inst) => (
              <Card key={inst.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-indigo-600 text-white font-bold">{inst.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{inst.nome}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{inst.especialidade}</p>
                    <Badge variant="outline" className="mt-2 text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                      Ativo
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
