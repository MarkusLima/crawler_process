# BackEndCrawler

## Visão Geral do Projeto

O **BackEndCrawler** é uma aplicação Node.js baseada em Express, estruturada para realizar o gerenciamento e processamento de dados extraídos (scraping) de fontes externas. O projeto segue uma arquitetura MVC, separando responsabilidades entre Controllers, Services, Models e demais utilitários, facilitando a manutenção e escalabilidade.

## Requisitos para Execução Local

- Node.js (versão 16 ou superior)
- npm (Node Package Manager)
- Banco de dados relacional (MySQL, MariaDB ou compatível)
- Variáveis de ambiente configuradas no arquivo `.env`

## Instruções de Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd BackEndCrawler
   ```

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

## Configuração do Projeto

Preencha o arquivo `.env` informando todos os campos necessários.

Para criar as tabelas no banco de dados, execute:

`npm run dev`

## Executando o Projeto

Para iniciar o servidor, execute:

`npm run dev`

## Endpoints da API

### GET /processos?keyword=palavra

### GET /processos?date_initial=2024-01-01&date_final=2024-01-31

### PUT /processos/:id/status
Content-Type: application/json

```json
{
  "status": "finalizado"
}
```
