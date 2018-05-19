---
title: "Step One: Tweening"
---

In this nugget, you're going to build a simple animation that looks like this:

![custom animation gif](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_250/v1525022858/flutter_by_example/animation.gif)

This is actually 8 animation intervals in one animation, but divided over only
4 widgets.

> #### What'll you learn ?
>
> * AnimatedWidget
> * Tweens
> * AnimationController
> * Transform

This 'app' will have 4 classes:

1. `BarLoadingScreen extends StatefulWidget`
2. `_BarLoadingScreenState extends State<BarLoadingScreen> with TickerProviderStateMixin`

* This is basically the highest widget in the tree
* It will eventually hold the `AnimationController`
* Its Basically the entire brains of the animation

3. `Bar extends StatelessWidget`

* Just the dumb widget for display

4. `PivotAnimation extends AnimatedWidget`

* This is the Wrapper for the bar
* It turn the Tweens and Animations into Transforms

### Step 1: Build Boiler Plate

The following will just render the four bars to the screen. After this you can
focus on implementing the actual animations.

```dart
void main() {
  runApp(new MaterialApp(
    home: Scaffold(
      body: new BarLoadingScreen(),
    ),
  ));
}

class BarLoadingScreen extends StatefulWidget {
  @override
  _BarLoadingScreenState createState() => new _BarLoadingScreenState();
}

class _BarLoadingScreenState extends State<BarLoadingScreen> {
  @override
  Widget build(BuildContext context) {
    return new Container(
      child: new Center(
        child: new Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Bar(),
            new Bar(),
            new Bar(),
            new Bar(),
          ],
        ),
      ),
    );
  }
}

class Bar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
      width: 35.0,
      height: 15.0,
      decoration: new BoxDecoration(
          color: const Color.fromRGBO(0, 0, 255, 1.0),
          borderRadius: new BorderRadius.circular(10.0),
          boxShadow: [
            new BoxShadow(
              color: Colors.black12,
              blurRadius: 8.0,
              spreadRadius: 1.0,
              offset: new Offset(1.0, 0.0),
            ),
            new BoxShadow(
              color: Colors.black26,
              blurRadius: 6.0,
              spreadRadius: 1.5,
              offset: new Offset(1.0, 0.0),
            ),
          ]),
    );
  }
}
```

### Step 2: Add Controller and Tween

All Flutter Animations need two things:

1. An AnimationController. This controller has two important purposes. First,
   it defines how long the animaiton will last via it's `duration` property. It's
   other purpose is to provide a handful of methods that tell the animation how to
   behave. i.e. `repeat()`, `forward()` and `reverse()`.

2. Tweens. `Tween` is short for 'in between', and it represents the value of
   the property changing in between frames. For example, if you're animating the
   opacity of a container from 0.0 to 1.0, your tween will represent the values at
   `0.1`, `0.2`, and so on.

You set up Tweens by creating new Tween class and passing the starting and
ending values. In the opacity example, because opacity values are `doubles`
you'd do something like this:

```dart
Tween<double> tween = new Tween<double>(begin: 0.0, end: 1.0);
// then you'd animate it, but more on that in a bit
```

But if you wanted to animate from blue to green, Flutter Tweens can do that too:

```dart
ColorTween colorTween = new ColorTween(
  begin: Colors.blue[400],
  end: Colors.green[400],
);

// then you'd animate it, but more on that in bit.
```

The point is, Tween's return values at periods between start and finish, which
you can pass as props to whatever you're animating, so it's always getting
updated.

### 2.5 Detour: Color Tween Example

Go ahead and add this to your boiler plate. It's a small detour to see the most
basic animation in Flutter.

```dart
// You have to add this class mixin in order for flutter to know to treat it as
// an animation containing widget
class _BarLoadingScreenState extends State<BarLoadingScreen>
    with SingleTickerProviderStateMixin {
  AnimationController _controller;                                    // new
  Animation<Color> animation;                                         // new

  @override
  initState() {
    super.initState();
    // Because this class has now mixed in a TickerProvider
    // It can be its own vsync. This is what you need almost always
    _controller = new AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    // A tween that begins at grey and ends at a green
    // The chained 'animate' function is required
    animation = new ColorTween(
      begin: const Color.fromRGBO(10, 10, 10, 0.5),
      end: const Color.fromRGBO(0, 200, 100, 0.5),
    ).animate(_controller)
    // This is a another chained method for Animations.
    // It will call the callback passed to it everytime the
    // value of the tween changes. Call setState within it
    // to repaint the widget with the new value
    ..addListener(() {
      setState((){});
    });
    // Tell the animation to start
    _controller.forward();
  }

  // This is important for perf. When the widget is gone, remove the controller.
  @override
  dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Container(
       // This is where you pass the animation value
       // Each time set state gets called,
       // this widget gets rebuilt,
       // and the value of the animation is something inbetween
       // the starting grey and the ending green
       // thanks to our ColorTween
      decoration: new BoxDecoration(color: animation.value),
      child: new Center(
        child: new Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Bar(),
            new Bar(),
            new Bar(),
            new Bar(),
          ],
        ),
      ),
    );
  }
}
```

Do a full refresh on your app. Look at the background change color.
