FROM node:20

WORKDIR /usr/src/app

ENV MONGODB_URI=mongodb://root:password@localhost:3456/music-app-db

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]