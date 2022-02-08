FROM node:14.16.0-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]
