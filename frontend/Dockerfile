FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

RUN chmod -R 777 /app

EXPOSE 5173

COPY .env.example .env

CMD ["npm", "run", "dev", "--", "--host"]