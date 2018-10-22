---
title: "Data Model & HTTP"
---


### 1. Get to a Clean Slate

All Flutter apps start with `main.dart`. Get rid of all the Counter app stuff, and you'll end up with this: 

```dart
// main.dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    /// MaterialApp is the base Widget for your Flutter Application
    /// Gives us access to routing, context, and meta info functionality.
    return new MaterialApp(
      title: 'We Rate Dogs',
      // Make all our text default to white 
      // and backgrounds default to dark
      theme: new ThemeData(brightness: Brightness.dark),
      home: new MyHomePage(title: 'We Rate Dogs'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
    @override
    Widget build(BuildContext context) {
        /// Scaffold is the base for a page.
        /// It gives an AppBar for the top,
        /// Space for the main body, bottom navigation, and more.
        return new Scaffold(
            /// App bar has a ton of functionality, but for now lets
            /// just give it a color and a title.
            appBar: new AppBar(
                /// Access this widgets properties with 'widget'
                title: new Text(widget.title),
                backgroundColor: Colors.black87,
            ),
            /// Container is a convenience widget that lets us style it's
            /// children. It doesn't take up any space itself, so it
            /// can be used as a placeholder in your code.
            body: new Container();
        );
    }

}

```

### 2. Create A Dog Model Class

We'll create a plain Dart class called Dog for our data model.

First, create a new file called `dog_model.dart` in the `lib` directory.

```
- lib
  -dog_model.dart
  -main.dart
```

In that file, we'll just create super basic class with a couple properties:

```dart
class Dog {
  final String name;
  final String location;
  final String description;
  String imageUrl;

  // All dogs start out at 10, because they're good dogs.
  int rating = 10;

  Dog(this.name, this.location, this.description);
}
```

### 3. Get Dog Pics

This is our one slight detour. We're going to use a super simple API to generate the dog images. This API doesn't require an API key or anything.

You can find it at [dog.ceo](https://dog.ceo). All it does is give us random images of dogs.

In your `Dog` class, add this method:

```dart
// dog_model.dart

Future getImageUrl() async {
    // Null check so our app isn't doing extra work
    // If theres already an image, we don't need to get one.
    if (imageUrl != null) {
      return;
    }

    // This is how http calls are done in flutter:
    HttpClient http = new HttpClient();
    try {
      // Use darts Uri builder
      var uri = new Uri.http('dog.ceo', '/api/breeds/image/random');
      var request = await http.getUrl(uri);
      var response = await request.close();
      var responseBody = await response.transform(utf8.decoder).join();
      var decoded = json.decode(responseBody);
      // The dog.ceo API returns a JSON object with a property
      // called 'message', which actually is the URL.
      var url = decoded['message'];
      imageUrl = url;
    } catch (exception) {
      print(exception);
    }
  }

```


**NB:** This will also require to to import three dart packages:

```
import 'dart:async';
import 'dart:convert';
import 'dart:io';
```


### 4. Create some sample data with the new Dog class.

In `main.dart` let's create a handful of dogs so we have something to work with:

```dart
// main.dart in the State class
...
class _MyHomePageState extends State<MyHomePage> {
  var initialDoggos = []
    ..add(new Dog('Ruby', 'Portland, OR, USA',
        'Ruby is a very good girl. Yes: Fetch, loungin\'. No: Dogs who get on furniture.'))
    ..add(new Dog('Rex', 'Seattle, WA, USA', 'Best in Show 1999'))
    ..add(new Dog('Rod Stewart', 'Prague, CZ', 'Star good boy on international snooze team.'))
    ..add(new Dog('Herbert', 'Dallas, TX, USA', 'A Very Good Boy'))
    ..add(new Dog('Buddy', 'North Pole, Earth', 'Self problaimed human lover.'));
```

