import { supabase } from "./supabase"
import type { Database } from "./database.types"

export type Aluno = Database["public"]["Tables"]["alunos"]["Row"]
export type Plano = Database["public"]["Tables"]["planos"]["Row"]
export type Pagamento = Database["public"]["Tables"]["pagamentos"]["Row"]
export type Acesso = Database["public"]["Tables"]["acessos"]["Row"]
export type Aula = Database["public"]["Tables"]["aulas"]["Row"]
export type Instrutor = Database["public"]["Tables"]["instrutores"]["Row"]
export type TreinoItem = { dia: string; exercicios: string[] }
export type FichaRow = Omit<Database["public"]["Tables"]["fichas"]["Row"], "treinos"> & {
  treinos: TreinoItem[]
}

export async function getAlunos(): Promise<Aluno[]> {
  const { data } = await supabase.from("alunos").select("*").order("nome")
  return data ?? []
}

export async function getAlunoById(id: string): Promise<Aluno | null> {
  const { data } = await supabase.from("alunos").select("*").eq("id", id).single()
  return data ?? null
}

export async function getAlunoByCpf(cpf: string): Promise<Aluno | null> {
  const { data } = await supabase.from("alunos").select("*").eq("cpf", cpf).single()
  return data ?? null
}

export async function getPlanos(): Promise<Plano[]> {
  const { data } = await supabase.from("planos").select("*").order("preco")
  return data ?? []
}

export async function getPagamentos(): Promise<Pagamento[]> {
  const { data } = await supabase.from("pagamentos").select("*").order("data", { ascending: false })
  return data ?? []
}

export async function getPagamentosByAluno(aluno: string): Promise<Pagamento[]> {
  const { data } = await supabase.from("pagamentos").select("*").eq("aluno", aluno).order("data", { ascending: false })
  return data ?? []
}

export async function getAcessos(limit = 20): Promise<Acesso[]> {
  const { data } = await supabase.from("acessos").select("*").order("created_at", { ascending: false }).limit(limit)
  return data ?? []
}

export async function getAcessosByAluno(aluno: string): Promise<Acesso[]> {
  const { data } = await supabase.from("acessos").select("*").eq("aluno", aluno).order("created_at", { ascending: false })
  return data ?? []
}

export async function getAulas(): Promise<Aula[]> {
  const { data } = await supabase.from("aulas").select("*").order("horario")
  return data ?? []
}

export async function getInstrutores(): Promise<Instrutor[]> {
  const { data } = await supabase.from("instrutores").select("*").order("nome")
  return data ?? []
}

export async function getFichas(): Promise<FichaRow[]> {
  const { data } = await supabase.from("fichas").select("*")
  return (data ?? []) as unknown as FichaRow[]
}

export async function getFichaByAluno(aluno: string): Promise<FichaRow | null> {
  const { data } = await supabase.from("fichas").select("*").eq("aluno", aluno).single()
  return data ? (data as unknown as FichaRow) : null
}
