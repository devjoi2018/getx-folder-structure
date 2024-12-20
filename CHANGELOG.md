# Change Log

All notable changes to the "getx-folder-structure" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added

- Initial release.
- Implemented folder structure creation for GetX projects.
- Added `FolderStructureCreator` class to handle folder creation.
- Added `FileCreator` class to handle file creation.
- Created the following folders:
  - `lib/app`
  - `lib/app/bindings`
  - `lib/app/controllers`
  - `lib/app/controllers/state_mixin_controllers`
  - `lib/app/data`
  - `lib/app/data/models`
  - `lib/app/data/provider`
  - `lib/app/routes`
  - `lib/app/ui`
  - `lib/app/ui/global_widgets`
  - `lib/app/ui/pages`
  - `lib/app/ui/pages/home_page`
  - `lib/app/ui/theme`
  - `lib/app/utils`
- Created the following files with initial content:
  - `lib/app/data/global_memory.dart`
  - `lib/app/routes/app_pages.dart`
  - `lib/app/routes/app_routes.dart`
  - `lib/app/data/provider/provider.dart`
  - `lib/app/bindings/home_binding.dart`
  - `lib/app/controllers/home_controller.dart`
  - `lib/app/controllers/state_mixin_controllers/home_state_mixin.dart`
  - `lib/app/data/models/post_model.dart`
  - `lib/app/ui/pages/home_page/home_page.dart`
  - `lib/main.dart`
- Added error handling for folder and file creation.
- Updated `app_pages.dart` to include routes for `HomePage`.
- Updated `home_binding.dart` to include dependencies for `HomeController`, `HomeStateMixin`, and `Provider`.
- Updated `provider.dart` to include methods for fetching posts from an API.
- Updated `main.dart` to initialize the GetX application with the initial route and bindings.
