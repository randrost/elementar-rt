FROM node:20 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install -f

COPY . .

ENV NODE_OPTIONS=--max-old-space-size=8192

RUN npm run build:prod

# Stage 2: Serve the application with Angular SSR
FROM node:20-alpine AS serve

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist/elementar-rt /usr/src/app/dist/elementar-rt

COPY package.json package-lock.json ./

RUN npm pkg delete scripts.prepare
RUN npm install --only=production -f

EXPOSE 4000

CMD ["node", "dist/elementar-rt/server/server.mjs"]
