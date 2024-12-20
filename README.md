# Getx Folder Structure

<img src="assets/images/logo.png" alt="GetX Logo" width="128px" >

A Visual Studio Code extension to create an initial folder structure suitable for working with the GetX package in Flutter.

## Features

- Creates an organized folder structure for GetX projects in Flutter.
- Includes predefined `.dart` files with basic code to speed up development.
- Easy to use from the VS Code command palette.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
3. Search for "Getx Folder Structure" and install it.

## Usage

1. Open a Flutter project in VS Code.
2. Open the command palette (Ctrl+Shift+P or Cmd+Shift+P).
3. Type "Getx: Flutter folder structure" and press Enter.
4. The folder structure and predefined files will be created in the `lib` folder of your project.
5. Open the terminal and run the following command to add the GetX package:
   ```
   flutter pub add get
   ```

## Generated folder structure

```
lib/
└── app/
    ├── bindings/
    │   └── home_binding.dart
    ├── controllers/
    │   ├── home_controller.dart
    │   └── state_mixin_controllers/
    │       └── home_state_mixin.dart
    ├── data/
    │   ├── global_memory.dart
    │   ├── models/
    │   │   └── post_model.dart
    │   └── provider/
    │       └── provider.dart
    ├── routes/
    │   ├── app_pages.dart
    │   └── app_routes.dart
    ├── ui/
    │   ├── global_widgets/
    │   ├── pages/
    │   │   └── home_page/
    │   │       └── home_page.dart
    │   └── theme/
    └── utils/
```

## Predefined Files

- `global_memory.dart`: A placeholder for global memory management.
- `app_pages.dart`: Contains the basic definition of your GetX application's routes.
- `app_routes.dart`: Defines the route names used in `app_pages.dart`.
- `provider.dart`: A provider class for making HTTP requests using GetX's `GetConnect`.
- `home_binding.dart`: An example of a home page binding, which sets up the dependencies for the home page.
- `home_controller.dart`: A controller for managing the state and logic of the home page.
- `home_state_mixin.dart`: A state mixin controller for handling the state of the home page using GetX's `StateMixin`.
- `post_model.dart`: A model class representing a post, used for parsing JSON data.
- `home_page.dart`: An example of a home page UI using GetX for state management.
- `main.dart`: The main entry point of the Flutter application, setting up the initial route and bindings.

## Contributions

Contributions are welcome! If you have any ideas to improve this extension or find any bugs, please open an issue or submit a pull request on the GitHub repository.

## License

This extension is distributed under the MIT license. See the `LICENSE` file for more details.
