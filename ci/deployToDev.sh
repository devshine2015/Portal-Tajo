#!/usr/bin/env bash

HOST='ddsdev@ddsdev.cloudapp.net'
PUBLIC='~/driver-server/static-root/public'
EXTRA_FOLDER=$1

parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

sh $parent_path/commonDeploy.sh $HOST $PUBLIC 'dev' $EXTRA_FOLDER 
