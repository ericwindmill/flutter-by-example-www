---
title: "Set Up InheritedWidget (AppState)"
---

If you've used Flutter before, you've probably come across the `of` method on various classes:

```dart
Theme.of(context).textTheme
MediaQuery.of(context).size
```

Those widgets are inherited widgets that Flutter just happens to have built in. Because they're inherited, they have 
a special method called `of`, which you can use to access properties anywhere in it's Widget tree. 

You can take advantage of this by writing your own Widgets that extend `InheritedWidget`. Once you have a working 
InheritedWidget at the Root of your application, you can use an `of` method (that you'll write) to access it's 
properties anywhere in your app. In other words, it can be a central storage that holds your application state.

(For a more detailed explanation, [read this blog post](https://ericwindmill.com/using-flutter-inherited-widgets-effectively))

### 1. Setup AppState model

First, make a model class for your AppState. Add a new directory called `models` with a file called `app_state.dart`.

```text
lib/
  |-models/
    |- app_state.dart
  |-screens/
    |- home_screen.dart
    |- auth_screen.dart
  |-app.dart
  |-main.dart
```

This is a simple model class:

```dart

class AppState {
  // Your app will use this to know when to display loading spinners.
  bool isLoading;

  // Constructor
  AppState({
    this.isLoading = false,
    this.user,
  });

  // A constructor for when the app is loading.
  factory AppState.loading() => new AppState(isLoading: true);

  @override
  String toString() {
    return 'AppState{isLoading: $isLoading, user: ${user?.displayName ?? 'null'}}';
  }
}
```

### 2. Set Up the AppStateContainer (InheritedWidget)

The AppStateContainer is actually an `InheritedWidget` wrapped in a `StatefulWidget`. This basically makes the 
container a stateful widget that has the ability to pass state all the way down the tree *and* be updated with 
setState(), which would rerender all the ancestor widgets that rely on the slice of state updated. Cool.

First, add your app_state_container widget.

```text
lib/
  |-models/
    |- app_state.dart
  |-screens/
    |- home_screen.dart
    |- auth_screen.dart
  |- app.dart
  |- app_state_container.dart   //new
  |- main.dart
```

In that file, you're going to have three classes:

```dart
// The two normal StatefulWidget classes:
class StateContainer extends StatefulWidget
class StateContainerState extends State<StateContainer>
// The InheritedWidget
class _InheritedStateContainer extends InheritedWidget
```

You should start with this simple boiler plate:

```dart
// app_state_container.dart
import 'package:advanced_app/models/app_state.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class AppStateContainer extends StatefulWidget {
  // Your apps state is managed by the container
  final AppState state;
  // This widget is simply the root of the tree,
  // so it has to have a child!
  final Widget child;

  AppStateContainer({
    @required this.child,
    this.state,
  });

  // This creates a method on the AppState that's just like 'of'
  // On MediaQueries, Theme, etc
  // This is the secret to accessing your AppState all over your app
  static _AppStateContainerState of(BuildContext context) {
    return (context.inheritFromWidgetOfExactType(_InheritedStateContainer)
            as _InheritedStateContainer)
        .data;
  }

  @override
  _AppStateContainerState createState() => new _AppStateContainerState();
}

class _AppStateContainerState extends State<AppStateContainer> {
  // Just padding the state through so we don't have to 
  // manipulate it with widget.state.
  AppState state;

  @override
  void initState() {
    // You'll almost certainly want to do some logic 
    // in InitState of your AppStateContainer. In this example, we'll eventually
    // write the methods to check the local state
    // for existing users and all that.
    super.initState();
  }

  // So the WidgetTree is actually
  // AppStateContainer --> InheritedStateContainer --> The rest of your app. 
  @override
  Widget build(BuildContext context) {
    return new _InheritedStateContainer(
      data: this,
      child: widget.child,
    );
  }
}

// This is likely all your InheritedWidget will ever need.
class _InheritedStateContainer extends InheritedWidget {
  // The data is whatever this widget is passing down.
  final _AppStateContainerState data;

  // InheritedWidgets are always just wrappers.
  // So there has to be a child, 
  // Although Flutter just knows to build the Widget thats passed to it
  // So you don't have have a build method or anything.
  _InheritedStateContainer({
    Key key,
    @required this.data,
    @required Widget child,
  }) : super(key: key, child: child);
  
  // This is a better way to do this, which you'll see later.
  // But basically, Flutter automatically calls this method when any data
  // in this widget is changed. 
  // You can use this method to make sure that flutter actually should
  // repaint the tree, or do nothing.
  // It helps with performance.
  @override
  bool updateShouldNotify(_InheritedStateContainer old) => true;
}
```

### 3. Wrap Your App with your Container

In your `main.dart` file:

```dart
// main.dart
import 'package:advanced_app/app.dart';
import 'package:advanced_app/app_state_container.dart';
import 'package:flutter/material.dart';

void main() {
  // Wrap your App in your new storage container
  runApp(new AppStateContainer(
    child: new AppRootWidget(),
  ));
}
```


 