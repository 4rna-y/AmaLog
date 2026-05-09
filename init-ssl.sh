#!/bin/bash

EMAIL=$1

# webroot 方式に変更 (Nginx が起動している前提)
sudo certbot certonly \
  --webroot \
  -w /var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d 4rnay.net \
  -d www.4rnay.net \
  -d portfolio.4rnay.net

echo "Complete"
