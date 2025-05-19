FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod -R 777 /app

EXPOSE 3003

CMD ["npm", "run", "start"]