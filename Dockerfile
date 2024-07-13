FROM node:21-alpine

WORKDIR /msm-app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["node", "./src/index.js"]