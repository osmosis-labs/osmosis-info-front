#!/usr/bin/env sh
set -eu

# Replace PORT in nginx config
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Replace API_URL in `config.js`
echo window.API_URL = \"${API_URL}\" > /usr/share/nginx/html/config.js

exec "$@"
