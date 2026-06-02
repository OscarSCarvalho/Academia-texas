"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign, TrendingUp, AlertTriangle, CreditCard,
  Search, Download, Plus, CheckCircle2, Clock,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts"
import { mockPagamentos, mockPlanos, mockRevenueData } from "@/lib/mock-data"

const statusConfig: Record<string, { label: string; className: string }> = {
  pago:     { label: "Pago",     className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  vencido:  { label: "Vencido",  className: "bg-red-50 text-red-700 border-red-200" },
  pendente: { label: "Pendente", className: "bg-amber-50 text-amber-700 border-amber-200" },
}

const pieData = [
  { name: "Mensal Premium", value: 45, color: "#6366f1" },
  { name: "Trimestral", value: 25, color: "#10b981" },
  { name: "Anual", value: 20, color: "#f59e0b" },
  { name: "Mensal Básico", value: 10, color: "#94a3b8" },
]

export default function FinanceiroPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filtered = mockPagamentos.filter((p) => {
    const matchSearch = p.aluno.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "todos" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalRecebido = mockPagamentos.filter(p => p.status === "pago").reduce((s, p) => s + p.valor, 0)
  const totalVencido = mockPagamentos.filter(p => p.status === "vencido").reduce((s, p) => s + p.valor, 0)
  const totalPendente = mockPagamentos.filter(p => p.status === "pendente").reduce((s, p) => s + p.valor, 0)

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-500 text-sm mt-1">Cobranças, planos e relatórios financeiros</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Exportar DRE
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus className="h-4 w-4" /> Nova Cobrança
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Receita do Mês", value: `R$ ${totalRecebido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: DollarSign, color: "bg-emerald-500", change: "+8,2%" },
          { label: "A Receber", value: `R$ ${totalPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: Clock, color: "bg-amber-500", change: "pendente" },
          { label: "Inadimplência", value: `R$ ${totalVencido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, icon: AlertTriangle, color: "bg-red-500", change: "vencido" },
          { label: "Ticket Médio", value: "R$ 154,50", icon: TrendingUp, color: "bg-indigo-500", change: "+3,1%" },
        ].map((k) => (
          <Card key={k.label} className="border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 ${k.color} rounded-xl`}>
                <k.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{k.label}</p>
                <p className="text-xl font-bold text-gray-900">{k.value}</p>
                <p className="text-xs text-gray-400">{k.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Receita x Meta (6 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR")}`} />
                <Legend />
                <Area type="monotone" dataKey="receita" stroke="#6366f1" fill="url(#r2)" strokeWidth={2} name="Receita" />
                <Area type="monotone" dataKey="meta" stroke="#10b981" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Meta" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Distribuição de Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend iconSize={8} formatter={(v) => <span className="text-xs text-gray-600">{v}</span>} />
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: pagamentos e planos */}
      <Tabs defaultValue="pagamentos">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="pagamentos" className="text-xs gap-2">
            <CreditCard className="h-3.5 w-3.5" /> Cobranças
          </TabsTrigger>
          <TabsTrigger value="planos" className="text-xs gap-2">
            <CheckCircle2 className="h-3.5 w-3.5" /> Planos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pagamentos" className="mt-4 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar aluno..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "todos")}>
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pago">Pagos</SelectItem>
                  <SelectItem value="vencido">Vencidos</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {["Aluno", "Plano", "Valor", "Método", "Data", "Status", ""].map(h => (
                      <TableHead key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id} className="hover:bg-gray-50">
                      <TableCell className="px-4 font-medium text-gray-900 text-sm">{p.aluno}</TableCell>
                      <TableCell className="px-4 text-sm text-gray-600">{p.plano}</TableCell>
                      <TableCell className="px-4 text-sm font-semibold text-gray-900">R$ {p.valor.toFixed(2)}</TableCell>
                      <TableCell className="px-4 text-sm text-gray-500">{p.metodo}</TableCell>
                      <TableCell className="px-4 text-sm text-gray-500">{new Date(p.data).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell className="px-4">
                        <Badge variant="outline" className={`text-xs ${statusConfig[p.status].className}`}>
                          {statusConfig[p.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4">
                        {p.status !== "pago" && (
                          <Button size="sm" variant="ghost" className="text-xs text-indigo-600 hover:bg-indigo-50 h-7">
                            Cobrar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planos" className="mt-4">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {mockPlanos.map((plano) => (
              <Card key={plano.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">{plano.nome}</h3>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </Button>
                  </div>
                  <p className="text-2xl font-black text-indigo-600 mb-1">
                    R$ {plano.preco.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{plano.duracao} dias · {plano.descricao}</p>
                  <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-600 border-indigo-200">
                    Ativo
                  </Badge>
                </CardContent>
              </Card>
            ))}
            <Card className="border-0 shadow-sm border-dashed border-2 border-gray-200 hover:border-indigo-300 transition-colors cursor-pointer">
              <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center py-8">
                <div className="p-2 bg-gray-100 rounded-xl mb-2">
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500">Novo Plano</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
