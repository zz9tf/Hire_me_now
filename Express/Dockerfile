FROM node:19-slim

RUN npm install -g nodemon

WORKDIR /express

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]