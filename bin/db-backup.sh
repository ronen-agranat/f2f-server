#!/bin/bash

#########################
# USAGE:
#
# db-backup.sh <username>
#
# username: MySQL username; defaults to 'root'
#

USERNAME=${1+root}
FILENAME="f2f-backup.$(date "+%Y%m%dT%H%M%S").sql"

mysqldump -u$USERNAME f2f > $FILENAME

if test $? -eq 0
then
  echo $FILENAME
else
  echo "Error backing up; mysqldump exit code $?"
fi

#
#########################
