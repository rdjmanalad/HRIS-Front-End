FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --save --legacy-peer-deps

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]