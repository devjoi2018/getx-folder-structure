import * as vscode from 'vscode';

/**
 * Class responsible for creating the folder structure for a GetX project.
 */
export class FolderStructureCreator {
    private rootPath: string;
    private foldersToCreate: string[];

    /**
     * Constructor for FolderStructureCreator.
     * @param rootPath - The root path of the workspace where the folders will be created.
     */
    constructor(rootPath: string) {
        this.rootPath = rootPath;
        this.foldersToCreate = [
            'lib/app',
            'lib/app/bindings',
            'lib/app/controllers',
            'lib/app/controllers/state_mixin_controllers',
            'lib/app/data',
            'lib/app/data/models',
            'lib/app/data/provider',
            'lib/app/routes',
            'lib/app/ui',
            'lib/app/ui/global_widgets',
            'lib/app/ui/pages',
            'lib/app/ui/pages/home_page',
            'lib/app/ui/theme',
            'lib/app/utils',
        ];
    }

    /**
     * Creates the folder structure in the workspace.
     * Displays an error message if folder creation fails.
     */
    public async createFolders() {
        try {
            for (const folderPath of this.foldersToCreate) {
                const fullPath = `${this.rootPath}/${folderPath}`;
                await vscode.workspace.fs.createDirectory(vscode.Uri.file(fullPath));
            }
        } catch (error: any) {
            vscode.window.showErrorMessage(`Error al crear carpetas: ${error.message}`);
        }
    }
}
