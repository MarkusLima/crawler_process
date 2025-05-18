1. Instale as dependências:

pip install -r requirements.txt
python.exe -m pip install --upgrade pip

2. Rode o agendador:

python -m scheduler.scheduler

3. Inicie a API:

uvicorn app.main:app --reload

