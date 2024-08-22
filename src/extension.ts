// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('getx-folder-structure.createStructure',   
 () => {
        // Obtener la ruta del workspace actual
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No se encontró ningún workspace abierto.');
            return;
        }
        const rootPath = workspaceFolders[0].uri.fsPath;

        // Definir la estructura de carpetas
        const foldersToCreate = [
            'lib/app',
            'lib/app/bindings',
            'lib/app/controllers',
            'lib/app/data',
            'lib/app/data/models',
            'lib/app/data/provider',
            'lib/app/routes', // Asegúrate de que la carpeta 'routes' esté incluida
            'lib/app/ui',
            'lib/app/ui/global_widgets',
            'lib/app/ui/pages',
            'lib/app/ui/theme',
            'lib/app/utils',
        ];

        // Crear las carpetas
        foldersToCreate.forEach(folderPath => {
            const fullPath = `${rootPath}/${folderPath}`;
            vscode.workspace.fs.createDirectory(vscode.Uri.file(fullPath));
        });

        // Crea el archivo global_memory.dart dentro de lib/app/data/
        const globalMemoryFilePath = `${rootPath}/lib/app/data/global_memory.dart`;
        const globalMemoryContent = `
class GlobalMemory {}
`;
        vscode.workspace.fs.writeFile(vscode.Uri.file(globalMemoryFilePath), new TextEncoder().encode(globalMemoryContent));

        // Crear el archivo app_pages.dart dentro de lib/app/routes
        const appPagesFilePath = `${rootPath}/lib/app/routes/app_pages.dart`;
        const appPagesContent = `
import 'package:get/get.dart';
part 'app_routes.dart';

class AppPages {
  static final List<GetPage> routes = <GetPage>[];
}
`;
        vscode.workspace.fs.writeFile(vscode.Uri.file(appPagesFilePath), Buffer.from(appPagesContent));

        // Crea el archivo app_routes.dart dentro de lib/app/routes
        const appRoutesFilePath = `${rootPath}/lib/app/routes/app_routes.dart`;
        const appRoutesContent = `
part of './app_pages.dart';

abstract class Routes {}
`;
        vscode.workspace.fs.writeFile(vscode.Uri.file(appRoutesFilePath), Buffer.from(appRoutesContent));

        vscode.window.showInformationMessage('Estructura de carpetas y archivo app_pages.dart creados con éxito!');
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
