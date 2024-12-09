FROM node:18

WORKDIR /home/app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run","dev"]