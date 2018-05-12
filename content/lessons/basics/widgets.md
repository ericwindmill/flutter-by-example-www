---
title: "Flutter Widgets"
---

If you've worked with React or Vue before, this'll be easy. Everything in
Flutter is a `Widget`, much like in JS frameworks you're working with small
reusable components. And a Widget is nothing more than a Dart class that extends a Flutter class.

All Flutter widgets look like this:

```dart
class ImageWidget extends StatelessWidget {
	// class stuff
}
```

Widget classes have basically only one requirement: it **must** have a `build` method which returns other Widgets. The only exception to this rule is low-level widgets like 'Text' that return primitive types (Strings or numbers, usually.)

```dart
class BigText extends StatelessWidget {

	Widget build(context) {
		return new Text('text');
	}
}
```

Other than that, a widget is just a normal Dart class. You can add methods and properties and the like.

```dart
class BigText extends StatelessWidget {
	// a property on this class
	final String text;

	// a constructor for this class
	BigText(this.url);

	Widget build(context) {
		// Pass the text down to a nother widget
		return new Text(
			text,
			// Even changing font-style is done through a Dart class.
			textStyle: new TextStyle(fontSize: 20.0),
		);
	}
}
```

Then somewhere else in an app you'd use the widget like this:

```dart
// ...
// This is how we'd use the BigText within another widget.
child: new BigText('This string would render and be big'),
// ...
```

---

### Stateless and StatefulWidgets

Flutter widgets must extend a handful of classes from the Flutter library. The two you'll use almost always are `StatelessWidget` and `StatefulWidget`.

The difference is that one has a concept of `state` within the Widget and some built in methods that tells Flutter to re-render if that state changes. This is a key concept in Flutter.

A `Stateful Widget` looks a bit different. It's actually two classes: the state
and the widget. This is how you'd write it:

```dart
class Counter extends StatefulWidget {
  Counter({Key key, this.title}) : super(key: key);

   // Stateful Widgets don't have build methods.
   // They have createState() methods.
   // Create State returns a class that extends Flutters State class.
  @override
  _MyHomePageState createState() => new _MyHomePageState();

  // Stateful Widgets are rarely more complicated than this.
}

class _MyHomePageState extends State<MyHomePage> {
	int counter = 0;

	void increaseCount() {
		// setState is a special method that tells Flutter to repaint
		// the view because state has been updated!
 		setState(() {
 			this.counter++;
 		}
 	}

	// gotta have that build method!
	Widget build(context) {
		return new RaisedButton(
			onPressed: increaseCount,
			child: new Text('Tap to Increase'),
		);
	}
}
```

### Flutter's Material and Cupertino Widgets

The Flutter SDK is extra nice becasue there are loads of built in widgets in the style of Android and iOS.

I hate to gush, but it's actually quite amazing what Flutter gives you out of the box. You can create pretty damn good looking and accessible mobile apps with no design chops at all. And, building layouts is super easy thanks to Flutter's layout widgets.

Imagine if you started a new React, Vue, React Native, etc project, and it came ready with hundreds of components that we're just ready to go with design standards in mind. That's what Material and Cupertino widgets are -- Material widgets are designed to look like Android apps and Cupertino like iOS.

These built in Widgets _and_ the ability to create completely custom widgets gives you a lot of power. You can create a completely custom app with lower-level custom widgets, or you can just use what you're given to get to MVP.

[Flutter Widget Library](https://flutter.io/widgets/)
