FROM node:7-alpine

RUN mkdir /app

RUN npm install nodemon -g

WORKDIR /app
ADD package.json /app/package.json
RUN npm install

EXPOSE 3000

ENV NODE_ENV=Development
CMD npm run serve