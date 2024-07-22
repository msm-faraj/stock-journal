FROM node:21-alpine

RUN npm install -g nodemon

WORKDIR /msm-app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]

