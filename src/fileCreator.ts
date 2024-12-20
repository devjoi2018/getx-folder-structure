import * as vscode from 'vscode';

/**
 * Class responsible for creating the necessary files for a GetX project.
 */
export class FileCreator {
    private rootPath: string;

    /**
     * Constructor for FileCreator.
     * @param rootPath - The root path of the workspace where the files will be created.
     */
    constructor(rootPath: string) {
        this.rootPath = rootPath;
    }

    /**
     * Creates the necessary files in the workspace.
     * Displays an error message if file creation fails.
     */
    public async createFiles() {
        try {
            await this.createGlobalMemoryFile();
            await this.createAppPagesFile();
            await this.createProviderFile();
            await this.createHomeBindingFile();
            await this.createHomeControllerFile();
            await this.createHomeStateMixinFile();
            await this.createPostModelFile();
            await this.createAppRoutesFile();
            await this.createHomePageFile();
            await this.createMainFile();
        } catch (error: any) {
            vscode.window.showErrorMessage(`Error creating files: ${error.message}`);
        }
    }

    private async createGlobalMemoryFile() {
        const globalMemoryFilePath = `${this.rootPath}/lib/app/data/global_memory.dart`;
        const globalMemoryContent = `
class GlobalMemory {}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(globalMemoryFilePath), Buffer.from(globalMemoryContent));
    }

    private async createAppPagesFile() {
        const appPagesFilePath = `${this.rootPath}/lib/app/routes/app_pages.dart`;
        const appPagesContent = `
import 'package:get/get.dart';
import '../bindings/home_binding.dart';
import '../ui/pages/home_page/home_page.dart';
part 'app_routes.dart';

class AppPages {
  static final List<GetPage> routes = <GetPage>[
    GetPage(name: Routes.homePage, page: () => const HomePage(), binding: HomeBinding()),
  ];
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(appPagesFilePath), Buffer.from(appPagesContent));
    }

    private async createAppRoutesFile() {
        const appRoutesFilePath = `${this.rootPath}/lib/app/routes/app_routes.dart`;
        const appRoutesContent = `
part of './app_pages.dart';

abstract class Routes {
  static const homePage = "/homePage";
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(appRoutesFilePath), Buffer.from(appRoutesContent));
    }

    private async createProviderFile() {
        const providerFilePath = `${this.rootPath}/lib/app/data/provider/provider.dart`;
        const providerContent = `
import 'package:get/get.dart';
import '../models/post_model.dart';

class Provider extends GetConnect {
  @override
  void onInit() {
    timeout = const Duration(seconds: 10);
    httpClient.baseUrl = 'https://jsonplaceholder.typicode.com';
    super.onInit();
  }

  Future<Response<List<Post>>> getPosts() async {
    final response = await get('/posts');
    if (response.hasError) {
      return Response<List<Post>>(statusCode: response.statusCode, statusText: response.statusText);
    } else {
      final posts = (response.body as List).map((e) => Post.fromJson(e)).toList();
      return Response<List<Post>>(body: posts, statusCode: response.statusCode);
    }
  }
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(providerFilePath), Buffer.from(providerContent));
    }

    private async createHomeBindingFile() {
        const homeBindingFilePath = `${this.rootPath}/lib/app/bindings/home_binding.dart`;
        const homeBindingContent = `
import 'package:get/get.dart';
import '../controllers/home_controller.dart';
import '../controllers/state_mixin_controllers/home_state_mixin.dart';
import '../data/provider/provider.dart';

class HomeBinding implements Bindings {
  @override
  void dependencies() {
    Get.lazyPut<Provider>(() => Provider());
    Get.lazyPut<HomeController>(() => HomeController());
    Get.put<HomeStateMixin>(HomeStateMixin());
  }
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(homeBindingFilePath), Buffer.from(homeBindingContent));
    }

    private async createHomeControllerFile() {
        const homeControllerFilePath = `${this.rootPath}/lib/app/controllers/home_controller.dart`;
        const homeControllerContent = `
import 'package:get/get.dart';

class HomeController extends GetxController {
  /* -------------------------------------------------------------------------- */
  /*                                 CONTROLLERS                                */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                  VARIABLES                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                 LIFECYCLES                                 */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(homeControllerFilePath), Buffer.from(homeControllerContent));
    }

    private async createHomeStateMixinFile() {
        const homeStateMixinFilePath = `${this.rootPath}/lib/app/controllers/state_mixin_controllers/home_state_mixin.dart`;
        const homeStateMixinContent = `
import 'package:get/get.dart';
import '../../data/models/post_model.dart';
import '../../data/provider/provider.dart';

class HomeStateMixin extends GetxController with StateMixin<List<Post>> {
  final Provider provider = Get.find();

  @override
  void onInit() {
    super.onInit();
    execute();
  }

  void execute() async {
    change(null, status: RxStatus.loading());
    try {
      final response = await provider.getPosts();
      if (response.hasError) {
        change(null, status: RxStatus.error(response.statusText));
      } else {
        change(response.body, status: RxStatus.success());
      }
    } catch (e) {
      change(null, status: RxStatus.error('Error fetching posts: $e'));
    }
  }
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(homeStateMixinFilePath), Buffer.from(homeStateMixinContent));
    }

    private async createPostModelFile() {
        const postModelFilePath = `${this.rootPath}/lib/app/data/models/post_model.dart`;
        const postModelContent = `
class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({
    required this.userId,
    required this.id,
    required this.title,
    required this.body,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'id': id,
      'title': title,
      'body': body,
    };
  }
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(postModelFilePath), Buffer.from(postModelContent));
    }

    private async createHomePageFile() {
        const homePageFilePath = `${this.rootPath}/lib/app/ui/pages/home_page/home_page.dart`;
        const homePageContent = `
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../controllers/home_controller.dart';
import '../../../controllers/state_mixin_controllers/home_state_mixin.dart';
import '../../../data/models/post_model.dart';

class HomePage extends GetView<HomeController> {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HomePage'),
      ),
      body: SafeArea(
        child: GetBuilder<HomeStateMixin>(
          builder: (stateMixin) {
            return stateMixin.obx(
              (data) => ListView.builder(
                itemCount: data?.length ?? 0,
                itemBuilder: (context, index) {
                  final Post post = data![index];
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                    child: ListTile(
                      title: Text(
                        post.title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Text(post.body),
                      leading: CircleAvatar(
                        child: Text(post.id.toString()),
                      ),
                    ),
                  );
                },
              ),
              onLoading: const Center(child: CircularProgressIndicator()),
              onError: (error) => Center(child: Text(error ?? 'Error')),
            );
          },
        ),
      ),
    );
  }
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(homePageFilePath), Buffer.from(homePageContent));
    }

    private async createMainFile() {
        const mainFilePath = `${this.rootPath}/lib/main.dart`;
        const mainContent = `
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'app/bindings/home_binding.dart';
import 'app/data/provider/provider.dart';
import 'app/routes/app_pages.dart';

void main() {
  Get.put(Provider());
  runApp(
    GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: Routes.homePage,
      defaultTransition: Transition.fade,
      initialBinding: HomeBinding(),
      getPages: AppPages.routes,
    ),
  );
}
`;
        await vscode.workspace.fs.writeFile(vscode.Uri.file(mainFilePath), Buffer.from(mainContent));
    }
}
