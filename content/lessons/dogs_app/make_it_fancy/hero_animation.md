---
title: "Hero Transition"
---

The hero transition is even more impressive. And easier to work with.

This is what a hero animation does:

![Hero animation screenshot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,r_5,w_300/v1521400580/flutter_by_example/hero_animation.gif)

And you can make it happen with four new lines of code.

### 1. Update your DogCard dogImage again

```dart
// lib/dog_card.dart in _DogCardState
  Widget get dogImage {
    // Wrap the entire widget in a 'Hero' widget
    var dogAvatar = new Hero(
      // Give your hero a tag
      //
      // Basically, Flutter looks for two widgets on two
      // different pages, and if they have the same tag
      // It animates them between the two pages
      //
      tag: dog,
      child: new Container(
      ...

      // dont forget to close that Hero parentheses
      // at the bottom of your widget!
```

### 2. Update your DogDetailPageState dogImage

Add almost the exact same two links of code:

```dart
  Widget get dogImage {
    return new Hero(
       // The same code, except the Dog property lives on the
       // widget in this file.
      tag: widget.dog,
      child: new Container(
        height: dogAvatarSize,
    ...


    // dont forget to close that Hero parentheses
    // at the bottom of your widget!
```


Refresh your app. You implemented a Hero Transition. !




___
## That's the end, for now!
Sign up below to get notified when more tutorials are added weekly!

