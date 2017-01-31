#!/usr/bin/env bash

HOST='drvrprod@drvrprod2216.cloudapp.net'
PUBLIC='~/engine/static-root/public'

parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

sh $parent_path/commonDeploy.sh $HOST $PUBLIC
