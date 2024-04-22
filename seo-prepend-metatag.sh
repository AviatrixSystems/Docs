
directory="."

meta_content=".. meta::\n   :name=\"robots\": content=\"noindex, nofollow\""


find "$directory" -name "*.rst" -type f -print0 | while read -r -d '' file; do

    if ! grep -Fxq ".. meta::" "$file"; then

        tmpfile=$(mktemp)

        echo -e "$meta_content\n" > "$tmpfile"
