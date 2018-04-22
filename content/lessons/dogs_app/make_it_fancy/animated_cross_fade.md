---
title: "Built In Animation"
---

At this point, your app has all the functionality that you'll implement.

But there is some really easy animations Flutter gives you that will enhance the UX by a mile.

1. Add placeholder for images, so they fade in on load.
2. Add a [hero animation](http://ericwindmill.com/ux-transitions-in-flutter-fade-in-image-animated-cross-fade-and-hero-transitions) that connects your DogCard to the dog_detail_page.

### 1. Add an AnimatedCrossFade to load Widgets on state change

This all happens in your `dog_card` file. And it's easy

In `DogCardState`, update the `dogImage getter` :

```dart
Widget get dogImage {
    var dogAvatar = new Container(
      width: 100.0,
      height: 100.0,
      decoration: new BoxDecoration(
        shape: BoxShape.circle,
        image: new DecorationImage(
          fit: BoxFit.cover,
          image: new NetworkImage(renderUrl ?? ''),
        ),
      ),
    );

    // Start New Code
    //
    // Placeholder is a container of the same
    // size as the dog image, but it'll all be constant -
    // it doesn't need to 'load' like an image.
    var placeholder = new Container(
        width: 100.0,
        height: 100.0,
        decoration: new BoxDecoration(
          shape: BoxShape.circle,
          gradient: new LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.black54, Colors.black, Colors.blueGrey[600]],
          ),
        ),
        alignment: Alignment.center,
        child: new Text(
          'DOGGO',
          textAlign: TextAlign.center,
        ));

    // This is the animated widget built into flutter
    // and its ridiculously easy to use
    var crossFade = new AnimatedCrossFade(
        // You simply pass it the starting widget
        // and the ending widget
      firstChild: placeholder,
      secondChild: dogAvatar,
        // Then, you pass it a ternary
        // that should always be based on the value
        // of some data in your state
        //
        // In this case, the renderUrl starts out as null
        // when the page is rendered
        //
        // Then, use build in methods
        // When renderUrl does infact equal null
        // show the first child
        // when it doesn't, show the second child
      crossFadeState: renderUrl == null
          ? CrossFadeState.showFirst
          : CrossFadeState.showSecond,
       //
       // finally, pass in the amount of time
       // the fade should take.
      duration: new Duration(milliseconds: 1000),
    );

    return crossFade;
  }
```

Give your app a full restart and you should see it fade in (slowly) when the image is loaded.