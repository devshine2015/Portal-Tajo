#!/usr/bin/env bash
HOST='ddsdev@ddsdev.cloudapp.net'
TAJO=$1
PORTAL=$2
EXTRA_FOLDER=$3

if [ $EXTRA_FOLDER -n ] ; then
  TARGET_FOLDER="~/driver-server/static-root/public/$EXTRA_FOLDER"
else
  TARGET_FOLDER="~/driver-server/static-root/public"
fi

TAJO_FOLDER="builds/prod/$TAJO"
PORTAL_FOLDER="builds/prod/$PORTAL"

echo "clean and build sources"
npm run clean
npm run build:$TAJO
npm run build:$PORTAL

echo "erase projects on server"
ssh $HOST "cd $TARGET_FOLDER && rm -r $TAJO $PORTAL"

echo "copy files of customer portal to root\ntajo to $TARGET_FOLDER"
scp -r $PORTAL_FOLDER/* $HOST:$TARGET_FOLDER
scp -r $TAJO_FOLDER $HOST:$TARGET_FOLDER