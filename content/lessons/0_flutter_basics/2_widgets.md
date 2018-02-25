---
title: "Flutter Widgets"
lesson: 2
chapter: 0
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Setup and Tools"
next: "Flutter State"
tags:
    - programming
    - flutter
    - dart
---

If you've worked with React or Vue before, this'll be easy.

Everything in Flutter is a `Widget`, much like in JS frameworks you're working with small reusable components.

And a Widget is nothing more than a Dart class that extends a Flutter class.

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

Then somewhere else in an app we'd use the widget like this. The point is, again, that we're just creating a new instance of the class.

```dart
// ...
// This is how we'd use the BigText within another widget.
child: new BigText('This string would render and be big'),
// ...
```

---

### Stateless and StatefulWidgets

Flutter widgets must extend a handful of classes from the Flutter library. The two you'll use almost always are `StatelessWidget` and `StatefulWidget`.

The difference is that one has a concept of `state` within the Widget and some built in methods that tells Flutter to re-render if that state changes. **This is a key concept in Flutter.**

A `Stateful Widget` looks a bit different.

It's actually two classes: the state and the widget. This is how you'd write it:

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
