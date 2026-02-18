#!/bin/sh
#/ Usage: .conductor/setup.sh
#/
#/ Symlink env files from the root repo to Conductor workspaces.
#/ This is run automatically when a new workspace is created.

set -e
cd "$(dirname "$0")/.."

ROOT="${CONDUCTOR_ROOT_PATH:-$(git worktree list --porcelain | head -1 | sed 's/worktree //')}"

for file in .env .dev.vars; do
  source="$ROOT/$file"

  if [ ! -f "$source" ]; then
    echo "Warning: $source not found, skipping."
    continue
  fi

  if [ -L "$file" ]; then
    echo "$file already symlinked."
    continue
  fi

  if [ -f "$file" ]; then
    echo "Warning: $file already exists as a regular file, skipping."
    continue
  fi

  ln -sf "$source" "$file"
  echo "Symlinked $file from $source"
done
