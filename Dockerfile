FROM node:16-alpine


WORKDIR /app

COPY . .

RUN npm install
ENV DATABASE_URL

EXPOSE 3000


CMD ["node","index.js"]