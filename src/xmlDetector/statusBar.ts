import * as vscode from 'vscode';

export const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

export const setStatusBarXmlCount = (count: number) => {
    const workspaces = vscode.workspace.workspaceFolders || [];
    statusBarItem.text = `XML: ${count}${workspaces.length > 1 ? ` (${workspaces.length} workspaces)` : ''}`;
};
