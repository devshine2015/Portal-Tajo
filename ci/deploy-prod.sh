#!/usr/bin/env bash
PROJECT1=$2
PROJECT2=$3
TARGET_FOLDER='~/driver-server/static-root/public/common-portal'
FOLDER_NAME1="builds/prod/$PROJECT1"
FOLDER_NAME2="builds/prod/$PROJECT2"

echo "clean and build sources"
npm run clean
npm run build:$PROJECT1
npm run build:$PROJECT2

echo "erase projects on server"
ssh $1 "cd $TARGET_FOLDER && rm -r $PROJECT1 $PROJECT2"

echo "copy files of $PROJECT1 and $PROJECT2 to $TARGET_FOLDER"
scp -r $FOLDER_NAME1 $FOLDER_NAME2 $1:$TARGET_FOLDER