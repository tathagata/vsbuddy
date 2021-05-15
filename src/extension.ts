import * as vscode from 'vscode';
import { Octokit } from '@octokit/rest';
import { BuddyProvider, Buddy } from './buddies';



export function activate(context: vscode.ExtensionContext) {
	const buddiesProvider = new BuddyProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('vsbuddies', buddiesProvider);


	let disposable = vscode.commands.registerCommand('vsbuddy.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vsbuddy!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
