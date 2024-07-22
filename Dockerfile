FROM node:21-alpine

WORKDIR /msm-app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]

