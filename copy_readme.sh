#!/bin/bash


RAISE=0

for package in $(ls packages); do
rsync README.md packages/$package --info=NAME --update | grep .
if [ $? -eq 0 ]; then
  # files were transferred
   RAISE=1
fi
done

if [ $RAISE -eq 1 ];then
    exit 1
fi
