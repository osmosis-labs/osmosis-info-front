# Builder
FROM node:16 AS builder

WORKDIR /app

ENV NODE_ENV production
COPY package*.json /app/
COPY .yarnrc /app/
COPY config-overrides.js /app/
RUN yarn

COPY . /app/
RUN yarn buildProd

# Serve build folder via NGINX
FROM nginx:1.21.6-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]