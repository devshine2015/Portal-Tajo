#!/bin/sh

BRANCH = git symbolic-ref HEAD | sed 's!refs\/heads\/!!'

if [ $BRANCH = 'master' ] then
  VERSION='patch'

  npm --no-git-tag-version version $VERSION
fi

exit 0