---
title: "Add a Redux Store"
lesson: 3
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Flutter Redux Setup"
next: "App State Model"
tags:
    - programming
    - flutter
    - dart
---

The Redux store is where all your application state lives in Redux apps.

The Store is basically a widget that stands at the top of the widget tree and passes it's data down using special Redux methods.

First, lets simply create a new Store. Like most things in OOP, it's just a class that you wanna establish a new instance of:

```dart
// main.dart
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';                              // new
import 'package:flutter_redux/flutter_redux.dart';              // new
import 'package:me_suite/pages/home_page.dart';

void main() => runApp(new MainApp());

class MainApp extends StatelessWidget {
  String title = 'MeSuite';
    //
    // Store is just a class that holds your apps State tree.
    // AppState is something that we will (but haven't yet) established
  final store = new Store<AppState>(                            // new
    appReducer,                                                 // new
    initialState: new AppState(),                               // new
    middleware: [],                                             // new
  );

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: title,
      home: new HomePage(title),
    );
  }
}
```

Let's break that down line by line starting at `final store = ...`

* AppState, again, is a class that we will build which is where all your application state will live. It's basically your states model.
* The Store constructor expects (or accepts) a handful of arguments:
  * A reducer: this is another class we haven't created yet, and we'll cover it in depth in the reducer lesson. Just know that a reducer is the only thing that can update your AppState.
  * initialState is your apps... initial state. We'll cover this more indepth in the AppState lesson.
  * middleware is optional, but you'll most likely always use it. It's a list of functions that Redux knows to call before the reducer updates state. For example, you may need to make an http request to log in a user before you update your states 'currentUser'. You'd do this in middleware.

---

**NB:** this is a good place to say that the Redux process should be completely synchronous, _except_ in the middleware. Any kind of async calls you need to make should be done in a middleware function. Here's a nice visual from [Ignacio Chavez](https://ignaciochavez.com/how-redux-puts-middleware-together/)
![redux flow](https://ignaciochavez.com/wp-content/uploads/2016/12/redux-middleware-flow-1.png)

---

The second part of adding a Redux Store is passing the Store to all children in the Widget tree. This should be done at the root level of your Flutter App.

```dart
// main.dart
import 'package:flutter/material.dart';
import 'package:redux/redux.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:me_suite/pages/home_page.dart';

void main() => runApp(new MainApp());

class MainApp extends StatelessWidget {
  String title = 'MeSuite';
  final store = new Store<AppState>(
    appReducer,
    initialState: new AppState(),
    middleware: [],
  );

  @override
  Widget build(BuildContext context) {
    // Wrap your MaterialApp in a StoreProvider
    return new StoreProvider(                                   // new
      store: store,                                             // new
      child: new MaterialApp(
          title: title,
          home: new HomePage(title),
      ),
    );
  }
}
```

So that's pretty much it for passing the store down to all the widgets. Later, we'll look at the special widgets that allow us to access that store and make Redux do work for us.

**NB:** Right now, your app will fail. Don't worry about bugs at the moment.
