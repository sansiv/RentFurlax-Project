FROM --platform=linux/amd64 node:21-alpine

WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]