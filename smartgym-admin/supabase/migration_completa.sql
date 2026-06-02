-- ============================================================
-- SmartGym Admin — Migration + Seed completo
-- Cole tudo isso no SQL Editor do Supabase e clique RUN
-- https://supabase.com/dashboard/project/xsvtmyrnxkovysdigocs/sql/new
-- ============================================================

-- TABELAS
create table if not exists public.alunos (
  id uuid primary key default gen_random_uuid(),
  nome text not null, email text not null unique, telefone text,
  plano text not null, status text not null check (status in ('ativo','inativo','inadimplente')),
  vencimento date not null, avatar text, ingresso date, nascimento date,
  cpf text unique, peso text, altura text, created_at timestamptz default now()
);
create table if not exists public.planos (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique, preco numeric(10,2) not null,
  duracao integer not null, descricao text, created_at timestamptz default now()
);
create table if not exists public.pagamentos (
  id uuid primary key default gen_random_uuid(),
  aluno text not null, plano text not null, valor numeric(10,2) not null,
  status text not null check (status in ('pago','pendente','vencido')),
  data date not null, metodo text, created_at timestamptz default now()
);
create table if not exists public.acessos (
  id uuid primary key default gen_random_uuid(),
  aluno text not null, avatar text, hora text, data text,
  tipo text check (tipo in ('entrada','saída')),
  status text check (status in ('liberado','bloqueado')), created_at timestamptz default now()
);
create table if not exists public.aulas (
  id uuid primary key default gen_random_uuid(),
  nome text not null, instrutor text not null, horario text, duracao text,
  vagas integer, inscritos integer default 0, dias text[], created_at timestamptz default now()
);
create table if not exists public.instrutores (
  id uuid primary key default gen_random_uuid(),
  nome text not null, especialidade text, avatar text, created_at timestamptz default now()
);
create table if not exists public.fichas (
  id uuid primary key default gen_random_uuid(),
  aluno text not null, instrutor text, criado date, objetivo text,
  treinos jsonb default '[]', created_at timestamptz default now()
);

-- RLS
alter table public.alunos      enable row level security;
alter table public.planos      enable row level security;
alter table public.pagamentos  enable row level security;
alter table public.acessos     enable row level security;
alter table public.aulas       enable row level security;
alter table public.instrutores enable row level security;
alter table public.fichas      enable row level security;

create policy "anon_read_alunos"      on public.alunos      for select using (true);
create policy "anon_read_planos"      on public.planos      for select using (true);
create policy "anon_read_pagamentos"  on public.pagamentos  for select using (true);
create policy "anon_read_acessos"     on public.acessos     for select using (true);
create policy "anon_read_aulas"       on public.aulas       for select using (true);
create policy "anon_read_instrutores" on public.instrutores for select using (true);
create policy "anon_read_fichas"      on public.fichas      for select using (true);
create policy "anon_insert_acessos"   on public.acessos     for insert with check (true);

-- SEED
insert into public.planos (nome,preco,duracao,descricao) values
('Mensal Básico',89.90,30,'Acesso livre em horário comercial'),
('Mensal Premium',129.90,30,'Acesso livre 24h + aulas em grupo'),
('Trimestral',329.90,90,'Acesso livre 24h + aulas em grupo + avaliação'),
('Anual',999.90,365,'Acesso completo + personal mensal + avaliações')
on conflict (nome) do nothing;

insert into public.instrutores (nome,especialidade,avatar) values
('Prof. Marcelo Santos','Spinning, Cardio','MS'),
('Prof. Carla Lima','Yoga, Pilates','CL'),
('Prof. André Costa','Funcional, Cross','AC'),
('Prof. Paula Rocha','Dança, Zumba','PR'),
('Prof. Rafael Torres','Artes Marciais','RT')
on conflict do nothing;

