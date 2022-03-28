# Builder
FROM node:16 AS builder

WORKDIR /app

ENV NODE_ENV production
COPY package*.json /app/
RUN yarn install 

COPY . /app/
RUN yarn build

# Serve build folder via NGINX
FROM nginx:1.21.6-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]