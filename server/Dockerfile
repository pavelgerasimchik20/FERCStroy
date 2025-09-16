FROM node:22-bullseye

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .

RUN npx tsc

EXPOSE 4000
CMD ["node", "dist/server.js"]

