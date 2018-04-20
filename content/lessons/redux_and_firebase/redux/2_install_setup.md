---
title: "Flutter Redux Setup"
---

Using Redux in Flutter is as easy as installing the dependancy libraries. We'll be using the Dart [redux](https://pub.dartlang.org/packages/redux) package as well as the [Flutter Redux](https://pub.dartlang.org/packages/flutter_redux) packacge.

Open up your `pubspec.yaml` file and add the dependencies. Your dependency section will look like this, starting on line 4:

```yaml
// pubspec.yaml
...

dependencies:
  flutter:
    sdk: flutter
  redux: ">=2.0.0 <3.0.0"
  flutter_redux: ">=0.3.0 <0.4.0"
  redux_logging: ^0.1.4

...
```

Now in your terminal:

```
flutter packages get
```
