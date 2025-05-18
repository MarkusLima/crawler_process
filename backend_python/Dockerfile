FROM python:3.11

WORKDIR /app

COPY requirements.txt .

RUN chmod -R 777 /app

RUN pip install -r requirements.txt

RUN apt-get install -y netcat-openbsd

COPY . .

CMD /bin/sh -c 'while ! nc -z db 3306; do echo "Aguardando MySQL..."; sleep 2; done; uvicorn app.main:app --host 0.0.0.0 --port 8000'