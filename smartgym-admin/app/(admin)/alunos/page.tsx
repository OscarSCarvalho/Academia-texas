"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, Download, Eye, UserCheck, UserX, Users } from "lucide-react"
import { getAlunos, type Aluno } from "@/lib/db"

const statusConfig: Record<string, { label: string; className: string }> = {
  ativo:        { label: "Ativo",        className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  inadimplente: { label: "Inadimplente", className: "bg-red-50 text-red-700 border-red-200" },
  inativo:      { label: "Inativo",      className: "bg-gray-100 text-gray-600 border-gray-200" },
}

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")

  useEffect(() => { getAlunos().then(setAlunos) }, [])

  const filtered = alunos.filter((a) => {
    const matchSearch = a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "todos" || a.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalAtivos = alunos.filter(a => a.status === "ativo").length
  const totalInadimplentes = alunos.filter(a => a.status === "inadimplente").length
  const totalInativos = alunos.filter(a => a.status === "inativo").length

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
          <p className="text-gray-500 text-sm mt-1">{alunos.length} alunos cadastrados</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
          <Link href="/alunos/novo">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
              <Plus className="h-4 w-4" /> Novo Aluno
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total", value: alunos.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Ativos", value: totalAtivos, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Inadimplentes", value: totalInadimplentes, icon: UserX, color: "text-red-600", bg: "bg-red-50" },
          { label: "Inativos", value: totalInativos, icon: UserX, color: "text-gray-500", bg: "bg-gray-100" },
        ].map((s) => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              className="pl-9 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "todos")}>
            <SelectTrigger className="w-40 h-9">
              <Filter className="h-3.5 w-3.5 mr-2 text-gray-400" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="inadimplente">Inadimplentes</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-44 h-9">
              <SelectValue placeholder="Plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os planos</SelectItem>
              <SelectItem value="basico">Mensal Básico</SelectItem>
              <SelectItem value="premium">Mensal Premium</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="pl-6 text-xs font-semibold text-gray-500 uppercase tracking-wide">Aluno</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Plano</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Vencimento</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ingresso</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((aluno) => (
                <TableRow key={aluno.id} className="hover:bg-gray-50">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">{aluno.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{aluno.nome}</p>
                        <p className="text-xs text-gray-500">{aluno.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{aluno.plano}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${statusConfig[aluno.status].className}`}>
                      {statusConfig[aluno.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${aluno.status !== "ativo" ? "text-red-500 font-medium" : "text-gray-700"}`}>
                      {new Date(aluno.vencimento).toLocaleDateString("pt-BR")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {new Date(aluno.ingresso).toLocaleDateString("pt-BR")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Link href={`/alunos/${aluno.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7 text-xs">
                        <Eye className="h-3.5 w-3.5" /> Ver perfil
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum aluno encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
