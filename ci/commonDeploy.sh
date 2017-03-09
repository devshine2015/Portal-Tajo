#!/usr/bin/env bash

ESCAPE='tajo'
SUNSHINE='portal'
HOST=$1
PUBLIC=$2
BACKUP_FOLDER='public_backup'

# server env defines how to build sources
# could be 'dev' or 'prod'
SERVER_ENV=$3
EXTRA_FOLDER=$4

if [ ! -z $EXTRA_FOLDER ] ; then
  TARGET_FOLDER="$PUBLIC/$EXTRA_FOLDER"
else
  TARGET_FOLDER=$PUBLIC
fi

ESCAPE_FOLDER="builds/$SERVER_ENV/$ESCAPE"
SUNSHINE_FOLDER="builds/$SERVER_ENV/$SUNSHINE"

echo "rebuild static sources..."
npm run clean

echo $SERVER_ENV

if [ $SERVER_ENV = "prod" ] ; then
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

  if [ $SERVER_ENV = "dev" ] ; then
    echo "Creating backup copy of current runnnig version..."
    
    # 0. cd to public folder
    # 1. create backup folder if it not exist
    # 2. remove content of backup folder
    # 3. copy content from public folder to backup folder
    ssh $HOST "cd $PUBLIC && mkdir -p ../$BACKUP_FOLDER && rm -r ../$BACKUP_FOLDER/* && cp -r ./* ../$BACKUP_FOLDER"    
  fi

  echo "erase root escape and sunshine files..."
  ssh $HOST "cd $PUBLIC && rm -r $ESCAPE js css fonts .htaccess index.html manifest.json favicon.ico"
fi


echo "copy static files to server..."
scp -r $SUNSHINE_FOLDER/* $HOST:$TARGET_FOLDER
scp -r $ESCAPE_FOLDER $HOST:$TARGET_FOLDER
