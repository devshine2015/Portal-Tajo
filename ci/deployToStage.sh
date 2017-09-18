#!/usr/bin/env bash

HOST='drvrstage@drvrstage.cloudapp.net'
PUBLIC='~/engine/static-root/public'

parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

sh $parent_path/commonDeploy.sh $HOST $PUBLIC 'dev'