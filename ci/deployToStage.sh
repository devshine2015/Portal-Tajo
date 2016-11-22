#!/usr/bin/env bash
HOST='drvrstage@drvrstage.cloudapp.net'
PUBLIC='~/engine/static-root/public'
EXTRA_FOLDER=$1

parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

sh $parent_path/commonDeploy.sh $HOST $PUBLIC $EXTRA_FOLDER