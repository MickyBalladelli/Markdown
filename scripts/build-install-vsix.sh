#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd -- "$script_dir/.." && pwd)"

cd "$project_root"

if ! command -v vsce >/dev/null 2>&1; then
  echo "Missing command: vsce" >&2
  echo "Install it with: npm install --global @vscode/vsce" >&2
  exit 1
fi

if ! command -v code >/dev/null 2>&1; then
  echo "Missing command: code" >&2
  echo "Install the VS Code command-line tool, then run this script again." >&2
  exit 1
fi

extension_name="$(npm pkg get name --parseable)"
extension_version="$(npm pkg get version --parseable)"
vsix_path="$project_root/${extension_name}-${extension_version}.vsix"

vsce package --no-dependencies --out "$vsix_path"
code --install-extension "$vsix_path" --force

echo "Installed $vsix_path"
