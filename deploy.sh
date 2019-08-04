#!/usr/bin/env sh

# abort on errors
set -e

npm run build

cd dist

echo 'westonharper.com' > A

git init
git add -A
git commit -m 'deploy'

cd -
