---
title: "Gradients Background"
---

Time to make the app a little prettier by adding a gradient background.

Gradients are just as easy in Flutter as the are in CSS. And that's good since they're so hot right now.

To use gradients, you first need a `Container` widget, and within that you need to access it's `decoration` property.

Start by building the decoration of the `Container` widget in your `main.dart` build method. 

```dart
// main.dart build method
@override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
        backgroundColor: Colors.black87,
      ),
      body: new Container(
        // Add box decoration
        decoration: new BoxDecoration(                                  // new
          Box decoration takes a gradient
          gradient: new LinearGradient(                                 // new
            // Where the linear gradient begins and ends
            begin: Alignment.topRight,                                  // new
            end: Alignment.bottomLeft,                                  // new
            // Add one stop for each color.
            // Stops should increase
            // from 0 to 1
            stops: [0.1, 0.5, 0.7, 0.9],
            colors: [
              // Colors are easy thanks to Flutter's
              // Colors class.
              Colors.indigo[800],
              Colors.indigo[700],
              Colors.indigo[600],
              Colors.indigo[400],
            ],
          ),
        ),
        child: new Center7(
          child: new DogList(dogs),
        ),
      ),
    );
  }

```

Now, gradients:

![gradient screen shot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1521385515/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-18_at_07.54.46.png)