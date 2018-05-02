---
title: "Step Two: AnimatedWidget"
---

Back on track, time to make those bars dance.

### 1. SetUp Animation boiler plate in BarLoadingState

The following is very similar to the ColorTween example.
This has no functionality right now.

```dart
class _BarLoadingScreenState extends State<BarLoadingScreen>
    with TickerProviderStateMixin {
  AnimationController _controller;
  Tween<double> tween;

  @override
  initState() {
    super.initState();
    _controller = new AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    tween = new Tween<double>(begin: 0.0, end: 1.00);
    // Just play the animation forever.
    _controller.repeat();
  }

  @override
  dispose() {
    _controller?.dispose();
    super.dispose();
  }
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
```

### 2. Add Intervals to the Animation

The main challenge of this animation is that it requires 8 separate
steps to the overall animation, controlled by one AnimationController, distributed over only 4 widgets.

There are 8 steps in this animation because each of the four bars makes a
180degree pivot twice, and by the end of the animation they've all turned a
full turn.

Luckily, Flutter also provides a way to make animations that only occur during
certain times of a `Tween`. It's called an Interval.

You're going to have to write an Interval for each of the eight steps. Here's
the explanation of one:

```dart
class _BarLoadingScreenState extends State<BarLoadingScreen>
    with TickerProviderStateMixin {
  AnimationController _controller;
  Tween<double> tween;

  @override
  initState() {
    super.initState();
    _controller = new AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    tween = new Tween<double>(begin: 0.0, end: 1.00);
    _controller.repeat().orCancel;
  }

  @override
  dispose() {
    _controller?.dispose();
    super.dispose();
  }

  // Animations always start with tweens, but you can reuse tweens.
  Animation<double> get stepOne => tween.animate(
        // For intervals, you can pass in an Animation rather than
        // the controller
        new CurvedAnimation(
          // But pass in the controller here
          parent: _controller,
          // The interval is basically what point of the tween
          // to start at, and what point to end at
          // this tween is 0 to 1,
          // so step one should only animate the first 1/8 of the tween
          // which is 0 to 0.125
          curve: new Interval(
            0.0,
            0.125,
            // the style curve to pass.
            curve: Curves.linear,
          ),
        ),
      );
// ...
```

Again, you need to write an interval for each of the 8 steps. Or, you can copy
and paste [from the source code.](https://github.com/ericwindmill/flutter_custom_loader_animation/blob/master/lib/main.dart)

Once you've written all 8 intervals, you're going to need the widgets that
actually animate during each of these 8 steps.

###3: Use Animated Widgets

Another awesome built in Flutter feature is `AnimatedWidgets`. These provide
two neat things:

1. You don't have to use `addListener` and `setState` on your animations to
   tell Flutter to rebuild. AnimatedWidgets have a different technique.
2. There are some built in classes that extend `AnimatedWidget` and provide
   some common 'transformations'.

This is the entire AnimatedWidget. That I built for this animation. Don't get
bogged down in the common details(like margins): I highlighted the pieces that
are important to understand.

```dart
class PivotBar extends AnimatedWidget {
  // Animated Widgets need to be passed an animation,
  // Or in this case, multiple animations.
  final List<Animation<double>> animations;
  // They also need the controller.
  final Animation<double> controller;

  // These are properties specific to this case.
  final FractionalOffset alignment;
  final bool isClockwise;
  final double marginLeft;
  final double marginRight;

  PivotBar({
    Key key,
    this.alignment: FractionalOffset.centerRight,
    @required this.controller,
    @required this.animations,
    @required this.isClockwise,
    this.marginLeft = 15.0,
    this.marginRight = 0.0,
  }) : super(key: key, listenable: controller);

  // The AnimatedWidget in this case is animating a relatively unused value.
  // Which is the transform value on the transform widget.
  // Transforms are much like CSS transform. It accepts a variety of functions
  // on it's Transform property. This specific property will rotate a widget
  // around a designated point.
  // The most important part to understand here is that it relies
  // on the value of the animation (Interval), so it's constantly being updated
  // by the AnimatedWidget
  Matrix4 clockwiseHalf(animation) =>
      new Matrix4.rotationZ((animation.value * math.pi * 2.0) * .5);
  Matrix4 counterClockwiseHalf(animation) =>
      new Matrix4.rotationZ(-(animation.value * math.pi * 2.0) * .5);

  @override
  Widget build(BuildContext context) {
    // Tell the widget which way to rotate based on its position
    var transformOne;
    var transformTwo;
    if (isClockwise) {
      transformOne = clockwiseHalf(animations[0]);
      transformTwo = clockwiseHalf(animations[1]);
    } else {
      transformOne = counterClockwiseHalf(animations[0]);
      transformTwo = counterClockwiseHalf(animations[1]);
    }

    // This is the real trick. Just wrap the Bar widget in two transforms, one
    // for each transformation (or Interval passed in as an Animation).
    return new Transform(
      transform: transformOne,
      alignment: alignment,
      child: new Transform(
        transform: transformTwo,
        alignment: alignment,
        child: new Bar(marginLeft: marginLeft, marginRight: marginRight),
      ),
    );
  }
}
```

In order to get this all working perfectly, you'll also need to update your
`Bar` class to respect the passed in margins.

```dart
class Bar extends StatelessWidget {
  final double marginLeft;
  final double marginRight;

  const Bar({Key key, this.marginLeft, this.marginRight}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new Container(
      width: 35.0,
      height: 15.0,
      margin: new EdgeInsets.only(left: marginLeft, right: marginRight),
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
        ],
      ),
    );
  }
}
```

###4: Add the Animated Widget to the \_BarLoadingScreenState

Now that you have 8 intervals to your animation, and an `AnimatedWidget` to
feed em to, the last step is just adding the `PivotBar` to your build method in
`_BarLoadingScreenState`.

```dart
@override
  Widget build(BuildContext context) {
    return new Container(
      decoration: new BoxDecoration(color: animation.value),
      child: new Center(
        child: new Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // The left most bar gets the first two animations
            // because it always does a full turn.
          new PivotBar(
            alignment: FractionalOffset.centerLeft,
            controller: _controller,
            animations: [
              stepOne,
              stepTwo,
            ],
            marginRight: 0.0,
            marginLeft: 0.0,
            isClockwise: true,
          ),
          // This bar gets the third, but it only turns a half turn
          // Before the next bar's turn.
          new PivotBar(
            controller: _controller,
            animations: [
              stepThree,
              stepEight,
            ],
            marginRight: 0.0,
            marginLeft: 0.0,
            isClockwise: false,
          ),
          // Two more pivot bars
          ],
        ),
      ),
    );
  }
```

And that's it. I ommited some of the repeated code, but you can find it [here in
the source code.](https://github.com/ericwindmill/flutter_custom_loader_animation/blob/master/lib/main.dart)
