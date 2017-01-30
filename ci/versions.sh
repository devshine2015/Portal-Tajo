#!/usr/bin/env bash

BRANCH=$1
V=$2

npm version $V

git push origin $BRANCH