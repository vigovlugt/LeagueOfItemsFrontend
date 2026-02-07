git pull --depth=1
bun run download:champions
bun run download:items
git add .
git commit -m "Update images"
git push