---
title: "Getting To Start"
lesson: 2
chapter: 1
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "01/01/2017"
category: "flutter"
type: "lesson"
prev: "What You'll Build"
next: "What is Redux?"
tags:
    - programming
    - flutter
    - dart
---

Before we begin building, let's update your counter app to a bare-bones nothing app so we can begin fresh.

### 1. Bare Minimum Flutter App

```dart
// main.dart
import 'package:flutter/material.dart';

void main() => runApp(new MainApp());

class MainApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container();
  }
}
```

**NB:** `Container` is the like `<div>` tag of Flutter, except you're _supposed_ to use it. When you return a Container with children, **it takes up no space.** It's also a convenience widget that lets you add a ton of styles, layout, etc to it's children.

`flutter run`

This will give you a blank screen. But it runs.

**Celebration 1:** You've made a mobile app that can deploy to iOS and Android.

### 2. MaterialApp and Scaffold widgets

Turn that container into a `MaterialApp` with a title and a home:

```dart
// main.dart
import 'package:flutter/material.dart';

void main() => runApp(new MusicParty());

class MusicParty extends StatelessWidget {
  String title = 'Me Suite';                         // new
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(                             // updated
        title: title,                                   // new
        home: new HomePage(title),                      // new
    );
  }
}
```

That's it for this file, for now.

Also, we've broken the app by trying to render a widget we haven't created yet: `HomePage`. Let's do that.

Create a new directory called `pages` in the `lib` directory. Here, create a new file called `home_page.dart`;

```
// lib folder:
- pages
    - home_page.dart
main.dart
```

Now, let's build that `HomePage`:

```dart
// pages/home_page.dart
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
    // We passed it a title from the app root, so we have to
    // set up the class to accept that arg.
  final String title;
  HomePage(this.title);

  @override
  Widget build(BuildContext context) {
    // Scaffold is almost always going to be your top-level widget
    // on each page.
    return new Scaffold(
      appBar: new AppBar(),
      body: new Container(),
      floatingActionButton: new FloatingActionButton(onPressed: null),
    );
  }
}
```

---

**NB**: `Scaffold` is a super nice widget that gives you the basic layout of almost all mobile apps. In addition to the three arguments we've passed it, it can set you up with footer navigation, a drawer where you'd put a full menu, and more.

---

Import your new file into `main.dart`. Render your app now, and it'll look like this:

![screen shot blank app](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520028940/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-02_at_14.11.41.png)

We just need to fill in some of that content:

```dart
// pages/home_page.dart
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  final String title;

  HomePage(this.title);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      // AppBar class takes a Widget for title, not a string
      // In order to get it to display our title, pass it a Text widget
      appBar: new AppBar(
        title: new Text(this.title),                        // new
      ),
      body: new Container(),
      // FloatingActionButton is literally a button that floats above
      // all other page content.
      floatingActionButton: new FloatingActionButton(
        // Pass it a callback to execute when tapped
        onPressed: () => print('PRESSED!'),                 // new
        // Pass it children to render in the button
        child: new Icon(Icons.add),                         // new
      ),
    );
  }
}
```

With this, you now have text in app bar and a functioning floating action button. If you press it, you'll see some feedback in your console.

Finally, let's add some body content:

```dart
// pages/home_page.dart
...
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(this.title),
      ),
			body: new Container(
        child: new Center(
          child: new Column(
            //mainAxisAlignment is an argument for Column, Row and other
            // layout widgets. It does what CSS's 'justify-content' does
            mainAxisAlignment: MainAxisAlignment.center,
            // If you recall, Column is a layout widget that
            // expects a List who's data is of type Widget:
            children: <Widget>[
              new Text(
                'You have pushed the button this many times:',
              ),
              new Text('0'),
            ],
          ),
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: () => print('PRESSED!'),
        child: new Icon(Icons.add),
      ),
    );
  }
}
```

Now, save this, and refresh it. You should be back to the starter app... minus any functionality at all.

This is zero for us. Since we're implementing Redux next, we don't want to make that counter work using StatefulWidgets.
