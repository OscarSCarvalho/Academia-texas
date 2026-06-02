# 🚀 Instruções para Push no GitHub

Seu projeto está pronto para ser enviado ao GitHub! Siga os passos abaixo:

## 1️⃣ Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no ícone **+** no canto superior direito
3. Selecione **New repository**
4. Preencha os dados:
   - **Repository name**: `smartgym-admin` (ou outro nome de sua preferência)
   - **Description**: "Sistema de gestão administrativo de academia"
   - **Visibility**: Escolha entre Public ou Private
   - **NÃO** inicialize com README, .gitignore ou license (já temos)
5. Clique em **Create repository**

## 2️⃣ Adicionar Remote e Fazer Push

Copie o comando fornecido pelo GitHub (deve ser algo como):

```bash
git remote add origin https://github.com/SEU-USUARIO/smartgym-admin.git
git branch -M main
git push -u origin main
```

Ou se estiver usando SSH:

```bash
git remote add origin git@github.com:SEU-USUARIO/smartgym-admin.git
git branch -M main
git push -u origin main
```

## 3️⃣ Verificar Configuração Inicial (IMPORTANTE!)

⚠️ **Antes de fazer o push**, verifique se configurou corretamente o Git com seus dados reais:

```bash
# Verificar configuração atual
git config --global user.name
git config --global user.email
```

Se não tiver configurado ou os dados estão como "seu-usuario" e "seu-email@example.com", atualize:

```bash
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu-email-real@example.com"
```

## 4️⃣ Passo a Passo Completo

Execute os comandos abaixo (substitua SEU-USUARIO pelo seu username do GitHub):

```bash
# Navegar até a pasta do projeto
cd c:\Projetos\academia

# Adicionar o remote
git remote add origin https://github.com/SEU-USUARIO/smartgym-admin.git

# Renomear branch para main (opcional, mas recomendado)
git branch -M main

# Fazer push inicial
git push -u origin main
```

## 5️⃣ Verificar se Funcionou

Após executar os comandos, acesse seu repositório no GitHub:
```
https://github.com/SEU-USUARIO/smartgym-admin
```

## 📝 Arquivos Já Preparados

✅ `README.md` - Documentação completa do projeto  
✅ `.gitignore` - Configurado para Next.js  
✅ `CONTRIBUTING.md` - Guia de contribuição  
✅ `smartgym-admin/` - Projeto Next.js completo  

## 🔄 Fluxo de Trabalho Futuro

Após o primeiro push, use estes comandos regularmente:

```bash
# Verificar status
git status

# Fazer staging das mudanças
git add .

# Criar commit
git commit -m "Descrição do que foi alterado"

# Fazer push
git push
```

## 🔐 Autenticação SSH (Recomendado)

Para não precisar digitar a senha toda vez, configure SSH:

1. [Gere uma chave SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. [Adicione ao GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
3. Use a URL SSH nos remotes

## ⚡ Próximos Passos

1. ✅ Fazer push inicial
2. 📦 Instalar dependências: `npm install`
3. 🚀 Rodar projeto: `npm run dev`
4. 🎨 Começar desenvolvimento
5. 📝 Fazer commits regulares

---

**Dúvidas?** Consulte a [documentação do GitHub](https://docs.github.com/pt/get-started/importing-your-projects-to-github)
