FROM node:19-slim

RUN npm install -g nodemon

WORKDIR /EXPRESS

COPY package.json .

RUN npm insall

COPY . .

EXPOSE 9000

CMD ["npm", "start"]