FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 5003

CMD [ "node", "index.js" ]