insert into public.alunos (nome,email,telefone,plano,status,vencimento,avatar,ingresso,nascimento,cpf,peso,altura) values
('Carlos Eduardo Silva','carlos@email.com','(11) 99999-1111','Mensal Premium','ativo','2026-06-28','CE','2025-01-10','1990-03-15','123.456.789-00','82kg','1,78m'),
('Fernanda Oliveira','fernanda@email.com','(11) 98888-2222','Trimestral','ativo','2026-08-15','FO','2025-03-05','1995-07-22','987.654.321-00','60kg','1,65m'),
('Roberto Nascimento','roberto@email.com','(11) 97777-3333','Mensal Básico','inadimplente','2026-05-01','RN','2024-11-20','1988-12-01','456.789.123-00','95kg','1,82m'),
('Amanda Costa','amanda@email.com','(11) 96666-4444','Anual','ativo','2027-01-10','AC','2026-01-10','1993-05-18','321.654.987-00','55kg','1,62m'),
('Marcos Pereira','marcos@email.com','(11) 95555-5555','Mensal Premium','inativo','2026-04-30','MP','2024-08-14','1985-09-30','654.321.098-00','78kg','1,75m'),
('Juliana Ferreira','juliana@email.com','(11) 94444-6666','Trimestral','ativo','2026-07-20','JF','2025-07-20','1997-02-14','789.123.456-00','62kg','1,68m'),
('Pedro Almeida','pedro@email.com','(11) 93333-7777','Mensal Básico','ativo','2026-06-22','PA','2025-05-22','1991-11-08','147.258.369-00','88kg','1,80m'),
('Beatriz Souza','beatriz@email.com','(11) 92222-8888','Anual','ativo','2026-12-05','BS','2025-12-05','1999-04-25','369.258.147-00','58kg','1,63m')
on conflict (email) do nothing;

insert into public.pagamentos (aluno,plano,valor,status,data,metodo) values
('Carlos Eduardo Silva','Mensal Premium',129.90,'pago','2026-06-01','Pix'),
('Fernanda Oliveira','Trimestral',329.90,'pago','2026-05-15','Cartão'),
('Roberto Nascimento','Mensal Básico',89.90,'vencido','2026-05-01','Boleto'),
('Amanda Costa','Anual',999.90,'pago','2026-01-10','Cartão'),
('Marcos Pereira','Mensal Premium',129.90,'vencido','2026-04-30','Pix'),
('Juliana Ferreira','Trimestral',329.90,'pago','2026-04-20','Pix'),
('Pedro Almeida','Mensal Básico',89.90,'pendente','2026-06-22','Boleto'),
('Beatriz Souza','Anual',999.90,'pago','2025-12-05','Cartão');

insert into public.aulas (nome,instrutor,horario,duracao,vagas,inscritos,dias) values
('Spinning','Prof. Marcelo','06:00','50min',20,18,ARRAY['Seg','Qua','Sex']),
('Yoga','Prof. Carla','07:00','60min',15,12,ARRAY['Ter','Qui']),
('Funcional','Prof. André','08:00','45min',25,25,ARRAY['Seg','Ter','Qua','Qui','Sex']),
('Zumba','Prof. Paula','18:00','60min',30,27,ARRAY['Ter','Qui','Sáb']),
('Pilates','Prof. Carla','09:00','50min',12,10,ARRAY['Seg','Qua','Sex']),
('Muay Thai','Prof. Rafael','19:00','60min',20,16,ARRAY['Seg','Qua','Sex']);

insert into public.acessos (aluno,avatar,hora,data,tipo,status) values
('Carlos Eduardo Silva','CE','06:12','Hoje','entrada','liberado'),
('Fernanda Oliveira','FO','06:18','Hoje','entrada','liberado'),
('Amanda Costa','AC','06:30','Hoje','entrada','liberado'),
('Roberto Nascimento','RN','06:45','Hoje','entrada','bloqueado'),
('Beatriz Souza','BS','07:00','Hoje','entrada','liberado'),
('Pedro Almeida','PA','07:15','Hoje','entrada','liberado'),
('Carlos Eduardo Silva','CE','08:05','Hoje','saída','liberado'),
('Juliana Ferreira','JF','08:20','Hoje','entrada','liberado');

insert into public.fichas (aluno,instrutor,criado,objetivo,treinos) values
('Carlos Eduardo Silva','Prof. André Costa','2026-01-15','Hipertrofia','[{"dia":"A — Peito e Tríceps","exercicios":["Supino reto 4x12","Supino inclinado 3x10","Cross over 3x15","Tríceps corda 4x12","Tríceps francês 3x12"]},{"dia":"B — Costas e Bíceps","exercicios":["Puxada frontal 4x12","Remada curvada 4x10","Serrote 3x12","Rosca direta 4x12","Rosca martelo 3x12"]},{"dia":"C — Pernas","exercicios":["Agachamento 4x12","Leg press 4x15","Cadeira extensora 3x15","Cadeira flexora 3x12","Panturrilha 4x20"]}]'),
('Fernanda Oliveira','Prof. Carla Lima','2026-02-10','Emagrecimento','[{"dia":"A — Full Body","exercicios":["Agachamento com halter 3x15","Remada com halter 3x15","Flexão de joelho 3x20","Prancha 3x45s","Polichinelo 3x30"]},{"dia":"B — Cardio + Core","exercicios":["Esteira 30min","Bicicleta 20min","Abdominal crunch 4x20","Prancha lateral 3x30s"]}]');
