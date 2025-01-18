#!/bin/bash
set -e

echo "Running initialization scripts in /docker-entrypoint-initdb.d/"

for file in /docker-entrypoint-initdb.d/*; do
  case "$file" in
    *.sh)     echo "Running $file"; bash "$file" ;;
    *.js)     echo "Running $file with Node.js"; node "$file" ;;
    *)        echo "Ignoring $file (unsupported extension)" ;;
  esac
done

echo "Initialization complete. Starting Next.js application..."

# Run the Next.js application
exec "$@"
