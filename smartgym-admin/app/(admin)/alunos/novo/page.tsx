"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Loader2, UserPlus } from "lucide-react"
import { toast } from "sonner"

export default function NovoAlunoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success("Aluno cadastrado com sucesso!")
      router.push("/alunos")
    }, 1200)
  }

  return (
    <div className="p-8 space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/alunos">
          <Button variant="ghost" size="sm" className="gap-2 text-gray-500">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 rounded-xl">
          <UserPlus className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Aluno</h1>
          <p className="text-sm text-gray-500">Preencha os dados para cadastrar um novo aluno</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Nome Completo *</Label>
                <Input placeholder="Ex: João Silva" required className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">CPF *</Label>
                <Input placeholder="000.000.000-00" required className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Data de Nascimento</Label>
                <Input type="date" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">E-mail *</Label>
                <Input type="email" placeholder="email@exemplo.com" required className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Telefone / WhatsApp</Label>
                <Input placeholder="(11) 99999-0000" className="h-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Plano & Matrícula</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Plano *</Label>
                <Select required>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basico">Mensal Básico — R$ 89,90</SelectItem>
                    <SelectItem value="premium">Mensal Premium — R$ 129,90</SelectItem>
                    <SelectItem value="trimestral">Trimestral — R$ 329,90</SelectItem>
                    <SelectItem value="anual">Anual — R$ 999,90</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Forma de Pagamento</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Data de Início</Label>
                <Input type="date" className="h-10" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Instrutor Responsável</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Selecione (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Prof. Marcelo Santos</SelectItem>
                    <SelectItem value="2">Prof. Carla Lima</SelectItem>
                    <SelectItem value="3">Prof. André Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-700">Dados Físicos (opcional)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Peso (kg)</Label>
                <Input placeholder="Ex: 75" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Altura (cm)</Label>
                <Input placeholder="Ex: 175" className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">Objetivo</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                    <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                    <SelectItem value="condicionamento">Condicionamento</SelectItem>
                    <SelectItem value="saude">Saúde / Bem-estar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/alunos">
            <Button type="button" variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 gap-2 px-6" disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Salvando...</> : <><Save className="h-4 w-4" /> Cadastrar Aluno</>}
          </Button>
        </div>
      </form>
    </div>
  )
}
