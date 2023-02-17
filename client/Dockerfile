FROM node:14.17.1

WORKDIR /app

COPY ./package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]