---
title: "Routing 2: Add New Dog Page"
---

The only other page in this app is the page to add dogs.

The next section will show you how to handle user input, but you might as well add that route now, while we're on the subject.

### 1. Add NewDogPage

Create a new file in the `lib` folder called `new_dog_form.dart`.

The UI of this page is simple:

![form page screen shot](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1521390457/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-18_at_09.27.27.png)

Here's the code with no functionality (again, you'll add the user input functionality in the next section:

```dart
// lib/new_dog_form.dart
import 'package:flutter/material.dart';
import 'package:we_rate_dogs/dog_model.dart';

class AddDogFormPage extends StatefulWidget {
  @override
  _AddDogFormPageState createState() => new _AddDogFormPageState();
}

class _AddDogFormPageState extends State<AddDogFormPage> {
  @override
  Widget build(BuildContext context) {
    // new page needs scaffolding!
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Add a new Dog'),
        backgroundColor: Colors.black87,
      ),
      body: new Container(
        color: Colors.black54,
        child: new Padding(
          padding: const EdgeInsets.symmetric(
            vertical: 8.0,
            horizontal: 32.0,
          ),
          child: new Column(
            children: [
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                // Text Field is the basic input widget for Flutter
                // It comes built in with a ton of great
                // UI and functionality, such as the
                // labelText field you see below
                child: new TextField(
                    decoration: new InputDecoration(
                  labelText: 'Name the Pup',
                )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    decoration: new InputDecoration(
                  labelText: "Pups location",
                )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                  decoration: new InputDecoration(
                    labelText: 'All about the pup',
                  ),
                ),
              ),
              // A Strange situation.
              // A piece of the app that you'll add inthe next
              // section *needs* to know it's context,
              // And the easiest way to pass a context is to
              // use a builder method. So I've wrapped
              // this button in a Builder as a sort of 'hack'
              new Padding(
                padding: const EdgeInsets.all(16.0),
                child: new Builder(
                  builder: (context) {
                    // The basic Material Design action button
                    return new RaisedButton(
                      // if onPressed is null, the button is disabled
                      // this is my goto temporary callback
                      onPressed: () => print('PRESSED'),
                      color: Colors.indigoAccent,
                      child: new Text('Submit Pup'),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 2. Add the Routing

Like the last section, you now have a page that you can't access. Add the button and routing information to the `main.dart` page.

```dart
// lib/main.dart in the build method:
  ...
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
        backgroundColor: Colors.black87,
        // This is how you add new buttons to the top right of
        // a material appBar.
        // You can add as many as you'd like.
        actions: [                                                      // new
          new IconButton(                                               // new
            icon: new Icon(Icons.add),                                  // new
            onPressed: _showNewDogForm,                                 // new
          ),
        ],
      ),
  ...
```


That will add a plus-sign looking button to the top right corner of your app, and finally you can add the method that builds a new route.

Add this anywhere in your `_MyHomePageState` class:

```dart
  // Any time you're pushing a new route and expect that route
  // To return something back to you,
  // You need to use an async function
  // In this case, the this function will create a form page
  // Which the user can fill out, and submit
  // And on submission, the information in that form page
  // will be passed back to this function
  //
  Future<Null> _showNewDogForm() async {
    // push a new route like you did in the last section
    var newDog = await Navigator.of(context).push(
      new MaterialPageRoute(
        builder: (context) {
          return new AddDogFormPage();
        },
      ),
    );
    // A null check, to make sure that the user
    // didn't abandon the form
    //
    if (newDog != null) {
      // Add a newDog to our mock dog array.
      dogs.add(newDog);
    }
  }
```

