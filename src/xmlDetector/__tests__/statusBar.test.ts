import * as vscode from 'vscode';
import { setStatusBarXmlCount } from '../statusBar';
import { statusBarMock } from '../../__mocks__/vscode';

describe('statusBar', () => {
    it('should set status bar text with more than one workspace', () => {
        setStatusBarXmlCount(6);
        expect(statusBarMock.text).toBe('XML: 6 (2 workspaces)');
    });
    it('should set status bar text with one workspace', () => {
        // @ts-ignore - read only property
        vscode.workspace.workspaceFolders = [{}];
        setStatusBarXmlCount(3);
        expect(statusBarMock.text).toBe('XML: 3');
    });
});
