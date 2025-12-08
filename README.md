# Projeto Web

Este documento descreve as funcionalidades implementadas no projeto e apresenta instruções para execução do sistema. Veja o vídeo de explicação das funcionalidades: https://drive.google.com/file/d/1HKjCR4Q5tont4Mes709Df-r-_aQN6mNX/view?usp=sharing


# Funcionalidades Implementadas

## **1. Nova Tabela de Reviews**

Foi criada a tabela **reviews** para permitir que usuários avaliem livros cadastrados no sistema.

### Principais implementações:

* Tabela **reviews** com os campos: id, livro_id, usuario_id, nota, comentario, criado_em. O arquivo sqlite.js está em ```backend\src\database\sqlite.js```.
* Relação *1:N* entre **livros** e **reviews**.
* Endpoint para cadastrar novas avaliações.
* Cálculo da média das notas no backend.
* Exibição no frontend de reviews e avaliação média.

## **2. Tema Claro/Escuro no Front-End**

Tema dark/light totalmente funcional em toda a aplicação.

### Principais pontos implementados:

* Criação do **ThemeContext** gerenciando o estado global do tema.
* Persistência no **localStorage** para manter o tema escolhido ao recarregar.
* Botão no Header para alternar entre **Claro** e **Escuro**.
* Classes CSS condicionais aplicadas globalmente.
* Ajustes de cores, backgrounds, bordas e fontes em páginas, cards e componentes.



## **3. Sistema de Favoritos**

Usuários autenticados podem favoritar e desfavoritar livros.

### Implementações realizadas:

* Criação da tabela **favoritos** (usuario_id, livro_id).
* Rotas para adicionar/remover favoritos.
* Serviço no frontend para consumir essas rotas.
* Ícone dinâmico no card de cada livro mostrando se está favoritado.
* Página **MeusFavoritos.jsx** com listagem de livro favoritados.



#  Como Executar o Sistema

## **1. Instalar dependências**

Instale as dependencias no backend e no frontend

```bash
cd backend
npm install
cd ../frontend
npm install
```

## **2. Iniciar os servidores**

```bash
cd backend
npm run dev
cd ../frontend
npm run dev
```

Backend acessado em:

```
http://localhost:3333
```

Frontend acessado em:

```
http://localhost:3000
```

---