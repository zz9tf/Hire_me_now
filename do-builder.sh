#!/bin/bash

if [[ $1 == "deploy" ]]; then
  cat > docker-compose.yml <<EOF
version: '3'

services:
  # Deploy mode  
  react:
    image: zz9tf/react
    build: 
      context: ./react
      dockerfile: Dockerfile.deploy
    ports:
      - "80:80"
      - "443:443"
    expose:
      - "80"
    volumes:
      - ./react/nginx.conf:/etc/nginx/nginx.conf/:ro
      - ./certbot/conf:/etc/letsencrypt:ro
      - ./certbot/www:/var/www/certbot/:ro
    container_name: react_container
    env_file: ./react/.env
    depends_on:
      - certbot
    command: "/bin/sh -c 'while :; do sleep 6h & wait \$\${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/conf:/etc/letsencrypt/:rw
      - ./certbot/www:/var/www/certbot/:rw
    container_name: certbot_container
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait \$\${!}; done;'"

  express:
    image: zz9tf/express
    build: 
      context: ./express
      dockerfile: Dockerfile
    ports:
      - "9000:9000"
    volumes:
      - ./express:/express/:ro
    container_name: express_container
    env_file: ./express/.env
  
  django:
    image: zz9tf/django
    build: 
      context: ./django
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./django:/django/:ro
    container_name: django_container
    env_file: ./django/.env
EOF
  echo "Deploy docker-compose.yml file generated!"

elif [[ $1 == "dev" ]]; then
  cat > docker-compose.yml <<EOF
version: '3'

services:
  # Develop mode
  react:
    image: zz9tf/react
    build: 
      context: ./react
      dockerfile: Dockerfile.development
    ports:
      - "80:80"
    volumes:
      - ./react:/react
    container_name: react_container
    env_file: ./react/.env

  express:
    image: zz9tf/express
    build: 
      context: ./express
      dockerfile: Dockerfile
    ports:
      - "9000:9000"
    volumes:
      - ./express:/express
    container_name: express_container
    env_file: ./express/.env
  
  django:
    image: zz9tf/django
    build: 
      context: ./django
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./django:/django
    container_name: django_container
    env_file: ./django/.env
EOF
  echo "Dev docker-compose.yml file generated!"
fi
