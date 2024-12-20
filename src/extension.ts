import * as vscode from 'vscode';
import { FolderStructureCreator } from './folderStructureCreator';
import { FileCreator } from './fileCreator';

/**
 * This method is called when your extension is activated.
 * Your extension is activated the very first time the command is executed.
 * @param context - The extension context provided by VS Code.
 */
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('getx-folder-structure.createStructure', async () => {
        try {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage('No open workspace found.');
                return;
            }
            const rootPath = workspaceFolders[0].uri.fsPath;

            const folderStructureCreator = new FolderStructureCreator(rootPath);
            await folderStructureCreator.createFolders();

            const fileCreator = new FileCreator(rootPath);
            await fileCreator.createFiles();

            vscode.window.showInformationMessage('Folder structure and files created successfully.');
        } catch (error: any) {
            vscode.window.showErrorMessage(`Error creating structure: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * This method is called when your extension is deactivated.
 */
export function deactivate() {}
