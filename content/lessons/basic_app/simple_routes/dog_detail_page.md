---
title: "Routing 1: Pages on the Fly"
---

There are a couple different ways to add more pages to your Flutter app.

For all pages you *know* will exist, you can use declared routes.

But this app just builds pages on the fly for each individual dog. This is a good case for route builders.

### 1. Create a Dog Detail Page:

Create a new file called `dog_detail_page.dart`

This is going to be a stateful Widget, so the user of your app can rate dogs later. But for now, there will be no state to manage.

For now this is what you'll be building:

![dog detail screenshot](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1521388587/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-18_at_08.51.49.png)

```dart
// lib/dog_detail_page.dart
import 'package:flutter/material.dart';
import 'package:we_rate_dogs_example/dog_model.dart';

// This page needs some dog data, so the class expects a dog.
class DogDetailPage extends StatefulWidget {
  final Dog dog;

  DogDetailPage(this.dog);

  @override
  _DogDetailPageState createState() => new _DogDetailPageState();
}

class _DogDetailPageState extends State<DogDetailPage> {
  // Arbitrary size choice for styles
  double dogAvatarSize = 150.0;
  // The dog image widget.
  Widget get dogImage {
    // Containers define the size of its children
    return new Container(
      height: dogAvatarSize,
      width: dogAvatarSize,
      // Use Box Decoration to make the image a cicle
      // and add a shadow
      // also arbitrary for styling
      decoration: new BoxDecoration(
        shape: BoxShape.circle,
        // Like in CSS
        // you often want to add
        // multiple BoxShadows for the right look
        // so the boxShadow property takes a list of
        // BoxShadows
        boxShadow: [
          const BoxShadow(
              // just like CSS:
              // it takes the same 4 properties
              offset: const Offset(1.0, 2.0),
              blurRadius: 2.0,
              spreadRadius: -1.0,
              color: const Color(0x33000000)),
          const BoxShadow(
              offset: const Offset(2.0, 1.0),
              blurRadius: 3.0,
              spreadRadius: 0.0,
              color: const Color(0x24000000)),
          const BoxShadow(
              offset: const Offset(3.0, 1.0),
              blurRadius: 4.0,
              spreadRadius: 2.0,
              color: const Color(0x1F000000)),
        ],
        // This is how you add
        // an image to a Container's background
        image: new DecorationImage(
          fit: BoxFit.cover,
          image: new NetworkImage(widget.dog.imageUrl),
        ),
      ),
    );
  }

  // The rating section
  // That says ★ 10/10
  Widget get rating {
    Use a row to lay out widgets horizontally
    return new Row(
      // Center the widgets on the main-axis
      // whch is the horizontal axis in a row
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        new Icon(
          Icons.star,
          size: 40.0,
        ),
        new Text(' ${widget.dog.rating} / 10',
            style: Theme.of(context).textTheme.display2),
      ],
    );
  }

  // The widget that displays the image, rating and dog info

  Widget get dogProfile {
    return new Container(
      padding: new EdgeInsets.symmetric(vertical: 32.0),
      decoration: new BoxDecoration(
        // This would be a great opportunity to
        // create a custom LinearGradient widget
        // that could be shared throughout the app
        // But I'll leave that to you
        gradient: new LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          stops: [0.1, 0.5, 0.7, 0.9],
          colors: [
            Colors.indigo[800],
            Colors.indigo[700],
            Colors.indigo[600],
            Colors.indigo[400],
          ],
        ),
      ),
      // The Dog Profile information
      child: new Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          dogImage,
          new Text(
            widget.dog.name + '  🎾',
            style: new TextStyle(fontSize: 32.0),
          ),
          new Text(
            widget.dog.location,
            style: new TextStyle(fontSize: 20.0),
          ),
          new Padding(
            padding:
                const EdgeInsets.symmetric(horizontal: 32.0, vertical: 16.0),
            child: new Text(widget.dog.description),
          ),
          rating
        ],
      ),
    );
  }

  //Finally, the build method:
  //
  // Aside:
  // It's often much easier to build UI
  // If you break up your widgets
  // the way I have in this file
  // rather than trying to have one massive build method
  @override
  Widget build(BuildContext context) {
    // This is a new page, so you need a new Scaffold!
    return new Scaffold(
      backgroundColor: Colors.black87,
      appBar: new AppBar(
        backgroundColor: Colors.black87,
        title: new Text('Meet ${widget.dog.name}'),
      ),
      body: dogProfile,
      ),
    );
  }
}


```

### 2. Add the Routing mechanism:

Now you have this page that you can't get to. Let's add the routing.

On your main page that lists all the dogs, each card will be a button that when tapped bring up that dogs detail page.

In your DogCard class, make the DogCard a button:

```dart
// dog_card.dart build method:
  @override
  Widget build(BuildContext context) {
    // InkWell is a special Material widget
    // It makes it's children tappable,
    // And adds Material Design ink response when tapped
    return new InkWell(                                                 //new
      // onTap is a callback that will be triggered when tapped
      onTap: showDogDetailPage,                                         // new
      child: new Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
        child: new Container(
          height: 115.0,
          child: new Stack(
            children: <Widget>[
              new Positioned(right: 0.0, child: dogCard),
              new Positioned(top: 7.5, child: dogImage),
            ],
          ),
        ),
      ),
    );
  }

  // This is the builder method that creates a new page.
  showDogDetailPage() {
    //
    // Navigator.of(context) accesses the current apps navigator
    // Navigators can 'push' new routes onto the stack,
    // as well as pop routes off the stack.
    //
    // This is the easiest way to build a new
    // page on the fly and pass that page
    // some state from the current page
    //
    Navigator.of(context).push(
      new MaterialPageRoute(
        // builder methods always take context!
        builder: (context) {
          return new DogDetailPage(dog);
        },
      ),
    );
  }
```


Your app now has pages for each and every dog.

And you may have noticed that there's a back button on the dog detail page, but theres no code for it.

Flutter automatically adds a `leading` button to an AppBar, which pops a route off. You can override it in the AppBar widget if you ever need to.