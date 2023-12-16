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
FROM nginx:1.23.1-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

ENV PORT 8080
ENV API_URL "https://api-osmosis.imperator.co/"

COPY docker/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/docker-entrypoint.sh /bin/

RUN chmod +x /bin/docker-entrypoint.sh
ENTRYPOINT ["/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
