git pull --depth=1
pnpm run download:champions
pnpm run download:items
git add .
git commit -m "Update images"
git push