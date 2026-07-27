FROM node:22-slim

WORKDIR /app

COPY . /app

RUN npm install
RUN npx prisma generate

EXPOSE 8000

CMD ["node", "server.js"]