import * as vscode from 'vscode';
import { DETECT_XML_COMMAND, detectXml } from '../xmlDetector/detectXml';
import { activate } from '../extension';

const contextMock = {
    subscriptions: [],
} as unknown as vscode.ExtensionContext;

type VSCodeWorkspaceMock = {
    onDidCreateFilesListener: () => void;
    onDidRenameFilesListener: () => void;
    onDidDeleteFilesListener: () => void;
    onDidChangeWorkspaceFoldersListener: () => void;
};

describe('xmlDetector extension', () => {
    const workspaceMock = vscode.workspace as unknown as VSCodeWorkspaceMock;

    beforeEach(() => {
        (vscode.commands.executeCommand as unknown as jest.MockedFn<(command: string) => void>)
            .mockClear();
    });

    it('should initialize the extension', () => {
        activate(contextMock);
        expect(contextMock.subscriptions).toHaveLength(2);
        expect(contextMock.subscriptions[0]).toEqual(
            { name: DETECT_XML_COMMAND, fn: detectXml },
        );
        expect(contextMock.subscriptions[1]).toEqual(
            { text: 'XML: 0 (2 workspaces)', show: expect.any(Function) },
        );
        expect(workspaceMock.onDidCreateFilesListener).not.toBeUndefined();
        expect(workspaceMock.onDidRenameFilesListener).not.toBeUndefined();
        expect(workspaceMock.onDidDeleteFilesListener).not.toBeUndefined();
        expect(workspaceMock.onDidChangeWorkspaceFoldersListener).not.toBeUndefined();
    });

    it('should run the command when new files are added', () => {
        workspaceMock.onDidCreateFilesListener();
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith(DETECT_XML_COMMAND);
    });

    it('should run the command when files are renamed', () => {
        workspaceMock.onDidRenameFilesListener();
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith(DETECT_XML_COMMAND);
    });

    it('should run the command when files are deleted', () => {
        workspaceMock.onDidDeleteFilesListener();
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith(DETECT_XML_COMMAND);
    });

    it('should run the command when workspace folders are changed', () => {
        workspaceMock.onDidChangeWorkspaceFoldersListener();
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith(DETECT_XML_COMMAND);
    });
});