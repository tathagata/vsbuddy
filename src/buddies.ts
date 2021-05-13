import { Octokit } from '@octokit/rest';
import { pathToFileURL } from 'node:url';
import * as vscode from 'vscode';
import * as path from 'path';
import * as vsls from 'vsls';


export class BuddyProvider implements vscode.TreeDataProvider<Buddy>{
    constructor(private workspaceRoot: string) { }

    getTreeItem(element: Buddy): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Buddy): Thenable<Buddy[]> {
        return Promise.resolve(this.getBuddies());
    }

    getBuddies() {
        const octokit = new Octokit({
            auth: "",
        });
        console.log("Querying github");
        let buddyList = octokit.rest.users.listFollowedByAuthenticated().then((values) => values.data.map(user => new Buddy(user["login"], user["avatar_url"], "live", vscode.TreeItemCollapsibleState.Collapsed)));

        console.log("buddyList" + buddyList);
        return buddyList;
    }

}

export class Buddy extends vscode.TreeItem {
    constructor(public readonly label: string,
        public readonly avatarUrl: string,
        private readonly status: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command) {
        super(label, collapsibleState);

        this.tooltip = `${this.label}-${this.status}`;
        this.description = this.status;
    }
    iconPath = {
        light: vscode.Uri.parse(this.avatarUrl),
        dark: vscode.Uri.parse(this.avatarUrl),
    };

    contextValue = "buddy";
}