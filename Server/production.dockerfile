FROM node:7-alpine

RUN mkdir /app

WORKDIR /app
ADD package.json /app/package.json
RUN npm install --production

ADD index.js /app/index.js
ADD /src /app/src

EXPOSE 3000

ENV NODE_ENV=Production
CMD npm start