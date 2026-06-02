# SmartGym Admin

## 📋 Descrição

**SmartGym Admin** é uma plataforma administrativa completa para gerenciamento de academias. Desenvolvida com Next.js 16, React 19 e TypeScript, oferece uma interface moderna e intuitiva para controle de alunos, treinos, agendamentos e financeiro.

## 🎯 Funcionalidades

### Módulos Principais
- **Dashboard** - Visão geral e métricas da academia
- **Alunos** - Cadastro, edição e gerenciamento de alunos
- **Treinos** - Criação e organização de programas de treino
- **Agendamentos** - Controle de horários e reservas
- **Financeiro** - Gestão de pagamentos e recebimentos
- **Acesso** - Controle de permissões de usuários
- **Totem** - Interface de check-in para alunos

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js** 16.2.7 - Framework React com SSR
- **React** 19.2.4 - Biblioteca UI
- **TypeScript** 5 - Type safety
- **Tailwind CSS** 4 - Estilização utilitária
- **Shadcn UI** - Componentes de UI reutilizáveis

### Bibliotecas Principais
- **Framer Motion** - Animações fluidas
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas
- **Sonner** - Notificações toast
- **Next-themes** - Suporte a temas

### Desenvolvimento
- **ESLint** 9 - Linting
- **TypeScript** - Type checking

## 📂 Estrutura do Projeto

```
smartgym-admin/
├── app/                    # App directory (Next.js 13+)
│   ├── (admin)/           # Rotas administrativas
│   │   ├── dashboard/
│   │   ├── alunos/
│   │   ├── treinos/
│   │   ├── agendamentos/
│   │   ├── financeiro/
│   │   └── acesso/
│   ├── (auth)/            # Autenticação
│   │   └── login/
│   ├── (totem)/           # Interface totem
│   │   └── totem/
│   └── layout.tsx
├── components/            # Componentes reutilizáveis
│   ├── layout/
│   └── ui/                # Componentes Shadcn UI
├── hooks/                 # React hooks customizados
├── lib/                   # Utilitários e helpers
├── public/                # Arquivos estáticos
└── package.json
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+ ou superior
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/smartgym-admin.git
cd smartgym-admin
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint

## 🏗️ Arquitetura

### Padrões Utilizados
- **App Router** - Roteamento moderno do Next.js
- **Server Components** - Otimização de performance
- **TypeScript** - Type safety em tempo de desenvolvimento
- **Componentes Compostos** - Reutilização e manutenibilidade
- **Utility-first CSS** - Tailwind CSS para estilização rápida

### Estrutura de Rotas
```
/ (root)
├── (admin)
│   ├── dashboard
│   ├── alunos/[id]
│   ├── treinos
│   ├── agendamentos
│   ├── financeiro
│   └── acesso
├── (auth)
│   └── login
└── (totem)
    └── totem/
        ├── cadastro
        ├── checkin
        └── treinos
```

## 📦 Dependências Principais

### Produção
| Pacote | Versão | Descrição |
|--------|--------|-----------|
| next | 16.2.7 | Framework React |
| react | 19.2.4 | Biblioteca UI |
| tailwindcss | 4 | CSS utilitário |
| framer-motion | 12.40.0 | Animações |
| recharts | 3.8.1 | Gráficos |
| shadcn | 4.10.0 | Componentes UI |

### Desenvolvimento
| Pacote | Versão | Descrição |
|--------|--------|-----------|
| typescript | 5 | Type checking |
| eslint | 9 | Linting |

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# Exemplo de variáveis (ajuste conforme necessário)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### TypeScript
As configurações estão em `tsconfig.json`. Path aliases já estão configurados:

```typescript
"@/*": ["./*"]
```

### Tailwind CSS
Configuração em `tailwind.config.ts` com tema customizado.

## 🎨 Componentes UI

Todos os componentes seguem o padrão Shadcn UI com customizações via Tailwind CSS:

- Avatar
- Badge
- Button
- Card
- Dialog
- Dropdown Menu
- Input
- Label
- Navigation Menu
- Progress
- Scroll Area
- Select
- Separator
- Sheet
- Sidebar
- Skeleton
- Table
- Tabs
- Textarea
- Tooltip

## 📱 Responsividade

O projeto utiliza Tailwind CSS com abordagens mobile-first, garantindo boa experiência em todos os dispositivos.

## 🔐 Segurança

- TypeScript para type safety
- ESLint para code quality
- Next.js com proteção built-in contra vulnerabilidades comuns

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 👤 Autor

SmartGym Admin - Sistema de Gestão de Academia

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Última atualização:** junho de 2026
