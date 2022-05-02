FROM node:16.15.0-alpine3.14

WORKDIR /usr/src/app

COPY . .

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]
