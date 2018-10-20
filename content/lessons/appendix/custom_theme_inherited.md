---
title: "InheritedWidget: Custom Theme Class"
---

There are a few global style options that are glaringly missing from
Flutter's built in theme. For example, consistent spacing might be _the most_
important part of good layout design.

If you're working with a team, maybe you want to ensure that everyone working
on your app uses the exact
same spacing guidelines. You can achieve this by creating your own
`InheritedWidget` that passes props across the whole app. `Theme` is an
inherited Widget, so it would work exactly like that.

## Set Up a Custom Theme

The `InheritedWidget` takes a bit of boiler plate to set up, so if it's your
first time, you may benefit from a 'zero-to-one' explanation:

[Here's a detailed explanation of how to use an InhertiedWidget.](https://ericwindmill.com/using-flutter-inherited-widgets-effectively)

What you'll actually need to set this up is 3 classes:

```dart
class LayoutThemeContainer extends StatefulWidget
class LayoutThemeState extends State<LayoutThemeContainer>
class _InheritedStateContainer extends InheritedWidget
```

LayoutThemeContainer is just a standard StatefulWidget, with on bonus method: `of`.

```dart
static LayoutThemeState of(BuildContext context) {
  return (context.inheritFromWidgetOfExactType(_InheritedStateContainer)
        as _InheritedStateContainer)
    .data;
}
```

Your state class is pretty simple also:

```dart
class LayoutThemeState extends State<LayoutThemeContainer> {
  // Add all your theme properties and logic here:
  double get spacingUnit => 10.0;

  @override
  Widget build(BuildContext context) {
    return new _InheritedStateContainer(
      data: this,
      child: widget.child,
    );
  }
}
```

And finally, a standard `InheritedWidget` class:

```dart
class _InheritedStateContainer extends InheritedWidget {
  final LayoutThemeState data;

  _InheritedStateContainer({
    Key key,
    @required this.data,
    @required Widget child,
  }) : super(key: key, child: child);

  @override
  bool updateShouldNotify(_InheritedStateContainer old) => true;
}
```

## Use the Custom Theme

### 1. Wrap your app

First, you need to wrap your app in the theme, so you can access it everywhere:

```dart
class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return LayoutThemeContainer(
      child: new MaterialApp(
        title: 'Flutter Demo',
        theme: Theme.of(context).copyWith(
            primaryColor: Colors.amber,
            textTheme: Typography(platform: TargetPlatform.iOS).black),
        home: new MyHomePage(title: 'Flutter Demo Home Page'),
      ),
    );
  }
}
```

## 2. Use the props:

```dart
new Container(
  padding: new EdgeInsets.all(
    // Just like you'd use Theme.of or MediaQuery.of
    LayoutThemeContainer.of(context).spacingUnit,
  ),
  decoration: new BoxDecoration(
    color: Colors.cyanAccent,
  ),
  child: new Text('You have pushed the button this many times:'),
),
```

![Using an inherited widget](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1524498808/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-04-23_at_08.53.02.png)

## 3. A design system suggestion:

At the company I work for, we _mostly_ follow material guidelines, but we
have some of our own design conventions in place. In order to ensure that
everyone is on the same page, we use a custom theme that forces us to work
within our own rules.

For example, if you wanted everyone to use an 8pt grid (a la Material design):

```dart
class LayoutThemeState extends State<LayoutThemeContainer> {
  // Generic Material Spacing Sizes
  static const double _matGridUnit = 8.0;

  static double matGridUnit({scale = 1}) {
    // Material design grid uses multiples of 8
    // Multiples of 4 are acceptable if needed
    // Only accept numbers that are full or half units of _matGridUnit
    assert(scale % .5 == 0);
    return _matGridUnit * scale;
  }
...
```

Then to use it:

```dart
new Container(
  padding: new EdgeInsets.all(
    LayoutThemeContainer.of(context).matGridUnit(scale: 2.5),
  ),
```

It's that easy, and super useful as your team and app grows.
