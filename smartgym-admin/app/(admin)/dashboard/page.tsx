"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users, DollarSign, TrendingUp, TrendingDown, ShieldCheck,
  AlertTriangle, UserCheck, Activity, ArrowUpRight,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts"
import { mockRevenueData, mockAcessoHoraData } from "@/lib/mock-data"
import { getAcessos, getAlunos, type Acesso, type Aluno } from "@/lib/db"

const kpis = [
  { label: "Alunos Ativos", value: "248", change: "+12", up: true, icon: Users, color: "bg-indigo-500", light: "bg-indigo-50 text-indigo-600" },
  { label: "Receita do Mês", value: "R$ 15.200", change: "+8,2%", up: true, icon: DollarSign, color: "bg-emerald-500", light: "bg-emerald-50 text-emerald-600" },
  { label: "Inadimplentes", value: "14", change: "+2", up: false, icon: AlertTriangle, color: "bg-red-500", light: "bg-red-50 text-red-600" },
  { label: "Check-ins Hoje", value: "67", change: "+5 vs ontem", up: true, icon: ShieldCheck, color: "bg-violet-500", light: "bg-violet-50 text-violet-600" },
  { label: "Novos Alunos", value: "8", change: "este mês", up: true, icon: UserCheck, color: "bg-sky-500", light: "bg-sky-50 text-sky-600" },
  { label: "Taxa de Retenção", value: "87%", change: "+1,4%", up: true, icon: Activity, color: "bg-amber-500", light: "bg-amber-50 text-amber-600" },
]

const alertas = [
  { tipo: "danger", msg: "Roberto Nascimento — inadimplente há 32 dias", acao: "Cobrar" },
  { tipo: "danger", msg: "Marcos Pereira — plano vencido há 32 dias", acao: "Contatar" },
  { tipo: "warning", msg: "Aula de Funcional 08h — vagas esgotadas (25/25)", acao: "Ver" },
  { tipo: "warning", msg: "Pedro Almeida — boleto vence amanhã", acao: "Notificar" },
  { tipo: "info", msg: "5 alunos sem ficha de treino atualizada", acao: "Ver" },
]

export default function DashboardPage() {
  const [acessos, setAcessos] = useState<Acesso[]>([])
  const [alunos, setAlunos] = useState<Aluno[]>([])

  useEffect(() => {
    getAcessos(6).then(setAcessos)
    getAlunos().then(setAlunos)
  }, [])

  const inadimplentes = alunos.filter(a => a.status === "inadimplente" || a.status === "inativo")

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Domingo, 1 de Junho de 2026 · Academia Central</p>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1.5 text-xs font-semibold">
          <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-2 animate-pulse" />
          Sistema Online
        </Badge>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">{k.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                  <div className={`inline-flex items-center gap-1 text-xs font-medium mt-1.5 px-2 py-0.5 rounded-full ${k.light}`}>
                    {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {k.change}
                  </div>
                </div>
                <div className={`p-2.5 ${k.color} rounded-xl`}>
                  <k.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-6">
        <Card className="col-span-3 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-900">Receita Mensal</CardTitle>
              <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200 bg-emerald-50">+8,2% vs meta</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="rec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`R$ ${Number(v).toLocaleString("pt-BR")}`, ""]} />
                <Legend />
                <Area type="monotone" dataKey="receita" stroke="#6366f1" fill="url(#rec)" strokeWidth={2} name="Receita" />
                <Area type="monotone" dataKey="meta" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-900">Acessos por Horário (Hoje)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mockAcessoHoraData.filter((_, i) => i % 2 === 0)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="hora" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="acessos" fill="#6366f1" radius={[4, 4, 0, 0]} name="Acessos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Últimos acessos */}
        <Card className="col-span-1 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Últimos Acessos</CardTitle>
              <a href="/acesso" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                Ver todos <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {acessos.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs bg-indigo-100 text-indigo-700 font-bold">{a.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{a.aluno}</p>
                  <p className="text-xs text-gray-400">{a.hora}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs px-1.5 py-0 ${a.status === "liberado" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}
                >
                  {a.tipo}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card className="col-span-1 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Alertas & Pendências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {alertas.map((a, i) => (
              <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs ${
                a.tipo === "danger" ? "bg-red-50 border border-red-100" :
                a.tipo === "warning" ? "bg-amber-50 border border-amber-100" :
                "bg-blue-50 border border-blue-100"
              }`}>
                <AlertTriangle className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
                  a.tipo === "danger" ? "text-red-500" :
                  a.tipo === "warning" ? "text-amber-500" : "text-blue-500"
                }`} />
                <span className="flex-1 text-gray-700 leading-relaxed">{a.msg}</span>
                <button className={`font-semibold flex-shrink-0 ${
                  a.tipo === "danger" ? "text-red-600" :
                  a.tipo === "warning" ? "text-amber-600" : "text-blue-600"
                }`}>{a.acao}</button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Inadimplentes */}
        <Card className="col-span-1 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Inadimplentes / Inativos</CardTitle>
              <Badge className="bg-red-50 text-red-600 border-red-200 text-xs">{inadimplentes.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {inadimplentes.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-red-100 text-red-700 font-bold">{a.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate">{a.nome}</p>
                  <p className="text-xs text-gray-400">{a.plano}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${a.status === "inadimplente" ? "bg-red-50 text-red-600 border-red-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                >
                  {a.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
