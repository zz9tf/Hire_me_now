#!/bin/bash

if [[ $1 == "--help" || $1 == "-h" ]]; then
    echo "Usage: ./run_container.sh [OPTIONS] [SERVICE] [PACKAGE]"
    echo ""
    echo "Options:"
    echo "  -h, --help             Show this help message"
    echo "  -r, --rebuild          Rebuild all containers"
    echo "  -i, --install          Install packages for react and express"
    echo ""
    echo "Containers's packages install:"
    echo "  django <package>       Django install package with pip install and restart django container"
    echo "  react <package>        Install npm package for react"
    echo "  express <package>      Install npm package for express"
    echo ""
else
    if [[ $1 == "--rebuild" || $1 == "-r" ]]; then
        docker rm -vf $(docker ps -aq)
        docker rmi -f $(docker images -aq)
        docker-compose up

    elif [[ $1 == "--install" || $1 == "-i" ]]; then
        cd react && npm install --save
        cd ../express && npm install --save

    elif [[ $1 == "django" ]]; then
        source activate hire_me_now
        pip install $2
        docker-compose up -d django

    elif [[ $1 == "react" ]]; then
        cd react && npm install $2 --save

    elif [[ $1 == "express" ]]; then
        cd express && npm install $2 --save

    else
        docker-compose up
        
    fi
fi
