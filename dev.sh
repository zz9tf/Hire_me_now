#!/bin/bash

if [[ $1 == "django" ]]; then
    ./do-builder.sh dev
    source activate hire_me_now
    pip install $2
    docker-compose up -d django

elif [[ $1 == "react" ]]; then
    cd react && npm install $2 --save

elif [[ $1 == "express" ]]; then
    cd express && npm install $2 --save

elif [[ $1 == "--deploy" || $1 == "-d" ]]; then
    ./do-builder.sh deploy
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    echo "y" | docker system prune -a
    echo "y" | docker builder prune --all
    rm -rf ./certbot/conf/*
    cd certbot && ./init-letsencrypt.sh && cd ..
    docker-compose up --build

elif [[ $1 == "--build" || $1 == "-b" ]]; then
    cd react && npm run build

elif [[ $1 == "--clear" || $1 == "-c" ]]; then
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    echo "y" | docker system prune -a
    echo "y" | docker builder prune --all
    git remote prune origin

elif [[ $1 == "--rebuild" || $1 == "-r" ]]; then
    ./do-builder.sh dev
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    echo "y" | docker system prune -a
    echo "y" | docker builder prune --all
    docker-compose up --build

elif [[ $1 == "--install" || $1 == "-i" ]]; then
    cd react && npm install --save
    cd ../express && npm install --save

elif [ -z "$1" ]; then
    ./do-builder.sh dev
    docker-compose up

else
    if [[ $1 != "--help" && $1 != "-h" ]]; then
        echo ""
        echo "Error: unknown command '$1'."
        
    fi
    echo ""
    echo "Usage: ./dev.sh [OPTIONS] [SERVICE] [PACKAGE]"
    echo ""
    echo "OPTIONS:"
    echo "  -b, --build            Build the React app"
    echo "  -c, --clear            Remove all Docker containers and images, and prune the system"
    echo "  -d, --deploy           Deploy the app using Docker Compose and Let's Encrypt"
    echo "  -i, --install          Install all dependencies for the React and Express apps"
    echo "  -r, --rebuild          Rebuild all Docker containers from scratch"
    echo "  -h, --help             Show this help message"
    echo ""
    echo "Service and package installation:"
    echo "  django  <package>       Install a Django package with pip and restart the Django container"
    echo "  react   <package>        Install an npm package for React"
    echo "  express <package>      Install an npm package for Express"
    echo ""
fi