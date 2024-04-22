#!/bin/bash

# Define the directory containing the .rst files
directory="."

# Define the meta content to add
meta_content=".. raw:: html\n\n    <meta name=\"robots\" content=\"noindex, nofollow, noarchive, nosnippet, notranslate, noimageindex\">\n"

# Find all .rst files in the directory and its subdirectories
find "$directory" -name "*.rst" -type f | while read file; do
    # Check if the meta tag is already in the file
    if ! grep -Fq "raw:: html" "$file"; then
        # Prepend the meta content to each file
        echo -e "$meta_content$(cat "$file")" > "$file"
        echo "Added meta tag to $file"
    else
        echo "Meta tag already exists in $file"
    fi
done

echo "Finished updating .rst files."
