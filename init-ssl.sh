#!/bin/bash

EMAIL=$1

sudo certbot certonly \
  --standalone \
  --preferred-challenges http \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d 4rnay.net \
  -d portfolio.4rnay.net

echo "Complete"
