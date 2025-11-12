# 🔄 Atualização: Campo Email Adicionado ao Usuário

## ✅ Alterações Realizadas

### 📋 Arquivos Modificados

1. **`src/models/user.model.js`**
   - ✅ Adicionado campo `email` ao modelo
   - ✅ Adicionada validação de email
   - ✅ Email é armazenado em lowercase

2. **`src/database/sqlite.js`**
   - ✅ Atualizado schema da tabela `users` para incluir `email UNIQUE`

3. **`src/controllers/auth.controller.js`**
   - ✅ **Register:** Agora recebe `email` no body
   - ✅ **Register:** Valida se email já existe
   - ✅ **Login:** Agora usa `email` ao invés de `username`

4. **`src/repositories/users.repository.js`**
   - ✅ Adicionado método `findByEmail()`
   - ✅ Atualizado `create()` para incluir email
   - ✅ Atualizado queries para incluir email

5. **`migrations/002-add-email-to-users.js`**
   - ✅ Nova migração para adicionar coluna email

6. **`scripts/migrate-add-email.js`**
   - ✅ Script para executar a migração

---

## 🗄️ Mudanças no Banco de Dados

### Tabela `users` - ANTES
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Tabela `users` - DEPOIS
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,        -- ✨ NOVO
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

---

## 🚀 Como Aplicar a Atualização

### ⚠️ IMPORTANTE: Faça backup do banco de dados primeiro!

```bash
# Fazer backup do banco
cp src/data/livraria.sqlite src/data/livraria.sqlite.backup
```

### Opção 1: Banco de Dados Vazio (Recomendado se não tiver dados importantes)

```bash
# Remover banco antigo
rm src/data/livraria.sqlite

# Reiniciar o servidor (vai criar o novo schema automaticamente)
npm run dev
```

### Opção 2: Banco com Dados Existentes (Executar Migração)

```bash
# Executar migração para adicionar coluna email
npm run migrate:add-email
```

**⚠️ ATENÇÃO:** Usuários existentes receberão emails temporários no formato: `username@temp.com`

Você precisará atualizar os emails manualmente ou pedir aos usuários para se registrarem novamente.

---

## 📝 Mudanças na API

### Endpoint de Registro

**ANTES:**
```json
POST /api/auth/register
{
  "username": "joao",
  "password": "senha123"
}
```

**DEPOIS:**
```json
POST /api/auth/register
{
  "username": "joao",
  "email": "joao@exemplo.com",    // ✨ NOVO (obrigatório)
  "password": "senha123"
}
```

### Endpoint de Login

**ANTES:**
```json
POST /api/auth/login
{
  "username": "joao",
  "password": "senha123"
}
```

**DEPOIS:**
```json
POST /api/auth/login
{
  "email": "joao@exemplo.com",    // ✨ Agora usa email ao invés de username
  "password": "senha123"
}
```

### Resposta do Usuário

**ANTES:**
```json
{
  "id": 1,
  "username": "joao",
  "created_at": "2024-11-12T10:00:00Z"
}
```

**DEPOIS:**
```json
{
  "id": 1,
  "username": "joao",
  "email": "joao@exemplo.com",    // ✨ NOVO
  "created_at": "2024-11-12T10:00:00Z"
}
```

---

## ✅ Validações Implementadas

### Campo Email
- ✅ **Obrigatório** no registro
- ✅ **Formato válido** (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- ✅ **Único** no banco (não permite duplicados)
- ✅ **Case insensitive** (armazenado em lowercase)

### Mensagens de Erro
- `"email inválido"` - formato incorreto
- `"Email já cadastrado"` - email já em uso
- `"Nome de usuário já existe"` - username já em uso
- `"Email ou senha inválidos"` - login falhou

---

## 🧪 Testar as Mudanças

### 1. Criar novo usuário
```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste",
    "email": "teste@exemplo.com",
    "password": "senha123"
  }'
```

### 2. Fazer login com email
```bash
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123"
  }' \
  -c cookies.txt
```

### 3. Verificar dados do usuário
```bash
curl http://localhost:3333/api/auth/me \
  -b cookies.txt
```

---

## 🔄 Compatibilidade com Frontend

O frontend React **já está preparado** para usar email! ✅

Os componentes já enviam:
- `email` no registro
- `email` no login

Nenhuma alteração necessária no frontend.

---

## 📊 Verificar no SQLite

```bash
# Abrir banco
sqlite3 src/data/livraria.sqlite

# Ver estrutura da tabela
.schema users

# Listar usuários
SELECT id, username, email, created_at FROM users;

# Sair
.exit
```

---

## 🔧 Atualizar Email de Usuários Existentes (Se aplicou migração)

Se você executou a migração e tem usuários com emails temporários:

```bash
sqlite3 src/data/livraria.sqlite
```

```sql
-- Atualizar email de um usuário específico
UPDATE users SET email = 'email.real@exemplo.com' WHERE username = 'usuario';

-- Ver todos os emails temporários
SELECT id, username, email FROM users WHERE email LIKE '%@temp.com';
```

---

## ⚠️ Avisos Importantes

1. **Backup:** Sempre faça backup antes de migrar
2. **Emails temporários:** Usuários existentes precisarão atualizar emails
3. **Login:** Agora só funciona com **email**, não com username
4. **Case insensitive:** Emails são armazenados em lowercase
5. **Validação:** Email precisa ter formato válido

---

## 🎯 Próximos Passos

1. ✅ Aplicar migração (ou recriar banco)
2. ✅ Reiniciar o servidor backend
3. ✅ Testar registro com email
4. ✅ Testar login com email
5. ✅ Verificar que frontend funciona corretamente

---

## 📚 Scripts Disponíveis

```bash
# Executar migração de email
npm run migrate:add-email

# Outras migrações
npm run migrate:up
npm run migrate:down
```

---

**Status:** ✅ **ATUALIZAÇÃO COMPLETA**

O backend agora suporta totalmente o campo email para usuários!
