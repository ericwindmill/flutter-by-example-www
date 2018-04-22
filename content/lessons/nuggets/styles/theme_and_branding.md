---
title: "Effective Theme Use"
---

> What's the Point?
> Effectively using ThemeData will potentially save you from having to ever thing about colors, typography and global styles. It's truly set it and forget it. 

In Flutter, *everything* is a widget. Because of that, styling and UI in 
Flutter is handled similarly to component-based, scoped CSS on the web (a la 
Vue or Styled Components). This is definitely a feature, and a huge wine for 
styling. But, Flutter also gives you some handy ways to set global style 
settings. Mostly via the built in `Theme` widget. 

`Theme` is an inherited widget that you more or less use to set things like 
Color and Font, and it automatically applies these settings to all widgets 
below it in the Widget tree.

`MaterialApp` Widgets are the only widgets that accept a 
Theme. These Widgets will always be at the top of a Widget tree. For all 
intents and purposes, when you set `ThemeData`, it sets properties in your 
entire app.

## Example One: Default Theme

Particularly using the `MaterialApp` as your root widget (which I imagine 
you'll be doing almost always), there's a default `Theme`, that if you don't 
override, sets up your app with a general Material style look. 

Consider the starting counter app that s built when you start a new Flutter 
project. This is in the `MyApp` widget:

```dart
  return new MaterialApp(
    title: 'Flutter Demo',
    // This is actually redundant.
    // Flutter defaults to 'blue' for the ThemeData
    theme: new ThemeData(
      primarySwatch: Colors.blue,
    ),
    home: new MyHomePage(title: 'Flutter Demo Home Page'),
  );
```

If you go ahead and take that theme data out, and just stick with the 
following, you actually get the same thing.

```dart
  return new MaterialApp(
    title: 'Flutter Demo',
    home: new MyHomePage(title: 'Flutter Demo Home Page'),
  );
```

## Flutter Dark Theme

Flutter also includes a Dark theme. 

```dart
  return new MaterialApp(
    title: 'Flutter Demo',
      theme: new ThemeData(
        brightness: Brightness.dark,                        // new
      ),
    home: new MyHomePage(title: 'Flutter Demo Home Page'),
  );
```

![Flutter Dark Theme]()

## Setting Theme Data

There a boatload of changes you can make. [Here's the full list.](https://docs.flutter.io/flutter/material/ThemeData-class.html)

The changes roughly fall into the following categories:

* Colors
  * These properties range from very broad (`primaryColor`) to very specific (`secondaryHeaderColor`).
* Typography (More detail below)
  * You can set a `primaryTextTheme`, that will be used by default, and `secondaryTextTheme`, that you can use to override text where necessary.
* Icon data
* Form element themes
  * i.e. `inputDecorationTheme`, `buttonThemeData` and `sliderThemeData`.
* Target platform (More on this below.)
  * This is actually a property that you wouldn't set, but rather use as a getter. 
  
Simple example changes:

```dart
Widget build(BuildContext context) {
  return new MaterialApp(
    title: 'Flutter Demo',
    theme: new ThemeData(
      primaryColor: Colors.amber,
      textTheme: new TextTheme(
        body1: new TextStyle(color: Colors.red),
      ),
    ),
    home: new MyHomePage(title: 'Flutter Demo Home Page'),
  );
}
```

![Simple theme changes]()

## Build A Theme Effectively

You may have noticed an issue here. The text that displays the current count 
is white and unreadable. This is because my code completely overrode the 
theme by establishing a new Theme. You can aovid this by just overwriting the
 theme data you want to overwrite.
 
 ```dart
// The `copyWith` method over writes only what you want to overwrite.
textTheme: Theme.of(context).textTheme.copyWith(
 body1: new TextStyle(color: Colors.red),
),
...
 ```
 
 
 ![Simple theme changes with copyWith]()
 
The best way to build a theme is start with the default built into 
`MaterialApp`, and use `copyWith` for all the new information. 
 
 ## Get ThemeData in your App 
 
 I added this to my apps theme:
 
```dart
...
 theme: Theme.of(context).copyWith(
  primaryColor: Colors.amber,
  textTheme: Theme.of(context).textTheme.copyWith(
    body1: new TextStyle(color: Colors.red),
    body2: new TextStyle(color: Colors.pink, fontSize: 24.0),         // new
  ),
),
...
```

In order to use that `body2` style in an app, use the `of` method that's 
provided on Theme: 

```dart
new Text(
  'You have pushed the button this many times:',
  style: Theme.of(context).textTheme.body2),
),
``` 

![Theme changes body2]()

That's all there is to it.

## TextTheme

TextThemes are essentially exactly the same, but taking the time to set up 
the text themes you want at the beginning will save you a lot of time later. 
These are the properties you can set with your TextTheme:

* display4
* display3
* display2
* display1
* headline
* title
* subhead
* body2
* body1
* caption
* button

To be honest, no app in the world should need more than that many different 
font styles. Consistency is the first key to good app design.


## Typography class

Flutter also has a handy built in class called `Typography`. This class has 
two properties: `Tyopgraphy.white` and `Typography.black`. This class simply 
provides text that follows [Material design guidelines.](https://material.io/guidelines/style/typography.html#)

```dart
theme: Theme.of(context).copyWith(
  primaryColor: Colors.amber,
  textTheme: Typography().black,      // new
),
```

This class *cannot* be overridden.

Your default text theme will already follow these guidelines, so you probably
 won't find yourself using this, ever. In fact, I think the point is that 
 this is the starting point for all your textThemes.
 
**NB:** If using default text themes, the text *will* change between the 
proper text themes depending on the device: Cupertino for iOS and 
MountainView for Android and Fuchsia. **However**, while testing, your app 
will always display MountainView.

## Custom Themes

In the next lesson, you'll see how you can use the `InheritedWidget` to build
 your own custom theme.