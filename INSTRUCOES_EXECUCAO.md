# 📚 Instruções de Execução - Sistema de Livraria

## 🎯 Visão Geral

Este projeto consiste em:
- **Backend:** API REST com Node.js e Express (porta 3333)
- **Frontend:** Aplicação React com Vite (porta 3000)

---

## 🚀 Executando o Projeto Completo

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

---

## 1️⃣ Executar o Backend

### Abra um terminal na raiz do projeto e execute:

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Executar migrações do banco de dados
npm run migrate:up

# (Opcional) Popular o banco com dados de exemplo
npm run seed

# Iniciar o servidor backend
npm run dev
```

O backend estará rodando em: **http://localhost:3333**

### Verificar se o backend está funcionando:
Acesse no navegador: http://localhost:3333/api

Você deve ver:
```json
{
  "mensagem": "Bem-vindo à API da Livraria! Use /livros para gerenciar os livros."
}
```

---

## 2️⃣ Executar o Frontend

### Abra um NOVO terminal (mantenha o backend rodando) e execute:

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: **http://localhost:3000**

### Acesse a aplicação:
Abra o navegador em: **http://localhost:3000**

---

## 📝 Fluxo de Uso da Aplicação

### 1. Primeiro Acesso - Criar Conta

1. Ao acessar http://localhost:3000, você será redirecionado para o login
2. Clique em **"Registre-se"**
3. Preencha o formulário:
   - **Nome de usuário:** seu_usuario
   - **Email:** seu@email.com
   - **Senha:** minimo 6 caracteres
   - **Confirmar Senha:** repita a senha
4. Clique em **"Registrar"**

### 2. Fazer Login

1. Após o registro, você será redirecionado para o login
2. Digite seu **email** e **senha**
3. Clique em **"Entrar"**

### 3. Gerenciar Livros

1. Após o login, você verá a página inicial
2. Clique em **"Livros"** no menu superior
3. Clique em **"➕ Adicionar Livro"** para criar um novo livro
4. Preencha os dados:
   - **Título:** (obrigatório)
   - **Autor:** (obrigatório)
   - **Ano:** (obrigatório)
   - **Editora:** (opcional)
5. Clique em **"Criar"**

### 4. Editar/Remover Livros

- Para **editar:** Clique no botão "✏️ Editar" no card do livro
- Para **remover:** Clique no botão "🗑️ Remover" no card do livro

---

## 🛠️ Scripts Disponíveis

### Backend (raiz do projeto)
```bash
npm run dev          # Inicia o servidor em modo desenvolvimento
npm start            # Inicia o servidor em modo produção
npm run seed         # Popula o banco com dados de exemplo
npm run migrate:up   # Executa migrações do banco
npm run migrate:down # Desfaz migrações
```

### Frontend (pasta frontend/)
```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Visualiza o build de produção
```

---

## 🔌 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Criar nova conta
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter usuário logado
- `POST /api/auth/logout` - Fazer logout

### Livros
- `GET /api/livros` - Listar todos os livros
- `GET /api/livros/:id` - Buscar livro por ID
- `POST /api/livros` - Criar novo livro
- `PUT /api/livros/:id` - Atualizar livro
- `DELETE /api/livros/:id` - Remover livro

---

## 🐛 Troubleshooting

### Backend não inicia
- Verifique se a porta 3333 não está em uso
- Verifique se as dependências foram instaladas: `npm install`
- Verifique se o arquivo `.env` existe na raiz

### Frontend não conecta ao backend
- Certifique-se de que o backend está rodando em http://localhost:3333
- Verifique o console do navegador (F12) para erros
- Verifique se ambos os servidores estão rodando

### Erro de autenticação
- Limpe os cookies do navegador
- Faça logout e login novamente
- Verifique se o usuário foi criado corretamente no banco

### Página em branco no frontend
- Abra o console do navegador (F12)
- Verifique se há erros de JavaScript
- Certifique-se de que instalou as dependências: `cd frontend && npm install`

---

## 📊 Estrutura do Banco de Dados

### Tabela: users
- id (INTEGER, PRIMARY KEY)
- username (TEXT)
- email (TEXT, UNIQUE)
- password (TEXT, hash bcrypt)

### Tabela: livros
- id (INTEGER, PRIMARY KEY)
- titulo (TEXT)
- autor (TEXT)
- ano (INTEGER)
- editora (TEXT)

---

## 🔒 Segurança

- Senhas são criptografadas com bcrypt
- Sessões gerenciadas via express-session
- Cookies httpOnly para prevenir XSS
- Rotas protegidas no frontend e backend

---

## 📝 Notas Importantes

1. **Backend deve estar rodando antes do frontend**
2. **Não feche os terminais** enquanto estiver usando a aplicação
3. **Use portas diferentes** para backend (3333) e frontend (3000)
4. **Crie uma conta antes de fazer login**
5. **Os dados são salvos no SQLite** (arquivo: src/data/livraria.sqlite)

---

## ✅ Checklist de Verificação

Antes de começar a usar:

- [ ] Node.js instalado (versão 16+)
- [ ] Dependências do backend instaladas (`npm install` na raiz)
- [ ] Dependências do frontend instaladas (`npm install` na pasta frontend)
- [ ] Arquivo `.env` existe na raiz do projeto
- [ ] Backend rodando em http://localhost:3333
- [ ] Frontend rodando em http://localhost:3000
- [ ] Conta de usuário criada

---

## 🎉 Pronto!

Agora você pode usar o sistema completo de gerenciamento de livraria!

Para dúvidas, consulte:
- `README.md` - Informações gerais do projeto
- `GUIA_FRONTEND.md` - Detalhes específicos do frontend
- `frontend/README.md` - Documentação técnica do React
