#!/usr/bin/env bash

V=$1

ssh-add $HOME/.ssh/id_circleci_github

git config --global user.email "circle@circle.drvr.co"
git config --global user.name "$CIRCLE_USERNAME"

npm version $V

git push origin $CIRCLE_BRANCH