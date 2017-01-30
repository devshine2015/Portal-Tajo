#!/usr/bin/env bash

V=$1

npm version $V

git config --global user.email "orelmax@gmail.com"
git config --global user.name "$CIRCLE_USERNAME"

git push origin $CIRCLE_BRANCH