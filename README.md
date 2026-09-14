# Ghost Markdown

[![Version](https://img.shields.io/github/package-json/v/MickyBalladelli/Markdown?style=flat-square&logo=visualstudiocode&logoColor=white)](https://github.com/MickyBalladelli/Markdown)
[![VS Code](https://img.shields.io/badge/VS%20Code-%E2%89%A51.137.0-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)
[![GitHub stars](https://img.shields.io/github/stars/MickyBalladelli/Markdown?style=flat-square)](https://github.com/MickyBalladelli/Markdown/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/MickyBalladelli/Markdown?style=flat-square)](https://github.com/MickyBalladelli/Markdown/commits/master)

Ghost Markdown is a focused Markdown viewer and editor for VS Code. Open a `.md` or `.markdown` file to edit its source beside a live rendered preview.

## Features

- Custom editor for Markdown files
- Live preview with headings, links, code, lists, and blockquotes
- Changes are written through VS Code's text document and undo system
- Responsive layout for narrow editor splits

Use the Command Palette command **Open Markdown with Ghost Markdown** to reopen the active Markdown file in the custom editor.

## Development

```bash
npm install
npm run compile
```

To bump the extension version and keep `package-lock.json` in sync:

```bash
npm run bump-version
npm run bump-version -- patch
npm run bump-version -- 1.2.3
```

No argument makes a feature (`minor`) version bump.

Press `F5` in VS Code to launch an Extension Development Host and open a Markdown file.

## Release Notes

### 0.0.1

Initial release of Ghost Markdown.
