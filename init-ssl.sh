#!/bin/bash

set -e

DOMAIN=$1
EMAIL=$2

sudo certbot certonly \
  --standalone \
  --preferred-challenges http \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN

cp nginx/nginx.conf nginx/nginx.conf.bak
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/nginx.conf

