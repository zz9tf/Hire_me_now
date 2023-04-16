FROM certbot/certbot

RUN apk --no-cache add openssl

RUN certbot certonly --webroot -w /var/www/certbot \
    1 \
    Zheng_5732021823@outlook.com \
    hiremenow-ai.com -d hiremenow-ai.com \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal

ENTRYPOINT [ "openssl" ]