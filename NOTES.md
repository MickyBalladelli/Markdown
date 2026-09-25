## Develop

Install dependencies, then compile the extension:

```bash
npm install
npm run compile


or

./scripts/build-install-vsix.sh

```

### versioning
To update the version use

```bash
# for a new version say from O.1.0 to 0.2.0
./scripts/bump-version.sh

# or for a bug
# 0.1.0 to 0.1.1
./scripts/bump-version.sh bug

```
Press `F5` in VS Code to launch an Extension Development Host. Open a Markdown file there and run **Open Markdown with Ghost Markdown** from the Command Palette.

To package and install the current extension locally, run:

```bash
npm run build-install-vsix
```

This command requires the `vsce` and `code` command-line tools. To bump the extension version and update `package-lock.json`, run `npm run bump-version -- patch` (or use `minor`, `major`, or an explicit version such as `1.2.3`).