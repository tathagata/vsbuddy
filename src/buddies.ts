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

        if (element) {
            return Promise.resolve(
                this.getBuddies()
            );
        }
    }

    getBuddies() {
        let buddyList: Buddy[] = [];
        const octokit = new Octokit({
            auth: "",
        });

        octokit.rest.users.listFollowedByAuthenticated().then((values) => {
            for (let value of values.data) {
                buddyList.concat(new Buddy(value["login"], "live", vscode.TreeItemCollapsibleState.Collapsed));
            }
        });
        console.log(buddyList);
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