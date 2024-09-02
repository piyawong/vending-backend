FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN apk add --no-cache python3 make g++ && \
    yarn install --frozen-lockfile && \
    apk del python3 make g++

RUN yarn install

COPY . .

RUN yarn global add nodemon

EXPOSE 8089

CMD ["nodemon", "src/main.ts"]