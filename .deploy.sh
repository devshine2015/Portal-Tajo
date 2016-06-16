#!/usr/bin/env bash
DIR='build'
TARGET_FOLDER='~/driver-server/static-root/public/common-portal/'
FOLDER_NAME='tajo'

echo "clean and build sources"
rm -r tajo
npm run build:clean
npm run build
mv $DIR $FOLDER_NAME

echo "upload $FOLDER_NAME to $1"
ssh $1 "cd $TARGET_FOLDER && rm -r $FOLDER_NAME"
scp -r $FOLDER_NAME $1:$TARGET_FOLDER