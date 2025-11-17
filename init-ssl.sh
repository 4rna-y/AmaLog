#!/bin/bash

EMAIL=$1

sudo certbot certonly \
  --standalone \
  --preferred-challenges http \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d arnay.net \
  -d portfolio.arnay.net

echo "Complete"
