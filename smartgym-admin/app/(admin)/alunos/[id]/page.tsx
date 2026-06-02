"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft, Mail, Phone, Calendar, CreditCard, ShieldCheck,
  Dumbbell, Edit, Ban, CheckCircle2, QrCode,
} from "lucide-react"
import {
  getAlunoById, getPagamentosByAluno, getAcessosByAluno, getFichaByAluno,
  type Aluno, type Pagamento, type Acesso, type FichaRow,
} from "@/lib/db"

const statusConfig: Record<string, { label: string; className: string }> = {
  ativo:        { label: "Ativo",        className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  inadimplente: { label: "Inadimplente", className: "bg-red-50 text-red-700 border-red-200" },
  inativo:      { label: "Inativo",      className: "bg-gray-100 text-gray-600 border-gray-200" },
}

export default function AlunoPerfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([])
  const [acessos, setAcessos] = useState<Acesso[]>([])
  const [ficha, setFicha] = useState<FichaRow | null>(null)

  useEffect(() => {
    getAlunoById(id).then(async (a) => {
      if (a) {
        setAluno(a)
        const [pags, acs, fich] = await Promise.all([
          getPagamentosByAluno(a.nome),
          getAcessosByAluno(a.nome),
          getFichaByAluno(a.nome),
        ])
        setPagamentos(pags)
        setAcessos(acs)
        setFicha(fich)
      }
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-64">
      <p className="text-gray-400 text-sm">Carregando...</p>
    </div>
  )

  if (!aluno) return notFound()

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/alunos">
          <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        </Link>
      </div>

      {/* Profile header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-indigo-600 text-white text-2xl font-bold">{aluno.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{aluno.nome}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{aluno.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{aluno.telefone}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />Aluno desde {new Date(aluno.ingresso).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="outline" className={statusConfig[aluno.status].className}>
                      {statusConfig[aluno.status].label}
                    </Badge>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      {aluno.plano}
                    </Badge>
                    <span className="text-xs text-gray-400">Vence em {new Date(aluno.vencimento).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <QrCode className="h-4 w-4" /> QR Code
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="h-4 w-4" /> Editar
                  </Button>
                  {aluno.status === "ativo" ? (
                    <Button variant="outline" size="sm" className="gap-2 text-red-600 border-red-200 hover:bg-red-50">
                      <Ban className="h-4 w-4" /> Bloquear
                    </Button>
                  ) : (
                    <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Reativar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info + Tabs */}
      <div className="grid grid-cols-4 gap-6">
        {/* Side info */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2.5 text-sm">
              <div><p className="text-xs text-gray-400">CPF</p><p className="font-medium text-gray-800">{aluno.cpf}</p></div>
              <div><p className="text-xs text-gray-400">Nascimento</p><p className="font-medium text-gray-800">{new Date(aluno.nascimento).toLocaleDateString("pt-BR")}</p></div>
              <div><p className="text-xs text-gray-400">Peso</p><p className="font-medium text-gray-800">{aluno.peso}</p></div>
              <div><p className="text-xs text-gray-400">Altura</p><p className="font-medium text-gray-800">{aluno.altura}</p></div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Plano Atual</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2.5 text-sm">
              <div><p className="text-xs text-gray-400">Plano</p><p className="font-medium text-gray-800">{aluno.plano}</p></div>
              <div><p className="text-xs text-gray-400">Vencimento</p><p className={`font-medium ${aluno.status !== "ativo" ? "text-red-500" : "text-gray-800"}`}>{new Date(aluno.vencimento).toLocaleDateString("pt-BR")}</p></div>
              <Button size="sm" className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-xs">Renovar Plano</Button>
            </CardContent>
          </Card>
        </div>

        {/* Main tabs */}
        <div className="col-span-3">
          <Tabs defaultValue="pagamentos">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="pagamentos" className="gap-2 text-xs">
                <CreditCard className="h-3.5 w-3.5" /> Financeiro
              </TabsTrigger>
              <TabsTrigger value="acessos" className="gap-2 text-xs">
                <ShieldCheck className="h-3.5 w-3.5" /> Acessos
              </TabsTrigger>
              <TabsTrigger value="treinos" className="gap-2 text-xs">
                <Dumbbell className="h-3.5 w-3.5" /> Treinos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pagamentos" className="mt-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Plano", "Valor", "Método", "Data", "Status"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pagamentos.length > 0 ? pagamentos.map((p) => (
                        <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{p.plano}</td>
                          <td className="px-4 py-3 text-gray-700">R$ {p.valor.toFixed(2)}</td>
                          <td className="px-4 py-3 text-gray-500">{p.metodo}</td>
                          <td className="px-4 py-3 text-gray-500">{new Date(p.data).toLocaleDateString("pt-BR")}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-xs ${
                              p.status === "pago" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              p.status === "vencido" ? "bg-red-50 text-red-700 border-red-200" :
                              "bg-amber-50 text-amber-700 border-amber-200"
                            }`}>{p.status}</Badge>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={5} className="text-center py-8 text-gray-400 text-xs">Sem histórico de pagamentos</td></tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="acessos" className="mt-4">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Data", "Horário", "Tipo", "Status"].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {acessos.length > 0 ? acessos.map((a) => (
                        <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">{a.data}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{a.hora}</td>
                          <td className="px-4 py-3 text-gray-500 capitalize">{a.tipo}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-xs ${a.status === "liberado" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                              {a.status}
                            </Badge>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={4} className="text-center py-8 text-gray-400 text-xs">Sem registros de acesso</td></tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="treinos" className="mt-4">
              {ficha ? (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm font-semibold text-gray-900">Ficha de Treino — {ficha.objetivo}</CardTitle>
                        <p className="text-xs text-gray-400 mt-1">Instrutor: {ficha.instrutor} · Criada em {new Date(ficha.criado).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs gap-1.5">
                        <Edit className="h-3.5 w-3.5" /> Editar Ficha
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {ficha.treinos.map((treino, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-indigo-700 mb-3">{treino.dia}</h3>
                        <ul className="space-y-1.5">
                          {treino.exercicios.map((ex, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-gray-700">
                              <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">{j + 1}</span>
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-sm">
                  <CardContent className="py-12 text-center">
                    <Dumbbell className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 mb-4">Nenhuma ficha de treino cadastrada</p>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>
                      Criar Ficha
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
