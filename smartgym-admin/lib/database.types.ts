export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      alunos: {
        Row: {
          id: string
          nome: string
          email: string
          telefone: string
          plano: string
          status: "ativo" | "inativo" | "inadimplente"
          vencimento: string
          avatar: string
          ingresso: string
          nascimento: string
          cpf: string
          peso: string | null
          altura: string | null
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["alunos"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["alunos"]["Insert"]>
      }
      planos: {
        Row: {
          id: string
          nome: string
          preco: number
          duracao: number
          descricao: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["planos"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["planos"]["Insert"]>
      }
      pagamentos: {
        Row: {
          id: string
          aluno: string
          plano: string
          valor: number
          status: "pago" | "pendente" | "vencido"
          data: string
          metodo: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["pagamentos"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["pagamentos"]["Insert"]>
      }
      acessos: {
        Row: {
          id: string
          aluno: string
          avatar: string
          hora: string
          data: string
          tipo: "entrada" | "saída"
          status: "liberado" | "bloqueado"
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["acessos"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["acessos"]["Insert"]>
      }
      aulas: {
        Row: {
          id: string
          nome: string
          instrutor: string
          horario: string
          duracao: string
          vagas: number
          inscritos: number
          dias: string[]
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["aulas"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["aulas"]["Insert"]>
      }
      instrutores: {
        Row: {
          id: string
          nome: string
          especialidade: string
          avatar: string
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["instrutores"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["instrutores"]["Insert"]>
      }
      fichas: {
        Row: {
          id: string
          aluno: string
          instrutor: string
          criado: string
          objetivo: string
          treinos: Json
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["fichas"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["fichas"]["Insert"]>
      }
    }
  }
}
