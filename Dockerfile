FROM node:14.18.2-alpine3.14

WORKDIR /usr/src/app

COPY . .

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]
