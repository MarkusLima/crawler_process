# FrontEndCrawler

## Visão Geral do Projeto

O **FrontEndCrawler** é uma aplicação web desenvolvida com React, TypeScript e Vite, que oferece um painel Kanban para gerenciamento de publicações de processos jurídicos. O sistema permite login, cadastro de usuários e movimentação de processos entre diferentes etapas do fluxo de trabalho.

## Requisitos para Execução Local

- Node.js (versão 18 ou superior recomendada)
- npm ou yarn
- Backend disponível e configurado (ver variável `VITE_BACK_END_URL`)

## Instruções de Instalação e Execução

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repositorio>
   cd FrontEndCrawler
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` para `.env` e ajuste a URL do backend se necessário.

4. **Execute o projeto em modo desenvolvimento:**
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

## Exemplos de Requisições à API

As requisições são feitas via [`api`](src/services/api.ts):

- **Login**
  ```json
  POST /users/login
  {
    "email": "usuario@email.com",
    "password": "suaSenha"
  }
  ```
- **Cadastro**
  ```json
  POST /users/register
  {
    "username": "Nome Completo",
    "email": "usuario@email.com",
    "password": "SenhaForte123!",
    "confirm_password": "SenhaForte123!"
  }
  ```
- **Listar Processos**
  ```
  GET /process/list?keyword=&date_initial=&date_finish=
  ```
- **Atualizar Status do Processo**
  ```json
  PUT /process/update/:id
  {
    "status": "lida" // ou "enviar", "concluido"
  }
  ```

## Explicação do Fluxo de Trabalho do Kanban

O painel Kanban possui quatro colunas principais:

1. **Nova Publicação:** Processos recém-chegados.
