---
title: "Reusable Custom Card Widget"
---

### 1. Create Dog Card Widget

We need a nice widget to display our doggos.

First you'll make a card that looks like this:

![dog card](https://res.cloudinary.com/ericwindmill/image/upload/v1521328467/flutter_by_example/Screen_Shot_2018-03-10_at_10.28.18_AM.png)

Create a new file called 'dog_card.dart`.

In that file, make a new, blank `StatefulWidget`. It should take a Dog in its constructor.

For the time being, all this will do is display the name of a dog.

```dart
// dog_card.dart

import 'package:flutter/material.dart';

import 'dog_model.dart';

class DogCard extends StatefulWidget {
  final Dog dog;

  DogCard(this.dog);

  @override
  _DogCardState createState() => _DogCardState(dog);
}

class _DogCardState extends State<DogCard> {
   Dog dog;

   _DogCardState(this.dog);

  @override
  Widget build(BuildContext context) {
    return Text(widget.dog.name);
  }
}
```

In order to make the `DogCard` appear, let's modify the `_MyHomePageState` `build` method in `main.dart`:

```dart
// main.dart

@override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          backgroundColor: Colors.black87,
        ),
        body: Container(
          child: DogCard(initialDoggos[1]), // New code
        ),
    );
  }
```

And import `dog_card.dart`:

```dart
// main.dart

import 'package:flutter/material.dart';

import 'dog_card.dart';
import 'dog_model.dart';
```

Refresh your app and you can see that it's wired up now. Time to build the card.

### 2. Dog Card UI

There are two main parts to this card. The image, and the actual Card that sits under it.

First, make that image.

Add this getter to you `DogCardState` class:

```dart
// dog_card.dart
    // A class property that represents the URL flutter will render
    // from the Dog class.
  String renderUrl;
  Widget get dogImage {
    var dogAvatar = new Container(
        // you can explicity set heights and widths on Containers.
        // otherwise they take up as much space as their children.
      width: 100.0,
      height: 100.0,
        // decoration is a property that lets you style the container.
        // It expects a BoxDecoration
      decoration: new BoxDecoration(
        // BoxDecorations have many possible properties
        // Using BoxShape with a background image
        // is the easiest way to make a circle cropped avatar style
        // image.
        shape: BoxShape.circle,
        image: new DecorationImage(
           // Just like CSS's `imagesize` property
          fit: BoxFit.cover,
          // A NetworkImage widget is a widget that
          // takes a URL to an image.
          // ImageProviders (such as NetworkImage)
          // are ideal when your image needs to be laoded or can
          // change.
          // Use the null check to avoid an error.
          image: new NetworkImage(renderUrl ?? ''),
        ),
      ),
    );

    return dogAvatar;
  }
```

In order to see this image, you'll first need to tell the Dog class to get that image from the internets.

In your dog card, add this to your `DogCardState` class:
```dart
    // State classes run this method when the state is created.
    // You shouldn't do async work in initState, so we'll defer it
    // to another method.
  void initState() {
    super.initState();
    renderDogPic();
  }
    // IRL, we'd want the Dog class itself to get the image
    // but this is a simpler way to explain Flutter basics
  void renderDogPic() async {
    // this makes the service call
    await dog.getImageUrl();
    // setState tells Flutter to rerender anything that's been changed.
    // setState cannot be async, so we use a variable that can be overwritten
    setState(() {
        renderUrl = dog.imageUrl;
    });
  }
```

Now you have a dog avatar, that's properly getting the url to render.

In order to get overlap look of the card, use the built-in widget `Stack`.

The `Stack` widget lays out it's children relative to it's edges.

In other words, it's CSS's `position, top, bottom, left and right` properties.

Within a stack, you can wrap children in 'Position' widgets, but you don't have to.

* Position wrapped widgets are outside of document flow, to use web development terms. They'll be at positon [0,0] by default -- the top corner of the Stack widget.
* Non-wrapped widgets aren't positioned. They stay in normal 'document flow', laid out as a column of widgets by default.

This is how the stack is going to start:

```dart
...
@override
  Widget build(BuildContext context) {
    // Start with a container so we can add layout and style props:
    return new Container(
      // Arbitrary number that I decided looked good:
      height: 115.0,
      // A stack takes children, with a list of widgets.
      child: new Stack(
        children: <Widget>[
          // position our dog image, so we can explicitly place it.
          // We'll place it after we've made the card.
          new Positioned(
          child: dogImage,
          ),
        ],
      ),
    );
  }
```
Refresh your app, you have a picture of a dog in the top corner.

Let's create the Card and lay that out:

```dart
// dog_card.dart in DogCardState class
Widget get dogCard {
    // A new container
    // The height and width are arbitrary numbers for styling
    return new Container(
      width: 290.0,
      height: 115.0,
      child: new Card(
        color: Colors.black87,
        // Wrap children in a Padding widget in order to give padding.
        child: new Padding(
          // The class that controls padding is called 'EdgeInsets'
          // The EdgeInsets.only constructor is used to set
          // paddings explicitly to each side of the child.
          padding: const EdgeInsets.only(
            top: 8.0,
            bottom: 8.0,
            left: 64.0,
          ),
          // Column is another layout widget -- like stack -- that
          // takes a list of widgets as children, and lays the
          // widgets out from top to bottom
          child: new Column(
            // these alignment properties function exactly like
            // CSS flexbox properties.
            // The main axis of a column is the vertical axis,
            // `MainAxisAlignment.spaceAround` is equivelent of
            // CSS's 'justify-content: space-around' in a vertically
            // laid out flexbox.
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              new Text(widget.dog.name,
                  // Themes are set inthe MaterialApp widget at the root of your app.
                  // They have default values -- which we're using because we didn't set our own.
                  // They're great for having consistent, app wide styling that's easily changable.
                  style: Theme.of(context).textTheme.headline),
              new Text(widget.dog.location,
                  style: Theme.of(context).textTheme.subhead),
              new Row(
                children: <Widget>[
                  new Icon(
                    Icons.star,
                  ),
                  new Text(': ${widget.dog.rating} / 10')
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
```

Almost there. One more thing you need to do to complete the DogCard UI. Add a bit more styling to the main widget in the build method:

```dart
// dog_card.dart in DogCardState class
  @override
  Widget build(BuildContext context) {
    return new Padding(                                                                                                 new
    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: new Container(
        height: 115.0,
        child: new Stack(
          children: <Widget>[
            dogCard,
            new Positioned(top: 7.5, child: dogImage),
          ],
        ),
      ),
    );
  }
```
