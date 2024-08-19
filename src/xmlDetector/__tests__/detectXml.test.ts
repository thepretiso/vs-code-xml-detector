import * as vscode from 'vscode';
import { setStatusBarXmlCount } from '../statusBar';
import { DETECT_XML_COMMAND, detectXml } from '../detectXml';

let fsSuccess = true;

const filesA = [
    { name: 'package.json' },
    { name: 'index.js' },
    { name: 'data.xml' },
    { name: 'users.xml' },
];
const filesB = [
    { name: 'index.html' },
    { name: 'index.xml' },
    { name: 'config.xml' },
    { name: 'dependencies.xml' },
];

jest.mock('fs', () => ({
    readdir: jest.fn((root, options, callback) => {
        if (fsSuccess) {
            callback(null, root.indexOf('folderA') !== -1 ? filesA : filesB);
        } else {
            callback(new Error('FS.readdir failed.'), null);
        }
    }),
}));

jest.mock('../statusBar');

describe('detectXml', () => {
    beforeEach(() => {
        fsSuccess = true;
    });

    it('should register the command', () => {
        expect(vscode.commands.registerCommand).toHaveBeenCalledWith(DETECT_XML_COMMAND, detectXml);
    });

    it('should set correct number of xml files', async () => {
        await detectXml();
        expect(setStatusBarXmlCount).toHaveBeenCalledWith(
            [...filesA, ...filesB].filter(({ name }) => name.indexOf('.xml') !== -1).length
        );
    });

    it('should fail when cannot readdir', async () => {
        fsSuccess = false;
        await detectXml();
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith(expect.stringContaining(
            'XML Detection: FS.readdir failed.'
        ));
    });
});