import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';

const viewType = 'ghostMarkdown.preview';
const markdown = new MarkdownIt({ html: false, linkify: true, breaks: true });

function getHtml(webview: vscode.Webview, document: vscode.TextDocument): string {
	const nonce = getNonce();
	const initialText = JSON.stringify(document.getText()).replace(/</g, '\\u003c');
	const initialHtml = JSON.stringify(markdown.render(document.getText())).replace(/</g, '\\u003c');
	return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';"><style>${styles}</style></head><body>
		<header><div class="brand"><span class="mark">G</span><span>Ghost Markdown</span></div><span class="status" id="status">Live preview</span></header>
		<main><section class="editor-pane"><label for="source">Markdown</label><textarea id="source" spellcheck="false" aria-label="Markdown source"></textarea></section><section class="preview-pane"><label>Preview</label><article id="preview"></article></section></main>
		<script nonce="${nonce}">const vscode=acquireVsCodeApi();const source=document.getElementById('source');const preview=document.getElementById('preview');const status=document.getElementById('status');let timer;source.value=${initialText};preview.innerHTML=${initialHtml};source.addEventListener('input',()=>{status.textContent='Saving...';clearTimeout(timer);timer=setTimeout(()=>vscode.postMessage({type:'update',text:source.value}),180)});window.addEventListener('message',event=>{if(event.data.type!=='document')return;if(event.data.text!==source.value)source.value=event.data.text;preview.innerHTML=event.data.html;status.textContent='Saved'});</script></body></html>`;
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('ghostMarkdown.open', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor || !/\.(md|markdown)$/i.test(editor.document.fileName)) {
				vscode.window.showWarningMessage('Open a Markdown file first.');
				return;
			}
			const document = editor.document;
			const panel = vscode.window.createWebviewPanel(viewType, 'Markdown Preview', vscode.ViewColumn.Beside, { enableScripts: true, retainContextWhenHidden: true });
			panel.webview.html = getHtml(panel.webview, document);
			const update = () => panel.webview.postMessage({ type: 'document', text: document.getText(), html: markdown.render(document.getText()) });
			const documentSubscription = vscode.workspace.onDidChangeTextDocument(event => {
				if (event.document.uri.toString() === document.uri.toString()) {
					update();
				}
			});
			const messageSubscription = panel.webview.onDidReceiveMessage(async message => {
				if (message.type !== 'update' || typeof message.text !== 'string') {
					return;
				}
				const edit = new vscode.WorkspaceEdit();
				edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), message.text);
				await vscode.workspace.applyEdit(edit);
			});
			panel.onDidDispose(() => {
				documentSubscription.dispose();
				messageSubscription.dispose();
			});
		}),
	);
}

function getNonce(): string {
	return [...Array(32)].map(() => Math.random().toString(36)[2]).join('');
}

const styles = `:root{color-scheme:light;--ink:#20252b;--muted:#77808a;--line:#dfe3e6;--paper:#fbfaf7;--accent:#d85f43}*{box-sizing:border-box}body{margin:0;color:var(--ink);background:var(--paper);font-family:Georgia,'Times New Roman',serif}header{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;border-bottom:1px solid var(--line);background:#f2eee7;font-family:ui-sans-serif,sans-serif}.brand{display:flex;align-items:center;gap:10px;font-weight:700}.mark{display:grid;place-items:center;width:26px;height:26px;color:#fff;background:var(--accent);border-radius:50%}.status{color:var(--muted);font-size:12px}main{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:calc(100vh - 58px)}.editor-pane,.preview-pane{min-width:0;padding:24px 28px}.editor-pane{border-right:1px solid var(--line);background:#f6f4ef}label{display:block;margin-bottom:14px;color:var(--muted);font:700 11px/1 ui-sans-serif,sans-serif;letter-spacing:.12em;text-transform:uppercase}textarea{width:100%;min-height:calc(100vh - 130px);resize:none;border:0;outline:0;background:transparent;color:var(--ink);font:16px/1.75 ui-monospace,SFMono-Regular,Menlo,monospace;tab-size:2}.preview-pane{overflow:auto}article{max-width:720px;font-size:18px;line-height:1.65}article h1,article h2,article h3{line-height:1.15}article h1{margin-top:0;font-size:2.4em}article h2{margin-top:1.8em;font-size:1.5em}article a{color:var(--accent)}article code{padding:2px 5px;background:#ece8e0;font-size:.85em}article pre{overflow:auto;padding:18px;background:#20252b;color:#f5f1e9;font-size:.8em}article blockquote{margin-left:0;padding-left:18px;border-left:3px solid var(--accent);color:#5d656c}@media(max-width:760px){main{grid-template-columns:1fr}.preview-pane{order:1;min-height:50vh}.editor-pane{order:2;border-right:0;border-bottom:1px solid var(--line)}textarea{min-height:40vh}}`;
