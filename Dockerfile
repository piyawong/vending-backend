FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN apk add --no-cache python3 make g++ && \
    yarn install --frozen-lockfile && \
    apk del python3 make g++

COPY . .

RUN yarn build

EXPOSE 8089

CMD ["node", "dist/main.js"]