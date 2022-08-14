FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 5002

CMD [ "node", "index.js" ]

