export const mockAlunos = [
  { id: "1", nome: "Carlos Eduardo Silva", email: "carlos@email.com", telefone: "(11) 99999-1111", plano: "Mensal Premium", status: "ativo", vencimento: "2026-06-28", avatar: "CE", ingresso: "2025-01-10", nascimento: "1990-03-15", cpf: "123.456.789-00", peso: "82kg", altura: "1,78m" },
  { id: "2", nome: "Fernanda Oliveira", email: "fernanda@email.com", telefone: "(11) 98888-2222", plano: "Trimestral", status: "ativo", vencimento: "2026-08-15", avatar: "FO", ingresso: "2025-03-05", nascimento: "1995-07-22", cpf: "987.654.321-00", peso: "60kg", altura: "1,65m" },
  { id: "3", nome: "Roberto Nascimento", email: "roberto@email.com", telefone: "(11) 97777-3333", plano: "Mensal Básico", status: "inadimplente", vencimento: "2026-05-01", avatar: "RN", ingresso: "2024-11-20", nascimento: "1988-12-01", cpf: "456.789.123-00", peso: "95kg", altura: "1,82m" },
  { id: "4", nome: "Amanda Costa", email: "amanda@email.com", telefone: "(11) 96666-4444", plano: "Anual", status: "ativo", vencimento: "2027-01-10", avatar: "AC", ingresso: "2026-01-10", nascimento: "1993-05-18", cpf: "321.654.987-00", peso: "55kg", altura: "1,62m" },
  { id: "5", nome: "Marcos Pereira", email: "marcos@email.com", telefone: "(11) 95555-5555", plano: "Mensal Premium", status: "inativo", vencimento: "2026-04-30", avatar: "MP", ingresso: "2024-08-14", nascimento: "1985-09-30", cpf: "654.321.098-00", peso: "78kg", altura: "1,75m" },
  { id: "6", nome: "Juliana Ferreira", email: "juliana@email.com", telefone: "(11) 94444-6666", plano: "Trimestral", status: "ativo", vencimento: "2026-07-20", avatar: "JF", ingresso: "2025-07-20", nascimento: "1997-02-14", cpf: "789.123.456-00", peso: "62kg", altura: "1,68m" },
  { id: "7", nome: "Pedro Almeida", email: "pedro@email.com", telefone: "(11) 93333-7777", plano: "Mensal Básico", status: "ativo", vencimento: "2026-06-22", avatar: "PA", ingresso: "2025-05-22", nascimento: "1991-11-08", cpf: "147.258.369-00", peso: "88kg", altura: "1,80m" },
  { id: "8", nome: "Beatriz Souza", email: "beatriz@email.com", telefone: "(11) 92222-8888", plano: "Anual", status: "ativo", vencimento: "2026-12-05", avatar: "BS", ingresso: "2025-12-05", nascimento: "1999-04-25", cpf: "369.258.147-00", peso: "58kg", altura: "1,63m" },
]

export const mockPlanos = [
  { id: "1", nome: "Mensal Básico", preco: 89.90, duracao: 30, descricao: "Acesso livre em horário comercial" },
  { id: "2", nome: "Mensal Premium", preco: 129.90, duracao: 30, descricao: "Acesso livre 24h + aulas em grupo" },
  { id: "3", nome: "Trimestral", preco: 329.90, duracao: 90, descricao: "Acesso livre 24h + aulas em grupo + avaliação" },
  { id: "4", nome: "Anual", preco: 999.90, duracao: 365, descricao: "Acesso completo + personal mensal + avaliações" },
]

export const mockPagamentos = [
  { id: "1", aluno: "Carlos Eduardo Silva", plano: "Mensal Premium", valor: 129.90, status: "pago", data: "2026-06-01", metodo: "Pix" },
  { id: "2", aluno: "Fernanda Oliveira", plano: "Trimestral", valor: 329.90, status: "pago", data: "2026-05-15", metodo: "Cartão" },
  { id: "3", aluno: "Roberto Nascimento", plano: "Mensal Básico", valor: 89.90, status: "vencido", data: "2026-05-01", metodo: "Boleto" },
  { id: "4", aluno: "Amanda Costa", plano: "Anual", valor: 999.90, status: "pago", data: "2026-01-10", metodo: "Cartão" },
  { id: "5", aluno: "Marcos Pereira", plano: "Mensal Premium", valor: 129.90, status: "vencido", data: "2026-04-30", metodo: "Pix" },
  { id: "6", aluno: "Juliana Ferreira", plano: "Trimestral", valor: 329.90, status: "pago", data: "2026-04-20", metodo: "Pix" },
  { id: "7", aluno: "Pedro Almeida", plano: "Mensal Básico", valor: 89.90, status: "pendente", data: "2026-06-22", metodo: "Boleto" },
  { id: "8", aluno: "Beatriz Souza", plano: "Anual", valor: 999.90, status: "pago", data: "2025-12-05", metodo: "Cartão" },
]

