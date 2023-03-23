#!/bin/bash

find . -name "*.rst" -type f -print0 | while read -r -d '' filename; do


  tmpfile=$(mktemp)

  grep -v -e '^\.\. meta::' -e ':description:' -e ':keywords:' "$filename" > "$tmpfile"


  cat "$tmpfile" > "$filename"


  rm "$tmpfile"

done
