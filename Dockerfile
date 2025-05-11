# ----- Dependencies

FROM node:22-alpine3.20 AS deps

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# ----- Build

FROM node:22-alpine3.20 AS build

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules node_modules

COPY . .

RUN npm run build

# ----- Final

FROM node:22-alpine3.20

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist dist

COPY package*.json .

RUN npm ci

USER node

CMD [ "npm", "run", "start" ]
