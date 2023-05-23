#!/bin/bash

if [[ $1 == "django" ]]; then
    ./bin/make_docker_compose.sh dev
    docker stop django_container
    docker kill django_container
    source activate hire_me_now
    pip install $2
    docker-compose up --build django

elif [[ $1 == "react" ]]; then
    cd react && npm install $2 --save

elif [[ $1 == "express" ]]; then
    cd express && npm install $2 --save

elif [[ $1 == "--deploy" || $1 == "-d" ]]; then
    ./bin/make_docker_compose.sh deploy
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    echo "y" | docker system prune -a
    echo "y" | docker builder prune --all
    
    if [[ $2 == "--local" || $2 == "-l" ]]; then
        cd certbot && ./init-letsencrypt.sh local && cd ..
    elif [[ $2 == "--renew" || $2 == "-r" ]]; then
        cd certbot && ./init-letsencrypt.sh && cd ..
    fi

    docker-compose up --build

elif [[ $1 == "--build" || $1 == "-b" ]]; then
    cd react && npm run build

elif [[ $1 == "--clear" || $1 == "-c" ]]; then
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    docker volume rm $(docker volume ls -q)
    echo "y" | docker system prune -a
    echo "y" | docker builder prune --all
    git remote prune origin

elif [[ $1 == "--rebuild" || $1 == "-r" ]]; then
    if [ -z "$2" ]; then
        ./bin/make_docker_compose.sh dev
    else
        ./bin/make_docker_compose.sh $2
    fi
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    docker volume rm $(docker volume ls -q)
    echo "y" | docker system prune -a
    echo "y" | docker builder prune --all
    echo "Notice! If you run this locally, you may need to run:"
    echo ""
    echo "      ./dev.sh ngrok   # This is for generating a temporary website link for testing stripe"
    echo ""

    read -p "Have you read and understood the notice? (y/n) " choice
    if [[ "$choice" == "y" || "$choice" == "yes" ]]; then
        echo "Thank you!"
    else
        echo "Please read and understand the notice before proceeding."
        exit 1
    fi
    docker-compose up --build
    
elif [[ $1 == "--install" || $1 == "-i" ]]; then
    cd react && npm install --save
    cd ../express && npm install --save

elif [[ $1 == "ngrok"  ]]; then
    ngrok http 9000

elif [ -z "$1" ]; then
    docker-compose up
    echo "Notice! If you run this locally, you may need to run:"
    echo ""
    echo "      ./dev.sh ngrok"
    echo ""

else
    if [[ $1 != "--help" && $1 != "-h" ]]; then
        echo ""
        echo "Error: unknown command '$1'."
        
    fi
    echo ""
    echo "Usage: ./dev.sh [OPTIONS] [SERVICE] [PACKAGE]"
    echo ""
    echo "./dev.sh                  Start all Docker containers and build them if not exist"
    echo ""
    echo "OPTIONS:"
    echo "  -b, --build             Build the React app"
    echo "  -c, --clear             Remove all Docker containers and images, and prune the system"
    echo "  -d, --deploy [OPTION2]  Deploy the app using Docker Compose, nginx, and Let's Encrypt (deploy mode)"
    echo "                          OPTION2:"
    echo "                             -l              Use fake certification"
    echo "                             -r              renew certification"
    echo "  -i, --install           Install all dependencies for the React and Express apps"
    echo "  -r, --rebuild [OPTION2] Rebuild all Docker containers from scratch (dev mode)"
    echo "                          OPTION2:"
    echo "                             dev             recreate dev mode docker-compose. By default, it's dev"
    echo "                             deploy          recreate deploy mode docker-compose"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Service and package installation:"
    echo "  django  <package>       Install a Django package with pip and restart the Django container (dev mode)"
    echo "  react   <package>       Install an npm package for React"
    echo "  express <package>       Install an npm package for Express"
    echo "  ngrok                   Start a ngrok service"
    echo ""
fi