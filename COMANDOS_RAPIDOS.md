# 🚀 Comandos Rápidos - Sistema de Livraria

## Inicialização Rápida Completa

### Opção 1: Script Automatizado (Linux/Mac)
```bash
./start.sh
```

### Opção 2: Manual

#### Terminal 1 - Backend
```bash
# Na raiz do projeto
npm install
npm run dev
```

#### Terminal 2 - Frontend
```bash
# Em outro terminal
cd frontend
npm install
npm run dev
```

---

## Comandos Essenciais

### Backend (na raiz do projeto)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 3333)
npm run dev

# Iniciar servidor de produção
npm start

# Executar migrações do banco
npm run migrate:up

# Desfazer migrações
npm run migrate:down

# Popular banco com dados de exemplo
npm run seed
```

### Frontend (na pasta frontend/)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Criar build de produção
npm run build

# Visualizar build de produção
npm run preview
```

---

## Primeira Vez Executando

### 1. Preparar Backend
```bash
# Na raiz do projeto
npm install
npm run migrate:up
npm run seed  # (opcional - dados de exemplo)
npm run dev
```

### 2. Preparar Frontend
```bash
# Em outro terminal
cd frontend
npm install
npm run dev
```

### 3. Acessar
- Frontend: http://localhost:3000
- Backend API: http://localhost:3333/api

---

## Reiniciar do Zero

### Limpar e Reinstalar Backend
```bash
# Na raiz do projeto
rm -rf node_modules package-lock.json
rm -f src/data/livraria.sqlite
npm install
npm run migrate:up
npm run seed
npm run dev
```

### Limpar e Reinstalar Frontend
```bash
# Na pasta frontend
cd frontend
rm -rf node_modules package-lock.json dist
npm install
npm run dev
```

---

## Comandos de Desenvolvimento

### Ver Logs do Backend
```bash
# O backend já mostra logs com morgan
npm run dev
```

### Testar API com curl

```bash
# Registrar usuário
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"teste","email":"teste@email.com","password":"123456"}'

# Login
curl -X POST http://localhost:3333/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"123456"}' \
  -c cookies.txt

# Listar livros (com sessão)
curl http://localhost:3333/api/livros \
  -b cookies.txt

# Criar livro (com sessão)
curl -X POST http://localhost:3333/api/livros \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"titulo":"Novo Livro","autor":"Autor Teste","ano":2024}'
```

---

## Verificar se está Rodando

### Verificar Backend
```bash
curl http://localhost:3333/api
# Deve retornar: {"mensagem":"Bem-vindo à API da Livraria!..."}
```

### Verificar Frontend
```bash
# Abrir no navegador
xdg-open http://localhost:3000  # Linux
open http://localhost:3000      # Mac
start http://localhost:3000     # Windows
```

---

## Parar os Servidores

### Método 1: Ctrl+C
Pressione `Ctrl+C` em cada terminal onde os servidores estão rodando

### Método 2: Kill por PID
```bash
# Encontrar processos
ps aux | grep node

# Matar processos (substitua PID pelo número)
kill PID_DO_BACKEND
kill PID_DO_FRONTEND

# Ou matar todos os processos node (cuidado!)
killall node
```

### Método 3: Por porta
```bash
# Linux/Mac - matar processo na porta 3333 (backend)
lsof -ti:3333 | xargs kill -9

# Linux/Mac - matar processo na porta 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

---

## Troubleshooting Rápido

### Porta em uso
```bash
# Ver o que está usando a porta 3333
lsof -i:3333

# Ver o que está usando a porta 3000
lsof -i:3000

# Matar processo específico
kill -9 PID
```

### Limpar cache npm
```bash
npm cache clean --force
```

### Reinstalar tudo
```bash
# Backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Atalhos de Desenvolvimento

### Abrir VSCode nas pastas
```bash
# Raiz (backend)
code .

# Frontend
code frontend
```

### Abrir múltiplos terminais automaticamente

Crie um arquivo `tmux-start.sh`:
```bash
#!/bin/bash
tmux new-session -d -s livraria
tmux send-keys -t livraria 'npm run dev' C-m
tmux split-window -h -t livraria
tmux send-keys -t livraria 'cd frontend && npm run dev' C-m
tmux attach -t livraria
```

Depois:
```bash
chmod +x tmux-start.sh
./tmux-start.sh
```

---

## Checklist Rápido

Antes de executar:
- [ ] Node.js 16+ instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Arquivo `.env` existe na raiz
- [ ] Portas 3000 e 3333 livres

Para executar:
- [ ] Backend rodando em http://localhost:3333
- [ ] Frontend rodando em http://localhost:3000
- [ ] Consegue acessar http://localhost:3000 no navegador
- [ ] Consegue criar conta e fazer login

---

## Extras

### Abrir tudo de uma vez (Linux/Mac)
```bash
# Backend em um terminal, frontend em outro, e navegador
gnome-terminal -- bash -c "npm run dev; exec bash" &
gnome-terminal --working-directory=frontend -- bash -c "npm run dev; exec bash" &
sleep 5 && xdg-open http://localhost:3000
```

### Ver logs em tempo real
```bash
# Backend já mostra automaticamente com morgan
# Para mais detalhes, adicione console.log onde necessário
```

### Backup do banco de dados
```bash
# Fazer backup
cp src/data/livraria.sqlite src/data/livraria.sqlite.backup

# Restaurar backup
cp src/data/livraria.sqlite.backup src/data/livraria.sqlite
```

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- `INSTRUCOES_EXECUCAO.md` - Guia completo passo a passo
- `RESUMO_FRONTEND.md` - Detalhes do frontend
- `GUIA_FRONTEND.md` - Guia técnico do frontend
