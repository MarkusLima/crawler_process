FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cp /app/.env.example /app/.env

RUN chmod -R 777 /app

RUN ls -l /app
RUN cat /app/.env.example || echo "Arquivo .env.example não encontrado"

EXPOSE 3003

CMD ["npm", "run", "start"]