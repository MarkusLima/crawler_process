# CrawlersPython

## Visão Geral do Projeto

O **CrawlersPython** é uma aplicação desenvolvida em Python para automatizar a coleta, análise e processamento de dados jurídicos provenientes de diferentes fontes. Utiliza FastAPI para expor endpoints REST, Selenium para automação de navegação web, BeautifulSoup para parsing de HTML, e SQLAlchemy para persistência dos dados em banco de dados MySQL.

---

## Requisitos para Execução Local

- Python 3.8+
- MySQL (ou outro banco compatível)
- Google Chrome (para automação com Selenium)
- [Chromedriver](https://chromedriver.chromium.org/downloads) compatível com sua versão do Chrome

---

## Instruções de Instalação e Execução

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/CrawlersPython.git
   cd CrawlersPython
   ```

2. **Crie um ambiente virtual:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. **Instale as dependências:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as configurações do banco de dados e outras variáveis necessárias.

5. **Execute a aplicação:**
   ```sh
   uvicorn app.main:app --reload
   ```

---

## Exemplos de Requisições à API

- **Obter todos os processos:**
  ```http
  GET /processos
  ```

- **Adicionar um novo processo:**
  ```http
  POST /processos
  Content-Type: application/json

  {
    "numero_processo": "1234567-89.2023.8.26.0000",
    "autores": "João da Silva",
    "advogados": "Maria Oliveira",
    "reu": "INSS",
    "status": "nova",
    "link": "https://exemplo.com/processo/123"
  }
  ```

- **Buscar por número do processo:**
  ```http
  GET /processos/1234567-89.2023.8.26.0000
  ```

---

## Explicação do Fluxo de Trabalho do Kanban

O projeto segue um fluxo de trabalho Kanban para organização das tarefas:

1. **Backlog:**  
   Todas as ideias, melhorias e bugs são listados nesta coluna.

2. **A Fazer:**  
   Tarefas priorizadas e prontas para serem desenvolvidas.

3. **Em Progresso:**  
   Tarefas que estão sendo desenvolvidas no momento.

4. **Revisão:**  
   Tarefas concluídas aguardando revisão de código ou testes.

5. **Concluído:**  
   Tarefas finalizadas e integradas ao projeto principal.

Esse fluxo garante transparência, organização e agilidade no desenvolvimento, facilitando o acompanhamento do progresso e a priorização das demandas.

---

> Para dúvidas ou sugestões, abra uma issue no repositório!