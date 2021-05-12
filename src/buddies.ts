import { Octokit } from '@octokit/rest';
import { pathToFileURL } from 'node:url';
import * as vscode from 'vscode';
import * as path from 'path';


export class BuddyProvider implements vscode.TreeDataProvider<Buddy>{
    constructor(private workspaceRoot: string) { }

    getTreeItem(element: Buddy): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Buddy): Thenable<Buddy[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage("No Buddy in empty workspace");
            return Promise.resolve([]);
        }
        console.log(element);

        return Promise.resolve(this.getBuddies());


    }

    getBuddies() {
        const octokit = new Octokit({
            auth: "",
        });
        console.log("Querying github");
        let buddyNames = octokit.rest.users.listFollowedByAuthenticated().then((values) => { return values.data.map(user => user["login"]); });
        let buddyList = buddyNames.then((names) => names.map(name => new Buddy(name, "live", vscode.TreeItemCollapsibleState.Collapsed)));

        console.log("buddyList" + buddyList);
        return buddyList;
    }

}

export class Buddy extends vscode.TreeItem {
    constructor(public readonly label: string,
        private readonly status: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command) {
        super(label, collapsibleState);

        this.tooltip = `${this.label}-${this.status}`;
        this.description = this.status;
    }
    iconPath = {
        light: path.join(__filename, "..", "..", "resources", "light", "buddy.svg"),
        dark: path.join(__filename, "..", "..", "resources", "dark", "buddy.svg"),
    };

    contextValue = "buddy";
}