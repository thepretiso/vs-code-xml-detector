import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { setStatusBarXmlCount } from './statusBar';

export const DETECT_XML_COMMAND = 'xmldetector.detectXML';

const getXmlFilesFromWorkspace = async (workspacePath: string): Promise<Array<string>> => {
    const root = path.resolve(workspacePath);
    return new Promise((resolve, reject) => fs.readdir(root, { recursive: true, withFileTypes: true },
        (error, files) => {
            if (error) {
                reject(error);
                return;
            }
            const xmls = files.reduce<Array<string>>((list, { name }) => {
                if (path.extname(name) === '.xml') {
                    list.push(name);
                }
                return list;
            }, []);
            resolve(xmls);
        }
    ));
};

export const detectXml = async () => {
    const workspaces = vscode.workspace.workspaceFolders;

    if (!workspaces) {
        return;
    }

    let xmlCount = 0;

    await Promise.all(workspaces.map(async (workspace) => {
        let workspacePath = workspace.uri.fsPath;
        try
        {
            const files = await getXmlFilesFromWorkspace(workspacePath);
            xmlCount += files.length;
        }
        catch (error) {
            vscode.window.showErrorMessage(`XML Detection: ${(error as Error).message}`);
        }
    }));

	setStatusBarXmlCount(xmlCount);
};

export const detectXmlCommand = vscode.commands.registerCommand(DETECT_XML_COMMAND, detectXml);
