#!/bin/bash

if [[ $1 == "deploy" ]]; then
  cat > docker-compose.yml <<EOF
version: '3'

services:
  # Deploy mode
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt/:rw
      - ./certbot/www:/var/www/certbot/:rw
    container_name: certbot_container
    # entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait 6676{!}; done;'"

  react:
    image: zz9tf/react
    build: 
      context: ./react
      dockerfile: Dockerfile.deploy
    ports:
      - 443:443
    volumes:
      - ./nginx/deploy.conf:/etc/nginx/nginx.conf/:ro
      - ./certbot/conf:/etc/letsencrypt:ro
      - ./certbot/www:/var/www/certbot/:ro
      - ./nginx/log:/var/log/nginx
    container_name: react_container
    env_file: ./react/.env
    depends_on:
      - certbot
    # command: "/bin/sh -c 'while :; do sleep 6h & wait 6676{!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

  express:
    image: zz9tf/express
    build: 
      context: ./express
      dockerfile: Dockerfile
    volumes:
      - ./express:/express/:ro
    container_name: express_container
    env_file: ./express/.env
    expose: 
      - 9000
  
  django:
    image: zz9tf/django
    build: 
      context: ./django
      dockerfile: Dockerfile
    volumes:
      - ./django:/django/:ro
    container_name: django_container
    env_file: ./django/.env
    expose: 
      - 8000
    

    
EOF
  echo "Deploy docker-compose.yml file generated!"

elif [[ $1 == "dev" ]]; then
  cat > docker-compose.yml <<EOF
version: '3'

services:
  # Develop mode
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx/develop_nginx.conf:/etc/nginx/nginx.conf/:ro
    container_name: react_container

  react:
    image: zz9tf/react
    build: 
      context: ./react
      dockerfile: Dockerfile.development
    expose:
      - 80
    volumes:
      - ./react:/react
    container_name: react_inner_container
    env_file: ./react/.env

  express:
    image: zz9tf/express
    build: 
      context: ./express
      dockerfile: Dockerfile
    expose:
      - 9000
    volumes:
      - ./express:/express
    container_name: express_container
    env_file: ./express/.env
  
  django:
    image: zz9tf/django
    build: 
      context: ./django
      dockerfile: Dockerfile
    expose:
      - 8000
    volumes:
      - ./django:/django
    container_name: django_container
    env_file: ./django/.env
EOF
  echo "Dev docker-compose.yml file generated!"
fi
