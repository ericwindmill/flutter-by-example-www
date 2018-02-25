---
title: "Basic Flutter App"
lesson: 5
chapter: 0
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Basic UI"
next: "What You'll Build"
tags:
    - programming
    - flutter
    - dart
---

The 'Hello World' Flutter app is a simple counter that looks like this:

![screen_shot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1518377792/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-02-11_at_11.34.36.png)
![screen_shot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1518377793/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-02-11_at_10.34.27.png)

#### 1. In your terminal run:

```
flutter create music_party
cd music_party
```

Open the project in your editor.

#### 2. Now, run the app using your IDE or terminal.

In the terminal:

```
flutter run
```

In IntelliJ:

Across the top of the IDE there's a toolbar that looks something like this (although I have installed a theme so yours probably has different icons):

![IntelliJ toolbar](http://res.cloudinary.com/ericwindmill/image/upload/v1518916683/flutter_by_example/Screen_Shot_2018-02-17_at_5.17.47_PM.png)

1. Where mine says 'iPhone X' yours might be blank. If so, select 'Open iOS Simulator' in that drop down.
2. When it launches, click the 'play' button to run the app.
   **NB**: You can also click the 'debug' button to launch in Debug mode. I usually always just run it in debug mode while developing. It's the same thing but allows for breakpoints and the inspector.

   Once the app launches:

#### 3. Click the '+' Button in the bottom-right of the app.

That's the only functionality. Watch the counter change.

What's happening? Very simply -- the button has an event listener of sorts that increases the variable in your apps state that represents the counter. Flutter knows that whenever you change that state, it needs to repaint that number. More on this in just a bit.

#### 4. Make some code changes

One of the best things about the Flutter dev environment is hot reload. Lets see it in action.

In the code, go to line 22:

```dart
// ...
  ),
  home: new MyHomePage(title: 'Flutter Demo Home Page'),
);
// ...
```

Change the String 'Flutter Demo Home Page' to whatever you'd like. Save the code. Watch the title of the app page change before your very eyes.

![screen-shot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1518378024/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-02-11_at_11.40.04.png)

Let's try something else. On line 20:

```dart
// ...
  ),
  primarySwatch: Colors.blue,
);
// ...
```

Change `Colors.blue` to `Colors.amber`.

Viola:

![screen-shot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1518377793/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-02-11_at_11.34.45.png)

## Whirlwind Intro to Dart and Flutter

---

**NB:** If you haven't ever written a line of Dart, I recommend spending some time with that first. In Flutter, there is no markup language or CSS. Everything is written in Dart. You may have noticed that to set the color we passed an argument of `Colors.amber`. That's Object Oriented Programming in action. We're passing a const called Colors with a property `amber` on it to the `color` argument. If that was gibberish, I suggest checking out [Dart By Example](http://jpryan.me/dartbyexample/) or [Dart for Web Developers](https://dartforwebdevelopers.com).

---

If you've worked with React before, this may be easy. Everything in Flutter is a `Widget`, much like in React or Vue you're working with small reusable components.

A `widget` is just a Dart class that extends a Widget class from Flutter. Widget classes have basically only one requirement: it **must** have a `build` method which returns sub-widgets. Other than that, just write methods and properties on the class that the widget needs.

Super-basic widget example:

```dart
Class RedTextWidget extends StatelessWidget {
  // Arbitrary text to render. Passed in from wherever this class is created.
  final String text;

  // constructor
  // This is the method that executes when the widget is constructed
  RedTextWidget(this.text);

  /* Build Method
  Don't get hung up on understanding this completely
  The point is that we're just returning a new instance of the 'Text' class
    and passing it a couple arguments.
  That's all Flutter is. Nested classes and arguments.
  */
  Widget build(BuildContext context) {
    return new Text(
      this.text,
      style: new TextStyle(color: Colors.red),
    ),
  }
}
```

Then somewhere else in an app we'd use the widget like this. The point is, again, that we're just creating a new instance of the class.

```dart
// ...
// This is how we'd use the RedTextWidget within another widget.
child: new RedTextWidget('This string would render'),
// ...
```

### Flutter's Material and Cupertino Widgets

The Flutter SDK is extra nice becasue there are loads of built in widgets in the style of Android and iOS.

I hate to gush, but it's actually quite amazing what Flutter gives you out of the box. You can create pretty damn good looking and accessible mobile apps with no design chops at all. And, building layouts is super easy thanks to Flutter's layout widgets.

Imagine if you started a new React, Vue, React Native, etc project, and it came ready with hundreds of components that we're just ready to go with design standards in mind. That's what Material and Cupertino widgets are -- Material widgets are designed to look like Android apps and Cupertino like iOS.

These built in Widgets _and_ the ability to create completely custom widgets gives you a lot of power. You can create a completely custom app with lower-level custom widgets, or you can just use what you're given to get to MVP.

[Flutter Widget Library](https://flutter.io/widgets/)

## Back to the Counter App

Alrighty-- let's see what's actually going on here with our _current_ code.

First, the directory structure:

```
music-party
  |- android
  |  ... a bunch of junk
  |- ios
  |  ... a bunch of junk
  |- lib
  |  main.dart
  |- test
  pubspec.lock
  pubspec.yaml
  README.md
  ...
```

99% of the time, you only care about the `lib` folder and the `pubspec.yaml` file, which is where you list your projects dependencies.

The `lib` folder is where you'll build your app. The only file here now is `main.dart`.

`main.dart` **must exist** and it must be in the root of `lib`. This is the file that Dart and Flutter know to run as the entry point to your app.

Let's see the code in the file:

```dart
// import the Flutter sdk
import 'package:flutter/material.dart';

// Every Dart program ever must have a main() function
// This function is essentially JavaScripts Document.ready(), only its required.
// It's the entry point of your Dart code.
// runApp is a Flutter function that runs the app.
// It takes a Widget as an argument.
void main() => runApp(new MyApp());

// EVERYTHING is a Widget.
// Including the root of your entire App:
class MyApp extends Stateless Widget {
  ...

// NB: MyApp is an arbitrary name.
```

### Stateless and StatefulWidgets

Flutter widgets must extend a handful of classes from the Flutter library. The two you'll use almost always are `StatelessWidget` and `StatefulWidget`.

The difference is that one has a concept of `state` within the Widget and some built in methods that tells Flutter to re-render if that state changes. **This is a key concept in Flutter.** Infact, this is arguably the basis of building Flutter apps.

---

**NB**: One of the most important ideas in Flutter is how it re-renders based on changes to `state` or data within your app.

---

```dart
// Stateless Widgets won't do anything to change state.
// Root of your application
class MyApp extends StatelessWidget {
  // Build method
  @override
  Widget build(BuildContext context) {
    // MaterialApp is a built in Flutter Widget that gives
    // us a lot styling out of the box.
    // The most important arguments for MaterialApp are title and home
    return new MaterialApp(
      // Arguments that Material App is looking for.
      title: 'Flutter Demo',
      theme: new ThemeData(
        // This is setting the primary color of the app to Blue.
        primarySwatch: Colors.blue,
      ),
      // MyHomePage is just another arbitrary widget
      // named by you, the developer
      home: new MyHomePage(title: 'Flutter Home Demo Page'),
    );
  }
}

// This Widget is Stateful,
// because it's managing the state of the counter.
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  // It's being passed in title, you can see above.
  final String title; // => Flutter Home Demo Page

   // Stateful Widgets don't have build methods.
   // They have createState() methods.
   // Create State returns a class that extends Flutters State class.
  @override
  _MyHomePageState createState() => new _MyHomePageState();

  // Stateful Widgets are rarely more complicated than this.
}

// This is the state that MyHomePage created.
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  // I've left in the comments from the sample app
  // because they say it better than I could:
  void _incrementCounter() {
    // Built in Flutter Method.
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance as done by the _incrementCounter method above.

    // Scaffold is another build in app that gives us a standard
    // mobile app layout. You'll most likely use this on every page
    // of your app
    return new Scaffold(
      // the bar accross the top of the app
      appBar: new AppBar(
        // State classes access properties on their
        // parent by calling widget.someProperty
        //  It's easier to think of StatefulWidgets and their corresponding
        // StateClasses as a single Widget.
        title: new Text(widget.title),
      ),
      body: new Center(
        // Center is a layout widget. It takes a single child
        // and positions it in the middle of the parent.
        child: new Column(
          // Column is also layout widget. It takes a List of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          //
          // mainAxisAlignment and crossAxisAlignment should feel very familiar
          // if you're used to using CSS's Flexbox or Grid.
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              // Text takes a String as it's first argument.
              // We're passing in the value of the counter
              // as an interpolated String.
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      // Floating action buttons are special button
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ),
    );
  }
}
```

---

**NB**: That's a quick run down of the code in a startr app. If you're lost, don't worry. Next we're going to start from scratch, which will help it make sense.

---

### The Widget Tree

If all of this class-nesting is confusing, perhaps this visual of the `Widget tree` will help. This is what your current counter application looks like. You can think of nested widgets simply as nested React Components or HTML web components with all the JS functionality built in.

![widget-tree](http://res.cloudinary.com/ericwindmill/image/upload/v1518974500/flutter_by_example/simple_tree.png)

The root of reactive, modular UI programing in Flutter is simply building tiny widgets, giving them data, and telling flutter when to render them, swap them out, or update them using `setState()`
