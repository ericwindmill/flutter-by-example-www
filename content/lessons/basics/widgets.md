---
title: "Flutter Widgets"
---

<div class='aside'>

## What's covered?

* [What's a Widget?](#whats-a-widget)
* [Stateful and Stateless Widgets](#stateless-and-statefulwidgets)
* [Material and Cupertino](#material-and-cupertino-widgets)
* [Most Common Widgets](#most-common-widgets)
* [Thinking in Widgets](#thinking-in-widgets)

</div>

### What's a Widget?

In Flutter, _everything_ is a widget.

If you've worked with React or Vue before, this'll be easy. Everything in
Flutter is a `Widget`, much like in JS frameworks you're working with small
reusable components. And a Widget is nothing more than a Dart class that extends a Flutter class.

All Flutter widgets look like this:

```dart
class ImageWidget extends StatelessWidget {
	// class stuff
}
```

Widget classes have (usually) only one requirement: it **must** have a `build`
method which returns other Widgets. The only exception to this rule is low-level widgets like 'Text' that return primitive types (Strings or numbers, usually.)

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
	BigText(this.text);

	Widget build(context) {
		// Pass the text down to another widget
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

A `Stateful Widget` looks a bit different. It's actually two classes: the state object
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

### Material and Cupertino Widgets

The Flutter SDK is extra nice because there are loads of built in widgets in the
style of Android and iOS.

I'm sorry for gushing, but it's actually quite amazing what Flutter gives you out
of the box. You can create pretty damn good looking and accessible mobile
apps with no design chops at all.

Imagine if you started a new React, Vue, React Native, etc project, and it came
ready with hundreds of components that we're just ready to go with design
standards in mind. That's what Material and Cupertino widgets are -- Material
widgets are designed to look like Android apps and Cupertino like iOS.

These built in Widgets _and_ the ability to create completely custom widgets
gives you a lot of power. You can create a completely custom app with
lower-level custom widgets, or you can just use what you're given to get to MVP.

### Most Common Widgets

These are the widgets that are ready to go, out of the box, and you'll want to
get very comfortable with:

* Text - A widget used to simply simply text on the screen.
* Image - For displaying images.
* Icon - For displaying Flutter's built in Material and Cupertino icons.
* Container - The `div` of Flutter UI. It's a convenience widget that allows
  you to add padding, alignment, backgrounds, force sizes on widgets, and
  boatloads of other things. It also takes up 0px space when empty, which comes
  in handy.
* TextInput - To handle user feedback.
* Row, Column - These are widgets that display a list of children in horizontal
  or vertical directions. They follow flex-box rules for layout, if you're
  coming from the web and know CSS.
* Stack - A stack displays a list of children on top of one and other. This
  functions much like the 'position' property in CSS.
* Scaffold - This is the root of every _page_ in your app, which gives your app
  a basic layout structure. It makes it easy to implement bottom navigations,
  appBars, back buttons, etc.

The widget documentation is _very_ good in Flutter. Checkout the [catalogue](https://flutter.io/widgets/).

<div class='aside'>

**NB:** If you're familiar with component based frameworks like React, you
probably
don't need to read this. Widgets are just components.

</div>

### Thinking in Widgets

In Flutter, _everything_ is a widget. Widgets are just tiny chunks of
UI that you can combine to make a complete app. Building an app Flutter is
like building a lego set -- piece by piece.

Widgets are nested inside of eachother to build your app. Even the root of your
app is just a widget. It's widgets all the way down.

Flutter is unique in that _every_ aspect of UI is handled with Widgets.

A widget might display something, it might help define design, it might help
with layout, or it may handle interaction. I really can't exclaim this enough:
_everything is a widget_

* A simple widget that displays text: `const Text('Hello World')`.
* A simple widget that a user interacts with `const Button(onTap: ...callback...)`
* A simple widget that adds a background color: `const BoxDecoration(background: Colors.blue)`

Basically, imagine that your CSS, HTML, and JavaScript are all handled by
widgets. There is no markup language. There is no CSS. Just widgets.

### Widget Hierarchy

In this picture, every thing that's outlined is a widget:

![Outlined widgets](https://res.cloudinary.com/ericwindmill/image/upload/v1527539536/flutter_by_example/thinking_in_widgets.png)

This picture is from one of the tutorial apps on FlutterByExample, and this is
a detail page, of which there is one for every dog in the app.

The green outline represents the page. And a page in Flutter is a
widget. The blue outlines represent pieces of UI that logically group together.
The rest are outlined white, and they're simply dumb components that have no
concern over their content, they just display what they're told.

This is the widget hierarchy for this page:

<div class='aside'>

* PageWidget

  * DogProfileWidget
    * CircleImage
    * Text
    * Text
    * Text
    * Container
      * Icon
      * Text
  * RateDogWidget
    * Slider
    * Text
    * SubmitButton

<strong>NB</strong> This isn't _exactly_ accurate, there are layout widgets
such as
`columns`and `padding` in here that I'm glossing over.

</div>

### Design for Re-usability

The most important part of using Flutter Widgets effectively is designing your
lowest level widgets to be reusable.

For example, the CircleImage widget from the image above:

```dart
class CircleImage extends StatelessWidget {
 final String renderUrl;

 CircleImage(this.renderUrl);

 @override
 Widget build(BuildContext context) {
   return new Container(
    width: 100.0,
    height: 100.0,
    decoration: new BoxDecoration(
      shape: BoxShape.circle,
      image: new DecorationImage(
        fit: BoxFit.cover,
        image: new NetworkImage(renderUrl ?? ''),
      ),
    ),
  );
 }
}
```

Then, anywhere in your app, you can reuse this Widget: `new CircleImage('https..)`.
This component is designed for re-usability because anywhere in your app that
you may want a round image of a certain size, you can just pass in a url and
there you have it. There's no need to re-write this widget over and over.

And, this circle image doesn't care at all about what it's displaying. It's
just enforcing styles.

In the test app that these images are from, I also have a list of all the dogs
in the app. Heres a picture of one of the cards:

![Dog card](https://res.cloudinary.com/ericwindmill/image/upload/v1527539533/flutter_by_example/Screen_Shot_2018-05-27_at_12.13.40_PM.png)

In that Widget, I don't need to rewrite the circle image, because I've already
built it once.
