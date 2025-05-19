FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .

RUN chmod -R 777 /app

ARG VITE_BACK_END_URL
ENV VITE_BACK_END_URL=$VITE_BACK_END_URL

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]