FROM node:16-alpine


WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate


EXPOSE 3000


CMD ["node","index.js"]