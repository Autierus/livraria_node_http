# 🚀 Guia de Instalação e Execução do Frontend

## 📋 O que foi criado

Uma aplicação React completa com:

### ✨ Funcionalidades
- ✅ Sistema de autenticação (login/registro)
- ✅ Gerenciamento completo de livros (CRUD)
- ✅ Interface moderna e responsiva
- ✅ Validação de formulários
- ✅ Mensagens de feedback ao usuário
- ✅ Proteção de rotas privadas
- ✅ Gestão de estado com Context API

### 🗂️ Estrutura criada

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx       # Cabeçalho com navegação
│   │   ├── LivroCard.jsx    # Card para exibir livro
│   │   ├── LivroForm.jsx    # Formulário de criação/edição
│   │   └── PrivateRoute.jsx # Proteção de rotas
│   ├── contexts/
│   │   └── AuthContext.jsx  # Contexto de autenticação
│   ├── pages/
│   │   ├── Login.jsx        # Página de login
│   │   ├── Register.jsx     # Página de registro
│   │   ├── Home.jsx         # Página inicial
│   │   └── Livros.jsx       # Página de gerenciamento de livros
│   ├── services/
│   │   ├── api.js           # Configuração do Axios
│   │   ├── authService.js   # Serviços de autenticação
│   │   └── livrosService.js # Serviços de livros
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Ponto de entrada
├── index.html
├── vite.config.js           # Configuração do Vite
└── package.json
```

## 🔧 Como executar

### 1. Entre na pasta do frontend
```bash
cd frontend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Certifique-se de que o backend está rodando
O backend deve estar rodando em `http://localhost:3333`

No diretório raiz do projeto:
```bash
npm run dev
```

### 4. Inicie o frontend
```bash
npm run dev
```

### 5. Acesse a aplicação
Abra o navegador em: `http://localhost:3000`

## 📱 Como usar a aplicação

### Primeiro acesso
1. Acesse `http://localhost:3000`
2. Você será redirecionado para a tela de login
3. Clique em "Registre-se" para criar uma conta
4. Preencha os dados:
   - Nome de usuário
   - Email
   - Senha (mínimo 6 caracteres)
   - Confirmar senha
5. Clique em "Registrar"

### Login
1. Após o registro, faça login com seu email e senha
2. Você será redirecionado para a página inicial

### Gerenciar Livros
1. Clique em "Livros" no menu superior
2. Para adicionar um livro:
   - Clique em "➕ Adicionar Livro"
   - Preencha o formulário
   - Clique em "Criar"
3. Para editar um livro:
   - Clique em "✏️ Editar" no card do livro
   - Modifique os dados
   - Clique em "Atualizar"
4. Para remover um livro:
   - Clique em "🗑️ Remover" no card do livro
   - Confirme a ação

## 🔌 Integração com o Backend

O frontend está configurado para se comunicar com o backend através de um proxy do Vite:

- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:3333`
- **Proxy:** Todas as requisições para `/api` são redirecionadas para o backend

### Endpoints utilizados:

**Autenticação:**
- `POST /api/auth/register` - Criar nova conta
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter dados do usuário logado
- `POST /api/auth/logout` - Fazer logout

**Livros:**
- `GET /api/livros` - Listar todos os livros
- `GET /api/livros/:id` - Buscar livro por ID
- `POST /api/livros` - Criar novo livro
- `PUT /api/livros/:id` - Atualizar livro
- `DELETE /api/livros/:id` - Remover livro

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção da interface
- **React Router DOM** - Gerenciamento de rotas
- **Axios** - Cliente HTTP para requisições
- **Vite** - Build tool e dev server
- **Context API** - Gerenciamento de estado global

## 🔒 Segurança

- Rotas protegidas com autenticação
- Sessões gerenciadas via cookies (httpOnly)
- Redirecionamento automático em caso de não autenticação
- Validação de formulários no frontend

## 📦 Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

Para testar a versão de produção localmente:

```bash
npm run preview
```

## 🐛 Troubleshooting

### Erro de conexão com o backend
- Verifique se o backend está rodando em `http://localhost:3333`
- Verifique se não há erros de CORS no console do navegador

### Erro ao fazer login
- Certifique-se de que o usuário foi criado no banco de dados
- Verifique se as credenciais estão corretas

### Página em branco
- Abra o console do navegador (F12) e verifique os erros
- Verifique se todas as dependências foram instaladas

## 📝 Próximos passos sugeridos

- [ ] Adicionar paginação na lista de livros
- [ ] Implementar busca e filtros
- [ ] Adicionar categorias aos livros
- [ ] Implementar sistema de favoritos
- [ ] Adicionar upload de capas de livros
- [ ] Melhorar responsividade mobile
- [ ] Adicionar testes unitários
- [ ] Implementar dark mode

## 🤝 Contribuindo

Para contribuir com melhorias:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
