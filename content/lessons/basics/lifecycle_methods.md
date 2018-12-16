---
title: "Stateful Widget Lifecycle"
---

<div class='aside'>

Contents:

* [createState](#1-createstate)
* [mounted is true](#2-mounted-is-true)
* [initState](#3-initstate)
* [didChangeDependencies](#4-didChangeDependencies)
* [build](#5-build)
* [didUpdateWidget](#6-didupdatewidget)
* [setState](#7-setstate)
* [deactivate](#8-deactivate)
* [dispose](#9-dispose)
* [mounted is false](#10-mounted-is-false)

</div>

When a Flutter builds a 
[`StatefulWidget`](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html), it 
creates a [`State`](https://docs.flutter.io/flutter/widgets/State-class.html) object. This
object is where all the 
**[mutable](https://en.wikipedia.org/wiki/Immutable_object)** state for that widget is held.

The concept of state is defined by two things:

1. The data used by the widget might change.
2. The data _can't_ be read synchronously when the widget is built. (All state
   must be established by the time the `build` method is called).

### Why Are StatefulWidget and State Separate Classes?

In one word: performance.

The tldr version is that `State` objects are long lived, but StatefulWidgets
(and all Widget subclasses) are thrown away and rebuilt whenever configuration
changes. It's very inexpensive for Flutter to rebuild a mutable widget.

Because `State` isn't blown away on every rebuild, it avoids 
expensive computations, and gets at the state property everytime
something is rebuilt.

Also, this is what allows Flutter animations to exist. Because `State` isn't
thrown away, it can constantly be rebuilding it's Widget in response to data
changes.

### 1. createState()

When the Framework is instructed to build a 
[`StatefulWidget`](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html), it 
immediately calls 
[`createState()`](https://docs.flutter.io/flutter/widgets/StatefulWidget/createState.html). This 
method _must_ exist. A StatefulWidget rarely needs to be more complicated than this.

```dart
class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => new _MyHomePageState();
}
```

### 2. mounted is true

When `createState` creates your state class, a `buildContext` is assigned to
that state. BuildContext is, overly simplified, the place in the widget tree in which
this widget is placed. ![Here's a longer explanation.][https://flutterbyexample.com/build-context-class]

All widgets have a `bool this.mounted` property. It is turned true when the
`buildContext` is assigned. It is an error to call `setState` when a widget is
unmounted.

<div class='tip'>

**tip:** This property is useful when a method on your state calls `setState()`
but it isn't clear when or how often that method will be called. Perhaps its
being called in response to a stream updating. You can use `if (mounted) {...`
to make sure the State exists before calling `setState()`.

</div>

### 3. initState()

This is the first method called when the widget is created (after the class
constructor, of course.)

`initState` is called once and only once. It must called `super.initState()`.

This method is the best time to:

1. Initialize data that relies on the specific BuildContext for the created
   instance of the widget.
2. Initialize properties that rely on this widgets 'parent' in the tree.
3. Subscribe to Streams, ChangeNotifiers, or any other object that could change
   the data on this widget.

```dart
@override
initState() {
  super.initState();
  // Add listeners to this class
  cartItemStream.listen((data) {
    _updateWidget(data);
  });
}
```

### 4. didChangeDependencies()

This method is called immediately after `initState` on the first time the
widget is built.

It will also be called whenever an object that this widget _depends on data
from_ is called. For example, if it relies on an InheritedWidget, which updates.

`build` is **always** called after `didChangeDependencies` is called, so this
is rarely needed. However, this method is the first change you have to call
`BuildContext.inheritFromWidgetOfExactType`. This essentially would make this
State 'listen' to changes on a Widget it's inheriting data from.

The docs also suggest that it could be useful if you need to do network calls
(or any other expensive action) when an InheritedWidget updates.

### 5. build()

This method is called often. It is required, and it must return a Widget.

### 6. didUpdateWidget(Widget oldWidget)

If the parent widget changes and has to rebuild this widget (because it needs
to give it different data), but it's being rebuilt with the same `runtimeType`,
then this method is called.

This is because Flutter is re-using the state, which is long lived. In this
case, you may want to initialize some data again, as you would in initState.

If your state's `build` method relies on a Stream or other object that can
change, unsubscribe from the old object and re-subscribe to the new instance in
didUpdateWidget.

<div class='tip'>

**tip**: This method is basically the replacement for 'initState' if you expect
your Widget associated with this state to be rebuilt!

</div>

The framework always called `build` after this, so any call to `setState` is
redundant.

```dart
@override
void didUpdateWidget(Widget oldWidget) {
  if (oldWidget.importantProperty != widget.importantProperty) {
    _init();
  }
}
```

### 7. setState()

This method is called often from the framework itself and from the developer.
Its used to notify the framework that data has changed, and the widget at this
`build context` should be rebuilt.

`setState` takes a call back which _cannot_ be async. Otherwise, it can be used
as often as you'd like because repainting is cheap.

```dart
void updateProfile(String name) {
 setState(() => this.name = name);
}
```

### 8. deactivate()

Deactivate is called when `State` is removed from the tree, _but it might be
reinserted_ before the current frame change is finished. This method exists
basically because `State` objects can be moved from one point in a tree to
another.

This is rarely used.

### 9. dispose()

Dispose is called when the `State` object is removed, which is permanent.

This method is where you should unsubscribe and cancel all animations, streams,
etc.

### 10. mounted is false

The `state` object can never remount, and an error is thrown is `setState` is
called.
