# Crawler Process

## Sobre o Projeto

O **Crawler Process** é uma aplicação desenvolvida para automatizar a extração de dados de publicações judiciais do site do TJSP (Tribunal de Justiça de São Paulo). O sistema realiza buscas avançadas, coleta informações relevantes, processa arquivos PDF e armazena os dados extraídos em um banco de dados MySQL para posterior análise e consulta.

## Tecnologias Utilizadas

- **Python 3.11** — Backend principal e scripts de scraping
- **Node.js 18** — Backend auxiliar (caso aplicável)
- **Selenium + undetected-chromedriver** — Automação de navegação web
- **MySQL** — Banco de dados relacional
- **mysql-connector-python** — Driver de conexão Python/MySQL (sem ORM)
- **Uvicorn** — Servidor ASGI para FastAPI
- **Google Chrome** — Navegador utilizado pelo Selenium
- **Docker & Docker Compose** — Containerização e orquestração dos serviços

## Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/MarkusLima/crawler_process
   cd crawler_process
   ```

2. **Suba os containers Docker:**

   ```sh
   docker compose -f 'docker-compose.yml' up -d --build
   ```

3. **Acesse os serviços:**

    - **Backend Python:** http://localhost:8000
    - **Backend Node (Express):** http://localhost:3003
    - **Frontend React:** http://localhost:5173
    - **MySQL:** Porta padrão 3306 (verifique as credenciais no `.env` ou Docker Compose)
    - **PhpMyAdmin:** http://localhost:8080

4. **Descrição do fuxo de trabalho do web crawler**
    - Robo 1. scheduled_job
        -- Pode ser acionado pela rota GET http://localhost:8000/scheduled_job ou executado automático em horários determinado
    - 1. Navega até a tela ao qual realizará a busca no formulário
    - 2. No formulário preeenche os campos e clicka no botão submit
    - 3. Navega por todas as paginas e captura o link ao qual esta o PDF online
    - 4. Salva no banco de dados com status "captured".

    - Robo 2. schreduler_job_details_content
        -- Pode ser acionado pela rota GET http://localhost:8000/schreduler_job_details_content ou executado automático em horários determinado
    - 1. Vai no banco de dados e pega todos os process com status "captured" 
    - 2. Pega o link de cada um e navega até o PDF online
    - 3. Captura o texto do PDF
    - 4. Atualiza o process no banco com as informações capturadas com status "processed".

    - Robo 3. schreduler_job_complete_infos
        -- Pode ser acionado pela rota GET http://localhost:8000/schreduler_job_complete_infos ou executado automático em horários determinado
    - 1. Vai no banco de dados e pega todos os process com status "processed" 
    - 2. Pega o texto capturado no PDF de cada process
    - 3. Envia o texto para a IA e manda ela retornar os campos determinados
    - 4. Atualiza o process no banco com as informações capturadas pela IA com status "new".

5. **BackEnd**

# Estrutura do Projeto

Este projeto é uma aplicação Node.js que utiliza o framework Express. Abaixo, está a descrição de cada diretório e arquivo, detalhando suas responsabilidades dentro do projeto.

## Diretórios

### `/app`
Contém a lógica central da aplicação, estruturada em subdiretórios específicos para organização e separação de responsabilidades.

### `/app/Enums`
Aqui estão os conjuntos de constantes que serão utilizadas para representar e manipular grupos de valores de forma mais clara e segura.

#### `/app/Controllers`
Aqui estão os controladores que gerenciam a lógica de entrada das requisições HTTP, chamando os serviços necessários e devolvendo respostas para o cliente.

#### `/app/Request`
Aqui estão os arquivos que validam os dados recebidos das requisições HTTP que tem como objetivo de validar os dados antes de chamar os controladores. 

#### `/app/Middleware`
Middleware são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função de middleware no ciclo de requisição-resposta da aplicação. Eles são usados para executar código, fazer modificações nos objetos de req e res, e terminar o ciclo de requisição-resposta.

#### `/app/Models`
Define os modelos de dados, que representam a estrutura dos dados no banco de dados e também contém a lógica para acessar e manipular esses dados.

#### `/app/Routes`
Contém os arquivos de rotas que definem os endpoints da API e associam os controladores às rotas.

#### `/app/Services`
Este diretório abriga os serviços que contêm a lógica de negócios da aplicação, são chamados pelos controladores.

#### `/app/Utils`
Utilitários e funções auxiliares que podem ser usados em várias partes do projeto.

## Arquivos

### `server.js`
Ponto de entrada principal da aplicação, onde o servidor Express é configurado e iniciado.

### `app.js`
Usado para iniciar o servidor da aplicação, importa as configurações de `server.js`.

### `.env` e `.env.example`
Arquivos para configuração das variáveis de ambiente. `.env.example` é um modelo para `.env`.


## Endpoints da API
### **POST /users/register**

Registra um novo usuário.

**Body (JSON):**
```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "senha_segura"
}
```

---

### **POST /users/login**

Realiza o login de um usuário.

**Body (JSON):**
```json
{
  "email": "joao@email.com",
  "password": "senha_segura"
}
```

### **GET /process/list**

Retorna uma lista de processos cadastrados.

- **Autenticação:** Obrigatória (JWT ou outro método definido pelo middleware `authMiddleware`)
- **Validação:** Os parâmetros de consulta são validados por `ProcessRequest.list`.

**Exemplo de requisição:**
```
GET /process/list
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 1,
    "numero_processo": "1234567-89.2023.8.26.0000",
    "autores": "João da Silva",
    "advogados": "Maria Oliveira",
    "reu": "INSS",
    "status": "nova",
    "link": "https://exemplo.com/processo/123"
  },
  ...
]
```

---

### **PUT /process/update/:id**

Atualiza os dados de um processo específico.

- **Autenticação:** Obrigatória (JWT ou outro método definido pelo middleware `authMiddleware`)
- **Validação:** O corpo da requisição é validado por `ProcessRequest.update`.

**Parâmetros de rota:**
- `id` — ID do processo a ser atualizado

**Body (JSON):**
```json
{
  "status": "finalizado",
  "link": "https://exemplo.com/processo/123"
}
```

**Exemplo de requisição:**
```
PUT /process/update/1
Authorization: Bearer <token>
Content-Type: application/json
```

**Resposta:**
```json
{
  "message": "Processo atualizado com sucesso."
}
```

6. **FrontEnd**

### Principais Tecnologias Utilizadas

- **React 19** — Biblioteca principal para construção da interface de usuário.
- **TypeScript** — Tipagem estática para maior robustez e produtividade.
- **Vite** — Ferramenta de build e servidor de desenvolvimento rápido.
- **React Router DOM** — Gerenciamento de rotas e navegação SPA.
- **Axios** — Cliente HTTP para comunicação com as APIs backend.
- **Bootstrap** — Framework CSS para estilização responsiva.
- **react-beautiful-dnd** e **@hello-pangea/dnd** — Drag and drop para listas e quadros Kanban.
- **lucide-react** — Ícones SVG modernos para React.


### Estrutura de Pastas

- `/src`
  - `/pages` — Páginas principais da aplicação.
  - `/services` — Serviços para integração com APIs (ex: axios).
  - `/utils` — Funções utilitárias.

### Funcionalidades

- Visualização e pesquisa de processos extraídos.
- Autenticação de usuários.
- Atualização de status dos processos.
- Interface Kanban para acompanhamento do fluxo dos processos.
- Navegação SPA rápida e responsiva.

---

> O frontend comunica-se diretamente com os backends Python e Node.js via API REST, consumindo os dados extraídos e processados pelo sistema.



7. **Problemas encontrados durante o desenvolvimento da solução**

1. Achar uma forma de ler o PDF online e capturar as informações:
--- Persebi que as informações encontradas quando exbida após a etapa de perquisa no formulário avançado eram poucas e não 
satisfazia as informações, então decidi capturar a url online do PDF e salva-las para futuro tratamentos.

2. Pesquisar um meio de pegar as informações do PDF e extrair as informações necessárias sem ajuda de regex:
--- Como os textos descritos nos PDFs não seguia um padrão determinado para exibição de informações, decidi aplicar uma IA basica para 
analisar os textos e assim pegar as informações. Escolhi uma que a principio siria de fácil treinamento no futuro(não há treinei ainda).

3. Conteinizar o selenium de forma a utilizar o binario do chrome:
--- Ao colocar a aplicação dentro de um conteiner, me deparei com o problema de o conteiner não conseguir encontrar o binário do chrome(navegador) para realizar a automação(Não resolvido ainda)

4. Realizar o deploy...