#!/usr/bin/env bash
PROJECT='ssreports'
TARGET_FOLDER='~/driver-server/static-root/public/common-portal/'
FOLDER_NAME='ssreports'

echo "clean and build sources"
rm -r $PROJECT
npm run build:$PROJECT

echo "erase $FOLDER_NAME"
ssh $1 "cd $TARGET_FOLDER && rm -r $FOLDER_NAME"

echo "upload $FOLDER_NAME to $1"
scp -r $FOLDER_NAME $1:$TARGET_FOLDER