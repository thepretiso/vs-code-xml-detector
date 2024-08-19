export const statusBarMock = {
    text: '',
    show: jest.fn(),
};

export const workspace = {
    workspaceFolders: [
        { uri: { fsPath: 'folderA' } },
        { uri: { fsPath: 'folderB' } },
    ],
    onDidCreateFilesListener: undefined as undefined | (() => void),
    onDidCreateFiles: (listener: () => void) => {
        workspace.onDidCreateFilesListener = listener;
    },
    onDidRenameFilesListener: undefined as undefined | (() => void),
    onDidRenameFiles: (listener: () => void) => {
        workspace.onDidRenameFilesListener = listener;
    },
    onDidDeleteFilesListener: undefined as undefined | (() => void),
    onDidDeleteFiles: (listener: () => void) => {
        workspace.onDidDeleteFilesListener = listener;
    },
    onDidChangeWorkspaceFoldersListener: undefined as undefined | (() => void),
    onDidChangeWorkspaceFolders: (listener: () => void) => {
        workspace.onDidChangeWorkspaceFoldersListener = listener;
    },
};

export const window = {
    createStatusBarItem: jest.fn(() => statusBarMock),
    showErrorMessage: jest.fn(),
};

export const commands = {
    registerCommand: jest.fn((name, fn) => ({ name, fn })),
    executeCommand: jest.fn(),
};

export const StatusBarAlignment = {
    Left: 1
};
