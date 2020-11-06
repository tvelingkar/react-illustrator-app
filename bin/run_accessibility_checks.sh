#!/usr/bin/env bash
set -ev

./node_modules/.bin/build_docker_image.sh SEGMENT_API_KEY RHM_ENV

sleep 1

docker run -d -p 3040:3040 \
  --name ${APP_NAME} ${APP_NAME}

sleep 10

npx achecker --failLevels violation http://localhost:3000/
npx achecker --failLevels violation http://localhost:3000/add-todo

docker stop ${APP_NAME}
