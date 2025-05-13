# ----- Dependencies

FROM node:22-alpine3.20 AS deps

WORKDIR /usr/src/app

COPY package*.json .

COPY prisma prisma

RUN npm ci && npm run prisma generate

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

COPY prisma prisma

COPY package*.json .

RUN npm ci && npm run prisma generate

USER node

CMD [ "npm", "run", "start" ]
