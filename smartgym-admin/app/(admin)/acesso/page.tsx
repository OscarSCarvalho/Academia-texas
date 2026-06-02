"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ShieldCheck, ShieldX, Users, TrendingUp, QrCode, Search, LogIn, LogOut } from "lucide-react"
import { mockAcessos, mockAcessoHoraData } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

export default function AcessoPage() {
  const [acessos, setAcessos] = useState(mockAcessos)
  const [pulsingId, setPulsingId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  // Simula novo acesso chegando
  useEffect(() => {
    const interval = setInterval(() => {
      const novos = [
        { id: String(Date.now()), aluno: "Amanda Costa", avatar: "AC", hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), data: "Hoje", tipo: "entrada", status: "liberado" },
        { id: String(Date.now()), aluno: "Beatriz Souza", avatar: "BS", hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), data: "Hoje", tipo: "saída", status: "liberado" },
      ]
      const novo = novos[Math.floor(Math.random() * novos.length)]
      setPulsingId(novo.id)
      setAcessos(prev => [novo, ...prev.slice(0, 19)])
      setTimeout(() => setPulsingId(null), 2000)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const filtered = acessos.filter(a =>
    a.aluno.toLowerCase().includes(search.toLowerCase())
  )

  const totalHoje = acessos.length
  const entradas = acessos.filter(a => a.tipo === "entrada").length
  const bloqueados = acessos.filter(a => a.status === "bloqueado").length

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Controle de Acesso</h1>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Ao Vivo
            </Badge>
          </div>
          <p className="text-gray-500 text-sm mt-1">Monitoramento em tempo real de entradas e saídas</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <QrCode className="h-4 w-4" /> Check-in Manual
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Acessos Hoje", value: totalHoje, icon: Users, color: "bg-indigo-500" },
          { label: "Na Academia Agora", value: "12", icon: TrendingUp, color: "bg-emerald-500" },
          { label: "Entradas", value: entradas, icon: LogIn, color: "bg-sky-500" },
          { label: "Bloqueados", value: bloqueados, icon: ShieldX, color: "bg-red-500" },
        ].map((k) => (
          <Card key={k.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 ${k.color} rounded-xl`}>
                <k.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{k.value}</p>
                <p className="text-xs text-gray-500">{k.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Live feed */}
        <div className="col-span-2 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Feed de Acessos</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input placeholder="Filtrar aluno..." className="pl-8 h-8 w-52 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto">
                {filtered.map((acesso) => (
                  <div
                    key={acesso.id}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-all ${
                      acesso.id === pulsingId ? "bg-indigo-50 border-l-4 border-indigo-400" : "hover:bg-gray-50"
                    }`}
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className={`text-xs font-bold ${
                        acesso.status === "bloqueado" ? "bg-red-100 text-red-700" : "bg-indigo-100 text-indigo-700"
                      }`}>{acesso.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{acesso.aluno}</p>
                      <p className="text-xs text-gray-400">{acesso.data} · {acesso.hora}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs gap-1 ${
                        acesso.tipo === "entrada"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}>
                        {acesso.tipo === "entrada" ? <LogIn className="h-3 w-3" /> : <LogOut className="h-3 w-3" />}
                        {acesso.tipo}
                      </Badge>
                      {acesso.status === "liberado" ? (
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <ShieldX className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    {acesso.status === "bloqueado" && (
                      <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                        Bloqueado — inadimplente
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Pico de Horários</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={mockAcessoHoraData.slice(1, 13)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="hora" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="acessos" fill="#6366f1" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Acesso Rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <QrCode className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500 font-medium">Escanear QR Code</p>
                <p className="text-xs text-gray-400 mt-0.5">Aponte a câmera para o QR do aluno</p>
                <Button size="sm" className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-xs">
                  Abrir Scanner
                </Button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Buscar por nome / CPF</p>
                <Input placeholder="Digite o nome ou CPF..." className="h-8 text-xs mb-2" />
                <Button size="sm" variant="outline" className="w-full text-xs">Verificar Acesso</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
