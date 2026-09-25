
# Ghost Markdown

[![Version](https://img.shields.io/github/package-json/v/MickyBalladelli/Markdown?style=flat-square&logo=visualstudiocode&logoColor=white)](https://github.com/MickyBalladelli/Markdown)
[![VS Code](https://img.shields.io/badge/VS%20Code-%E2%89%A51.137.0-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)

Ghost Markdown gives Markdown files a focused editing experience inside VS Code. Open a `.md` or `.markdown` file, then open Ghost Markdown to edit the source beside a live rendered preview.

## What You Get

- **Side-by-side editing:** Edit Markdown on the left and read the rendered document on the right.
- **Live preview:** The preview follows changes made in Ghost Markdown or the VS Code editor.
- **Readable rendering:** Headings, emphasis, links, lists, blockquotes, inline code, and fenced code blocks are rendered for you.
- **VS Code editing:** Changes use VS Code's normal document model, including saving and undo/redo.
- **Responsive layout:** In a narrow view, the preview and source stack vertically for easier reading.

## Use Ghost Markdown

1. Open a Markdown file in VS Code.
2. Choose **Open Markdown with Ghost Markdown** from the Command Palette.
3. Edit the source in Ghost Markdown or the VS Code editor. The preview follows your changes.

## Supported Markdown

Ghost Markdown supports the standard Markdown features you use every day, including:

- Headings and paragraphs
- Bold, italic, and strikethrough text
- Links and automatic URL linking
- Ordered and unordered lists
- Blockquotes
- Inline code and fenced code blocks
- Tables

Raw HTML is displayed as text for safety.

## Develop

Install dependencies, then compile the extension:

```bash
npm install
npm run compile
```

Press `F5` in VS Code to launch an Extension Development Host. Open a Markdown file there and run **Open Markdown with Ghost Markdown** from the Command Palette.

To package and install the current extension locally, run:

```bash
npm run build-install-vsix
```

This command requires the `vsce` and `code` command-line tools. To bump the extension version and update `package-lock.json`, run `npm run bump-version -- patch` (or use `minor`, `major`, or an explicit version such as `1.2.3`).
