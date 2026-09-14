#!/usr/bin/env bash

set -euo pipefail

if [[ $# -gt 1 ]]; then
  echo "Usage: npm run bump-version -- [bug|patch|minor|major|x.y.z]" >&2
  exit 1
fi

version="${1:-minor}"

case "$version" in
  bug)
    version=patch
    ;;
  major|minor|patch|[0-9]*.[0-9]*.[0-9]*)
    ;;
  *)
    echo "Invalid version: $version" >&2
    echo "Use bug, patch, minor, major, or a version like 1.2.3." >&2
    exit 1
    ;;
esac

npm version "$version" --no-git-tag-version
