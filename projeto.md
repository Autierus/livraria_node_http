# Projeto Final – Desenvolvimento Web

**Disciplina:** Desenvolvimento Web I  
**Curso:** Ciência da Computação - 4ª fase  
**Professor:** Fabricio Bizotto

O projeto final consiste em **expandir o sistema de gerenciamento de livraria** desenvolvido em sala, adicionando novas funcionalidades tanto no frontend (React) quanto no backend (Node.js + Express).

O aluno deverá **escolher e implementar pelo menos *duas* das cinco tarefas** descritas a seguir.

## 1. Criar uma Nova Tabela (ex.: Reviews)

Expandir o banco de dados adicionando uma tabela que traga uma nova funcionalidade ao sistema.
Pode ser **reviews**, **gêneros**, **autores**, **logs**, ou outra tabela relevante.

### Requisitos mínimos

* Criar a tabela e definir corretamente os relacionamentos.
* Criar rotas no backend para manipular os dados.
* Consumir essas rotas no frontend (exibição e/ou cadastro).

### O que será avaliado

* Modelagem correta da tabela
* Integração com o backend
* Relacionamento com usuários e livros (se aplicável)
* Exibição da nova funcionalidade no frontend

## 2. Upload de Imagem de Capa do Livro

Permitir que o usuário envie uma imagem como capa de cada livro.

### Requisitos mínimos

* Formulário com upload no frontend.
* Backend capaz de receber e armazenar arquivos (ex.: **Multer**).
* Salvar apenas o caminho da imagem no banco.
* Exibir a capa nos cards/listas de livros.

> **Dica:** Utilize **Multer** no backend e **FormData** no frontend.

### O que será avaliado

* Funcionamento completo do upload
* Armazenamento e recuperação correta da imagem
* Exibição da capa no frontend

## 3. Recuperação de Senha via E-mail (Gmail)

Criar um sistema funcional de recuperação de senha, usando **Nodemailer** com uma conta do Gmail.

### Fluxo mínimo

1. Usuário informa o e-mail.
2. Backend verifica e envia um link de recuperação.
3. Usuário abre o link, define nova senha.
4. Sistema atualiza a senha no banco.

### O que será avaliado

* Funcionamento ponta a ponta (frontend + backend)
* Envio correto do e-mail
* Segurança mínima (token de reset ou hash de confirmação)

## 4. Sistema de Favoritos

Permitir que cada usuário marque livros como favoritos.

### Requisitos mínimos

* Criar a tabela `favorites` (user_id, book_id).
* Rotas no backend para adicionar, remover e listar favoritos.
* Interface no frontend oferecendo botão de favoritar/desfavoritar.
* Página “Meus Favoritos” mostrando apenas favoritos do usuário logado.

### O que será avaliado

* Modelagem da tabela de favoritos
* Integração com autenticação (favoritos são por usuário!)
* Integração com a UI
* Funcionalidade de favoritar/desfavoritar

## 5. Tema Claro/Escuro no FrontEnd

Implementar no React um sistema completo de **tema claro/escuro**.

### Requisitos mínimos

* Botão para alternar entre os temas.
* Ajustes visuais globais (cores, fundo, texto).
* Persistência do tema no **localStorage** ou cookies.
* Tema deve permanecer após recarregar a página.

### O que será avaliado

* Funcionamento consistente do modo escuro
* Organização dos estilos (CSS, Context API, etc.)
* Persistência da preferência
* Integração amigável com o layout

# Entrega

O aluno deverá entregar:

### 1. Link do repositório no GitHub

Com:

* Código do backend
* Código do frontend
* README contendo:

  * descrição das funcionalidades escolhidas
  * instruções para executar o sistema

### 2. Vídeo de até 5 minutos

Mostrando:

* As funcionalidades escolhidas
* Como elas funcionam no sistema
* Parte do código implementado (opcional, mas recomendado)

### 3. Banco de dados

Enviar o arquivo SQLite ou script de criação das tabelas (se aplicável).

# Critérios de Avaliação (Total: 10 pontos)

| Critério                                               | Pontos |
| ------------------------------------------------------ | ------ |
| **Implementação das tarefas** (duas tarefas completas) | 5 pts  |
| – Funcionalidade correta (backend + frontend)          | —      |
| – Cumprimento dos requisitos mínimos                   | —      |
| **Qualidade do código**                                | 1 pts  |
| – Organização, clareza, nomenclatura, modularização    | —      |
| – Boas práticas no React e no Node                     | —      |
| **Entrega (GitHub + vídeo)**                           | 4 pts  |
| – README bem feito, repositório organizado             | —      |
| – Demonstração funcional no vídeo                      | —      |

> **Bônus (até +1 ponto):** implementar **3 tarefas ao invés de 2**.