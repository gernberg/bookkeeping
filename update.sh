#!/bin/bash
source ~/.nvm/nvm.sh
git pull
rake db:migrate
grunt build
