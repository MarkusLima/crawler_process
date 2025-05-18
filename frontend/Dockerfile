FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

RUN chmod -R 777 /app

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]