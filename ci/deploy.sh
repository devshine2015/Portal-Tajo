#!/usr/bin/env bash
TAJO=$2
PORTAL=$3
TARGET_FOLDER="$4/static-root/public"
TAJO_FOLDER="builds/prod/$TAJO"
PORTAL_FOLDER="builds/prod/$PORTAL"

echo "clean and build sources"
npm run clean
npm run build:$TAJO
npm run build:$PORTAL

echo "erase projects on server"
ssh $1 "cd $TARGET_FOLDER && rm -r $TAJO $PORTAL"

echo "copy files of $TAJO and $PORTAL to $TARGET_FOLDER"
scp $PORTAL_FOLDER/* $1:$TARGET_FOLDER
scp -r $TAJO_FOLDER $1:$TARGET_FOLDER