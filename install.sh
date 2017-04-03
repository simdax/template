#!/bin/sh

mkdir vendor
cd vendor
https://github.com/creationix/nvm

./nvm-master/install.sh
nvm install node

cd ..
npm install -g gulp
npm install