export const mockAcessos = [
  { id: "1", aluno: "Carlos Eduardo Silva", avatar: "CE", hora: "06:12", data: "Hoje", tipo: "entrada", status: "liberado" },
  { id: "2", aluno: "Fernanda Oliveira", avatar: "FO", hora: "06:18", data: "Hoje", tipo: "entrada", status: "liberado" },
  { id: "3", aluno: "Amanda Costa", avatar: "AC", hora: "06:30", data: "Hoje", tipo: "entrada", status: "liberado" },
  { id: "4", aluno: "Roberto Nascimento", avatar: "RN", hora: "06:45", data: "Hoje", tipo: "entrada", status: "bloqueado" },
  { id: "5", aluno: "Beatriz Souza", avatar: "BS", hora: "07:00", data: "Hoje", tipo: "entrada", status: "liberado" },
  { id: "6", aluno: "Pedro Almeida", avatar: "PA", hora: "07:15", data: "Hoje", tipo: "entrada", status: "liberado" },
  { id: "7", aluno: "Carlos Eduardo Silva", avatar: "CE", hora: "08:05", data: "Hoje", tipo: "saída", status: "liberado" },
  { id: "8", aluno: "Juliana Ferreira", avatar: "JF", hora: "08:20", data: "Hoje", tipo: "entrada", status: "liberado" },
  { id: "9", aluno: "Fernanda Oliveira", avatar: "FO", hora: "08:45", data: "Hoje", tipo: "saída", status: "liberado" },
  { id: "10", aluno: "Amanda Costa", avatar: "AC", hora: "09:10", data: "Hoje", tipo: "saída", status: "liberado" },
]

export const mockAulas = [
  { id: "1", nome: "Spinning", instrutor: "Prof. Marcelo", horario: "06:00", duracao: "50min", vagas: 20, inscritos: 18, dias: ["Seg", "Qua", "Sex"] },
  { id: "2", nome: "Yoga", instrutor: "Prof. Carla", horario: "07:00", duracao: "60min", vagas: 15, inscritos: 12, dias: ["Ter", "Qui"] },
  { id: "3", nome: "Funcional", instrutor: "Prof. André", horario: "08:00", duracao: "45min", vagas: 25, inscritos: 25, dias: ["Seg", "Ter", "Qua", "Qui", "Sex"] },
  { id: "4", nome: "Zumba", instrutor: "Prof. Paula", horario: "18:00", duracao: "60min", vagas: 30, inscritos: 27, dias: ["Ter", "Qui", "Sáb"] },
  { id: "5", nome: "Pilates", instrutor: "Prof. Carla", horario: "09:00", duracao: "50min", vagas: 12, inscritos: 10, dias: ["Seg", "Qua", "Sex"] },
  { id: "6", nome: "Muay Thai", instrutor: "Prof. Rafael", horario: "19:00", duracao: "60min", vagas: 20, inscritos: 16, dias: ["Seg", "Qua", "Sex"] },
]

export const mockInstrutores = [
  { id: "1", nome: "Prof. Marcelo Santos", especialidade: "Spinning, Cardio", avatar: "MS" },
  { id: "2", nome: "Prof. Carla Lima", especialidade: "Yoga, Pilates", avatar: "CL" },
  { id: "3", nome: "Prof. André Costa", especialidade: "Funcional, Cross", avatar: "AC" },
  { id: "4", nome: "Prof. Paula Rocha", especialidade: "Dança, Zumba", avatar: "PR" },
  { id: "5", nome: "Prof. Rafael Torres", especialidade: "Artes Marciais", avatar: "RT" },
]

export const mockFichas = [
  {
    id: "1", aluno: "Carlos Eduardo Silva", instrutor: "Prof. André Costa",
    criado: "2026-01-15", objetivo: "Hipertrofia",
    treinos: [
      { dia: "A — Peito e Tríceps", exercicios: ["Supino reto 4x12", "Supino inclinado 3x10", "Cross over 3x15", "Tríceps corda 4x12", "Tríceps francês 3x12"] },
      { dia: "B — Costas e Bíceps", exercicios: ["Puxada frontal 4x12", "Remada curvada 4x10", "Serrote 3x12", "Rosca direta 4x12", "Rosca martelo 3x12"] },
      { dia: "C — Pernas", exercicios: ["Agachamento 4x12", "Leg press 4x15", "Cadeira extensora 3x15", "Cadeira flexora 3x12", "Panturrilha 4x20"] },
    ]
  },
  {
    id: "2", aluno: "Fernanda Oliveira", instrutor: "Prof. Carla Lima",
    criado: "2026-02-10", objetivo: "Emagrecimento",
    treinos: [
      { dia: "A — Full Body", exercicios: ["Agachamento com halter 3x15", "Remada com halter 3x15", "Flexão de joelho 3x20", "Prancha 3x45s", "Polichinelo 3x30"] },
      { dia: "B — Cardio + Core", exercicios: ["Esteira 30min", "Bicicleta 20min", "Abdominal crunch 4x20", "Prancha lateral 3x30s"] },
    ]
  },
]

export const mockRevenueData = [
  { mes: "Jan", receita: 12400, meta: 13000 },
  { mes: "Fev", receita: 13200, meta: 13000 },
  { mes: "Mar", receita: 12800, meta: 14000 },
  { mes: "Abr", receita: 14100, meta: 14000 },
  { mes: "Mai", receita: 13600, meta: 14500 },
  { mes: "Jun", receita: 15200, meta: 15000 },
]

export const mockAcessoHoraData = [
  { hora: "5h", acessos: 8 },
  { hora: "6h", acessos: 42 },
  { hora: "7h", acessos: 65 },
  { hora: "8h", acessos: 38 },
  { hora: "9h", acessos: 22 },
  { hora: "10h", acessos: 15 },
  { hora: "11h", acessos: 18 },
  { hora: "12h", acessos: 28 },
  { hora: "13h", acessos: 12 },
  { hora: "14h", acessos: 10 },
  { hora: "15h", acessos: 14 },
  { hora: "16h", acessos: 20 },
  { hora: "17h", acessos: 35 },
  { hora: "18h", acessos: 72 },
  { hora: "19h", acessos: 68 },
  { hora: "20h", acessos: 45 },
  { hora: "21h", acessos: 25 },
  { hora: "22h", acessos: 8 },
]
