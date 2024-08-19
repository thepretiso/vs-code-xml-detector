import * as vscode from 'vscode';
import { DETECT_XML_COMMAND, detectXmlCommand } from './xmlDetector/detectXml';
import { setStatusBarXmlCount, statusBarItem } from './xmlDetector/statusBar';

export function activate(context: vscode.ExtensionContext) {
	// push command and status bar into subscription
	context.subscriptions.push(detectXmlCommand);
	context.subscriptions.push(statusBarItem);

	// attach command on events
	vscode.workspace.onDidCreateFiles(() => {
		vscode.commands.executeCommand(DETECT_XML_COMMAND);
    });
	vscode.workspace.onDidRenameFiles(() => {
        vscode.commands.executeCommand(DETECT_XML_COMMAND);
    });
	vscode.workspace.onDidDeleteFiles(() => {
        vscode.commands.executeCommand(DETECT_XML_COMMAND);
    });
	vscode.workspace.onDidChangeWorkspaceFolders(() => {
        vscode.commands.executeCommand(DETECT_XML_COMMAND);
    });

	// show status bar text with default value
	setStatusBarXmlCount(0);
	statusBarItem.show();

	// first execution of the command
	vscode.commands.executeCommand(DETECT_XML_COMMAND);
}
