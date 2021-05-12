// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Octokit } from '@octokit/rest';
import { BuddyProvider, Buddy } from './buddies';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	console.log('Congratulations, your extension "vsbuddy" is now active!');
	console.log('Congratulations, your extension "vsbuddy" is now active!');
	console.log('Congratulations, your extension "vsbuddy" is now active!');

	// const octokit = new Octokit({
	// 	auth: "INSERT CODE HERE",
	// });

	// octokit.rest.users.listFollowedByAuthenticated().then((values) => {
	// 	console.log(values);
	// 	for (let value of values.data){
	// 		console.log(value["login"]);
	// 	}
	// });
	const buddiesProvider = new BuddyProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('vsbuddies', buddiesProvider);
	// vscode.commands.registerCommand('vsbuddies.refreshEntry', () =>
	// 	buddiesProvider.refresh()
	// );


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsbuddy.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from vsbuddy!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
