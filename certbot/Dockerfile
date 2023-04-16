FROM certbot/certbot

RUN apk --no-cache add openssl

ENV domains="hiremenow-ai.com"
ENV path="/etc/letsencrypt/live/${domains}"

RUN mkdir -p ${path}

RUN openssl req -x509 -nodes -newkey rsa:4096 -days 1\
    -keyout "${path}/privkey.pem" \
    -out "${path}/fullchain.pem" \
    -subj '/CN=localhost' && echo "successed!"
