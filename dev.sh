#!/bin/bash

if [[ $1 == "--help" || $1 == "-h" ]]; then
    echo "Usage: ./run_container.sh [OPTIONS] [SERVICE] [PACKAGE]"
    echo ""
    echo "Options:"
    echo "  -h, --help          show help"
    echo "  --rebuild           rebuild all containers"
    echo ""
    echo "Containers's packages install:"
    echo "  django <package>    Django install package with pip install and restart django container"
    echo "  react <package>     npm install for react"
    echo "  express <package>   npm install for express"
    echo ""
elif [[ $1 == "--rebuild" ]]; then
    docker-compose up --force-recreate --build
elif [[ $1 == "django" ]]; then
    source activate hire_me_now
    pip install $2
    docker-compose up -d django
elif [[ $1 == "react" ]]; then
    cd react && npm install $2
elif [[ $1 == "express" ]]; then
    cd express && npm install $2
else
    docker-compose up
fi
