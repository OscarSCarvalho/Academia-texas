# SmartGym Admin

Sistema de gestão para academias com painel administrativo completo e totem de autoatendimento. Construído com Next.js 16, React 19, TypeScript e Supabase.

## Visão Geral

O SmartGym Admin é dividido em duas experiências:

- **Painel Admin** — gestão de alunos, financeiro, treinos, agendamentos e controle de acesso em tempo real
- **Totem de Autoatendimento** — interface touch para check-in, cadastro de novos alunos e consulta de fichas de treino, com suporte a PT / EN / ES

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2 (App Router + Turbopack) |
| UI | React 19 + TypeScript |
| Estilização | Tailwind CSS v4 |
| Componentes | shadcn/ui + Tabler Icons + Lucide |
| Banco de dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth (RLS habilitado) |
| Gráficos | Recharts |
| Animações | Framer Motion |

## Funcionalidades

### Painel Admin (`/`)
- **Dashboard** — KPIs, gráfico de receita mensal, feed de acessos recentes, alertas e inadimplentes
- **Alunos** — listagem, filtros por status/plano, busca, perfil individual com histórico financeiro, acessos e ficha de treino
- **Controle de Acesso** — feed ao vivo de entradas/saídas com atualização em tempo real, gráfico de pico de horários
- **Financeiro** — cobranças, status de pagamentos, gestão de planos, gráfico receita x meta
- **Treinos** — fichas de treino por aluno, banco de exercícios por grupo muscular, gestão de instrutores
- **Agendamentos** — grade semanal de aulas em grupo, controle de vagas e inscritos

### Totem (`/totem`)
- **Check-in** — via QR Code (simulado) ou CPF digitado; busca aluno no banco e libera ou bloqueia acesso
- **Cadastro** — fluxo de 3 etapas: escolha do plano → dados pessoais → pagamento
- **Meus Treinos** — busca por CPF e exibe ficha de treino completa
- **Multi-idioma** — PT 🇧🇷 / EN 🇺🇸 / ES 🇪🇸 com persistência via localStorage

## Estrutura do Projeto

```
smartgym-admin/
├── app/
│   ├── (admin)/          # Painel administrativo
│   │   ├── dashboard/
│   │   ├── alunos/
│   │   ├── acesso/
│   │   ├── financeiro/
│   │   ├── treinos/
│   │   └── agendamentos/
│   └── (totem)/          # Totem de autoatendimento
│       ├── totem/
│       │   ├── checkin/
│       │   ├── cadastro/
│       │   └── treinos/
│       ├── language-context.tsx
│       ├── lang-switcher.tsx
│       └── translations.ts
├── lib/
│   ├── supabase.ts        # Client Supabase
│   ├── db.ts              # Funções de consulta ao banco
│   ├── database.types.ts  # Tipos TypeScript das tabelas
│   └── mock-data.ts       # Dados estáticos (gráficos)
└── supabase/
    └── migration_completa.sql  # Schema + seed completo
```

## Banco de Dados

7 tabelas no Supabase com RLS habilitado:

| Tabela | Descrição |
|---|---|
| `alunos` | Cadastro de alunos |
| `planos` | Planos disponíveis |
| `pagamentos` | Histórico de cobranças |
| `acessos` | Registro de entradas/saídas |
| `aulas` | Aulas em grupo |
| `instrutores` | Cadastro de instrutores |
| `fichas` | Fichas de treino (treinos em JSONB) |

## Instalação

### Pré-requisitos
- Node.js 18+
- Conta no [Supabase](https://supabase.com)

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/OscarSCarvalho/Academia-texas.git
cd smartgym-admin
npm install
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

### 3. Criar o banco de dados

No [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql/new), cole e execute o conteúdo de:

```
supabase/migration_completa.sql
```

Esse arquivo cria todas as tabelas, habilita RLS, configura as políticas de acesso e insere os dados de exemplo.

### 4. Iniciar o servidor

```bash
npm run dev
```

Acesse:
- **Admin:** http://localhost:3000
- **Totem:** http://localhost:3000/totem

## Modos de Execução

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificação de código |

No Windows, use o `iniciar-totem.bat` para abrir o totem direto no navegador em modo quiosque.

## Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Chave pública (anon key) do Supabase |

## Integrando um Agente de IA

O projeto está preparado para receber um agente Claude. Instale o SDK e crie uma rota:

```bash
npm install @anthropic-ai/sdk
```

```env
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
```

```ts
// app/api/agent/route.ts
import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: message }],
  })
  const content = response.content[0]
  if (content.type === "text") return NextResponse.json({ reply: content.text })
}
```

## Licença

MIT
