#!/usr/bin/env bash

TAJO='tajo'
PORTAL='portal'
HOST=$1
PUBLIC=$2
ENV=$3
EXTRA_FOLDER=$4

if [ ! -z $EXTRA_FOLDER ] ; then
  TARGET_FOLDER="$PUBLIC/$EXTRA_FOLDER"
else
  TARGET_FOLDER=$PUBLIC
fi

TAJO_FOLDER="builds/prod/$TAJO"
PORTAL_FOLDER="builds/prod/$PORTAL"

echo "rebuild static sources..."
npm run clean
if [ $ENV == 'production' ] ; then
  npm run build:escape
  npm run build:sunshine
else
  npm run build:escape-dev
  npm run build:sunshine-dev
fi


if [ ! -z $EXTRA_FOLDER ] ; then
  echo "Extra folder $EXTRA_FOLDER detected"

  if (ssh $HOST "[ -d $PUBLIC/$EXTRA_FOLDER ]"); then
    echo "$EXTRA_FOLDER already exists - remove and create again..."
    ssh $HOST "cd $PUBLIC && rm -r $EXTRA_FOLDER && mkdir $EXTRA_FOLDER"
  else
    echo "$EXTRA_FOLDER not exist - creating..."
    ssh $HOST "cd $PUBLIC && mkdir $EXTRA_FOLDER"
  fi

else
  echo "erase root tajo and portal files..."
  ssh $HOST "cd $PUBLIC && rm -r $TAJO js css fonts .htaccess index.html manifest.json favicon.ico"
fi


echo "copy static files to server..."
scp -r $PORTAL_FOLDER/* $HOST:$TARGET_FOLDER
scp -r $TAJO_FOLDER $HOST:$TARGET_FOLDER
