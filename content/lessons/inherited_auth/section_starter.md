---
title: "Log In Flow Boiler Plate"
---

This section is all about learning how to use the **InheritedWidget** for state management.

*Eventually*, we want this to happen:
1. App launches and shows loading spinner.
2. App checks local state and storage for an existing Firebase User.
3. If there is a user, login in the background and route to the home screen.
4. If not, route to the log in screen, and let user log in.

This is actually the exact thing you'll learn in the [Redux + Firebase Section]('https://flutterbyexample.com/what-youll-build'). The difference is that here we're using the `InheritedWidget` as our central storage, rather 
than a Redux store. This is more 'vanilla Flutter'.


## Auth Section Boiler Plate

To get the functionality described above, there's a couple things you'll need
 (before you implement hard logic).

First, some dumb old pages and routing. From the blank app, make these changes:

### 1. Create a new file in the `lib` alongside main called `app.dart`. 

```text
lib/
  |-app.dart
  |-main.dart
```

In that file, copy and paste this. There's nothing fancy here. For now, this'll just be where you keep some app 
information, like theme data and routes.

```dart
import 'package:advanced_app/screens/auth_screen.dart';
import 'package:advanced_app/screens/home_screen.dart';
import 'package:flutter/material.dart';

class AppRootWidget extends StatefulWidget {
  @override
  AppRootWidgetState createState() => new AppRootWidgetState();
}

class AppRootWidgetState extends State<AppRootWidget> {
  ThemeData get _themeData => new ThemeData(
        primaryColor: Colors.cyan,
        accentColor: Colors.indigo,
        scaffoldBackgroundColor: Colors.grey[300],
      );

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Inherited',
      theme: _themeData,
      routes: {
        '/': (BuildContext context) => new HomeScreen(),
        '/auth': (BuildContext context) => new AuthScreen(),
      },
    );
  }
}
```

### 2. Update Main File

In `main.dart`, erase everything and add this:

```dart
// main.dart
import 'package:advanced_app/app.dart';
import 'package:advanced_app/app_state_container.dart';
import 'package:flutter/material.dart';

void main()  {
  runApp(new AppRootWidget());
}
```

### 3. Add HomeScreen

Add a new directory called `screens` in lib, and a file called `home-screen.dart`

```text
lib/
  |-screens/
    |-home_screen.dart
  |-app.dart
  |-main.dart
```

Just another basic widget in that file (for now):

```dart
class HomeScreen extends StatefulWidget {
  @override
  HomeScreenState createState() => new HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {

  @override
  Widget build(BuildContext context) {

    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Suite'),
      ),
      body: new Center(
        child: new Text(appState.user.displayName),
      ),
    );
  }
}
```

### 4. Add AuthScreen

 
Add a file called `auth_screen.dart` along side the home_screen.

```text
lib/
  |-screens/
    |-home_screen.dart
    |-auth_screen.dart
  |-app.dart
  |-main.dart
```

Just another basic widget in that file (for now). 

Notice that the `onPressed` callback for the `RaisedButton` simple prints right now. No logic to be had.

```dart
// screens/auth_screen.dart
import 'package:flutter/material.dart';
class AuthScreen extends StatefulWidget {
  @override
  AuthScreenState createState() {
    return new AuthScreenState();
  }
}

class AuthScreenState extends State<AuthScreen> {
  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;

    return new Container(
      width: width,
      child: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          new RaisedButton(
            onPressed: () => print('Log in!'),
            color: Colors.white,
            child: new Container(
              width: 230.0,
              height: 50.0,
              alignment: Alignment.center,
              child: new Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  new Padding(
                    padding: const EdgeInsets.only(right: 20.0),
                    child: new Image.network(
                      'http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png',
                      width: 30.0,
                    ),
                  ),
                  new Text(
                    'Sign in With Google',
                    textAlign: TextAlign.center,
                    style: new TextStyle(
                      fontSize: 16.0,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
```

If you launch right now, it works, but it does nothing.

That's it for the app boiler plate! 

