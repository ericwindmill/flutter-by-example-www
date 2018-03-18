---
title: "ListView and Builder Methods"
---

Right now you just have a card for your dog. It would be more useful to render all of them as a list.

One of the most important concepts in Flutter UI is rendering UI lists, which is often done in `builder methods`.

`Builder methods` essentially create a widget once for each piece of data in a Dart `List`.

First, create a new file called `dog_list.dart`.

## 1. DogList Class

```dart
// lib/dog_list.dart
import 'package:flutter/material.dart';
import 'package:we_rate_dogs/dog_card.dart';
import 'package:we_rate_dogs/dog_model.dart';

class DogList extends StatelessWidget {
  // Builder methods rely on a set of data, such as a list.
  final List<Dog> doggos;
  DogList(this.doggos);

  // First, make your build method like normal.
  // instead of returning Widgets, return a method which
  // returns widgets.
  // Don't forget to pass in the context!
  @override
  Widget build(BuildContext context) {
    return _buildList(context);
  }

  // A builder method almost always returns a ListView
  // A ListView is a widget similar to Column or Row
  // It knows whether it needs to be scrollable or not
  // It has a constructor called builder, which it knows will
  // work with a List.

  ListView _buildList(context) {
    return new ListView.builder(
      // Must have an item count equal to the number of items!
      itemCount: doggos.length,
      // A callback that will return a widget.
      itemBuilder: (context, int) {
        // In our case, a DogCard for each doggo.
        return new DogCard(doggos[int]);
      },
    );
  }
}
```

The only thing left to do is to actually **use** the DogList. Replace the DogCard in main with the DogList of Dog Cards.

```dart
// main.dart in the build method:

@override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
        backgroundColor: Colors.black87,
      ),
      body: new Container(
        // Remove the DogCard Widget.
        // Instead, use your new Dog List Class,
        // Pass in the mock data from the list above
        //
        child: new Center(                                              // new
          child: new DogList(dogs),                                     // new
        ),
      ),
    );
  }
```

This is your app already, (the dog pictures are random, of course):

![sample app](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1521385666/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-18_at_08.07.33.png)

