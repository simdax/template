#!/bin/sh

## install node via NVM

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install node

## copy this repo

git clone http://github.com/simdax/template myProject

## launch the bouzin

cd myProject
npm install
gulp run
