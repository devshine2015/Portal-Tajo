#!/usr/bin/env bash

ESCAPE='tajo'
SUNSHINE='portal'
DEALER='dealer'
SCC='scc'
DEMO='demo'
BACKUP_FOLDER='public_backup'
HOST=$1
PUBLIC=$2

# server env defines how to build sources
# could be 'dev' or 'prod'
SERVER_ENV=$3

ESCAPE_FOLDER="builds/$SERVER_ENV/$ESCAPE"
SUNSHINE_FOLDER="builds/$SERVER_ENV/$SUNSHINE"
DEALER_FOLDER="builds/$SERVER_ENV/$DEALER"
SCC_FOLDER="builds/$SERVER_ENV/$SCC"
DEMO_FOLDER="builds/$SERVER_ENV/$DEMO"

echo "rebuild static sources..."
npm run clean

echo $SERVER_ENV

if [ $SERVER_ENV = "prod" ] ; then
  npm run build:escape
  npm run build:sunshine
  npm run build:dealer
  npm run build:scc
  npm run build:demo
else
  npm run build:escape-dev
  npm run build:sunshine-dev
  npm run build:dealer-dev
  npm run build:scc-dev
  npm run build:demo-dev
fi

if [ $SERVER_ENV = "prod" ] ; then
  echo "Creating backup copy of current runnnig version..."

  # 0. cd to public folder
  # 1. create backup folder if it not exist
  # 2. remove content of backup folder
  # 3. copy content from public folder to backup folder
  ssh $HOST "cd $PUBLIC && mkdir -p ../$BACKUP_FOLDER && rm -rf ../$BACKUP_FOLDER/* && cp -r ./* ../$BACKUP_FOLDER"
fi

echo "erase files ..."
ssh $HOST "cd $PUBLIC && rm -r ./*"

echo "copy static files to server..."
echo "to $SUNSHINE folder"
scp -r $SUNSHINE_FOLDER/* $HOST:$PUBLIC
echo "to $ESCAPE folder"
scp -r $ESCAPE_FOLDER $HOST:$PUBLIC
echo "to $SCC folder"
scp -r $SCC_FOLDER $HOST:$PUBLIC
echo "to $DEMO folder"
scp -r $DEMO_FOLDER $HOST:$PUBLIC
echo "to $DEALER folder"
scp -r $DEALER_FOLDER $HOST:$PUBLIC

echo "Rename dealer to cc ..."
ssh $HOST "cd $PUBLIC && mv $DEALER/ ccmm/"
