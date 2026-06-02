-- ============================================================
-- SmartGym Admin — Schema inicial
-- ============================================================

-- ALUNOS
create table if not exists public.alunos (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  email       text not null unique,
  telefone    text,
  plano       text not null,
  status      text not null check (status in ('ativo','inativo','inadimplente')),
  vencimento  date not null,
  avatar      text,
  ingresso    date,
  nascimento  date,
  cpf         text unique,
  peso        text,
  altura      text,
  created_at  timestamptz default now()
);

-- PLANOS
create table if not exists public.planos (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null unique,
  preco       numeric(10,2) not null,
  duracao     integer not null,
  descricao   text,
  created_at  timestamptz default now()
);

-- PAGAMENTOS
create table if not exists public.pagamentos (
  id          uuid primary key default gen_random_uuid(),
  aluno       text not null,
  plano       text not null,
  valor       numeric(10,2) not null,
  status      text not null check (status in ('pago','pendente','vencido')),
  data        date not null,
  metodo      text,
  created_at  timestamptz default now()
);

-- ACESSOS
create table if not exists public.acessos (
  id          uuid primary key default gen_random_uuid(),
  aluno       text not null,
  avatar      text,
  hora        text,
  data        text,
  tipo        text check (tipo in ('entrada','saída')),
  status      text check (status in ('liberado','bloqueado')),
  created_at  timestamptz default now()
);

-- AULAS
create table if not exists public.aulas (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  instrutor   text not null,
  horario     text,
  duracao     text,
  vagas       integer,
  inscritos   integer default 0,
  dias        text[],
  created_at  timestamptz default now()
);

-- INSTRUTORES
create table if not exists public.instrutores (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  especialidade text,
  avatar        text,
  created_at    timestamptz default now()
);

-- FICHAS DE TREINO
create table if not exists public.fichas (
  id          uuid primary key default gen_random_uuid(),
  aluno       text not null,
  instrutor   text,
  criado      date,
  objetivo    text,
  treinos     jsonb default '[]',
  created_at  timestamptz default now()
);

-- ============================================================
-- RLS — habilita e permite leitura pública (totem)
-- ============================================================
alter table public.alunos     enable row level security;
alter table public.planos     enable row level security;
alter table public.pagamentos enable row level security;
alter table public.acessos    enable row level security;
alter table public.aulas      enable row level security;
alter table public.instrutores enable row level security;
alter table public.fichas     enable row level security;

-- Leitura pública (anon) para o totem
create policy "anon_read_alunos"      on public.alunos     for select using (true);
create policy "anon_read_planos"      on public.planos     for select using (true);
create policy "anon_read_pagamentos"  on public.pagamentos for select using (true);
create policy "anon_read_acessos"     on public.acessos    for select using (true);
create policy "anon_read_aulas"       on public.aulas      for select using (true);
create policy "anon_read_instrutores" on public.instrutores for select using (true);
create policy "anon_read_fichas"      on public.fichas     for select using (true);

-- Inserção pública para checkin do totem
create policy "anon_insert_acessos" on public.acessos for insert with check (true);
