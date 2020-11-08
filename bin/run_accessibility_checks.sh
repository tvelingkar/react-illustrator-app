#!/usr/bin/env bash
yarn start

sleep 10

npx achecker --failLevels violation http://localhost:3000/
npx achecker --failLevels violation http://localhost:3000/add-todo
