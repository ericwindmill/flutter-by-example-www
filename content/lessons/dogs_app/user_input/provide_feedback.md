---
title: "User Feedback: Toasts / Snackbars"
---

Good UX is all about being explicit about what's going on the in app when something updates. So the app should give users feedback in two places:
1. When you try to add a new dog but the form is wrong.
2. When you try to update a dogs rating but the form is wrong.

## 1. Feedback when Adding a New Dog

![show snackbar on error screenshot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,r_5,w_300/v1521398916/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-18_at_11.48.20.png)

Only the `submitPup` function needs to be updated in your `new_dog_form` page.

First, some explanation that I glossed over in an earlier lesson:

In the build method on this page, the RaisedButton in the build method is wrapped in a `Builder`.

A builder creates a new scaffold under the hood. It's a new page, a new buildContext, etc.

This new scaffold is necessary to show Snackbars (aka toasts on the web) because they are an element that is on another page, waiting to be called like any page would be.

The *better* way to do this would be to make a whole new stateless widget that's just a Raised Button that shows a snackbar on pressed.

The point is, the space it takes up is already taken up in your pages Scaffold, so it needs a new one.

Anyways, update your `submitPup` method:


```dart
  void submitPup(context) {
    if (nameController.text.isEmpty) {
      Scaffold.of(context).showSnackBar(                                // update start
            new SnackBar(
              backgroundColor: Colors.redAccent,
              content: new Text('Pups neeed names!'),
            ),
          );                                                            // update end
    } else {
      var newDog = new Dog(nameController.text, locationController.text,
          descriptionController.text);
      Navigator.of(context).pop(newDog);
    }
  }

```

Now, try to submit a dog without a name.

## 2. Dialog Feedback when the Rating Form is wrong

Again, this is as easy as writing one method.

This time, you'll implement a Dialog, which on mobile is just a modal.

Dialogs in Flutter give you access to `actions` so you can do things like ask user questions, get ratings, etc.

We're going to use what's called an `AlertDialog`, which alerts the users of something.

This goes in your `dog_detail_page`.

```dart
  // _DogDetailPageState class


  // Just like a route, this needs to be async, because it can return
  // information when the user interacts
  Future<Null> _ratingErrorDialog() async {
    // showDialog is a built in Flutter method
    return showDialog(
      // needs to know its build context
      context: context,
      child: new AlertDialog(
        title: new Text('Error!'),
        content: new Text("They're good dogs, Brant."),
         // This action uses the Navigator to
         // dismiss the dialog
         // This is where you could return information if you
         // wanted to
        actions: [
          new FlatButton(
            child: new Text('Try Again'),
            onPressed: () => Navigator.of(context).pop(),
          )
        ]
      ),
    );
  }
```


Finally, update your `updateRating` method to handle that error:
```dart
  void updateRating() {                                                 // new
    if (_sliderValue < 10) {                                            // new
      _ratingErrorDialog();                                             // new
    } else {                                                            // new
      setState(() => widget.dog.rating = _sliderValue.toInt());
    }
  }
```


Now, when someone tries to give a dog a low rating, we'll stop them.

After all, they're good dogs.

