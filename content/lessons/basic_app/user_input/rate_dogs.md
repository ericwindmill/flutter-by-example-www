---
title: "Forms 2: Sliders and Buttons"
---

The time has come to add the most important feature. The ability to add a rating to a dog.

### 1. Add the Form

Start by adding the form UI to the the `dog_detail` page.

This is what the page will look like:

![dog rating page](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,r_5,w_300/v1521395106/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-03-18_at_10.44.53.png)

This will consist of two main widgets:
  1. a `Slider`
  2. a `RaisedButton` to submit the slider value.

Add them both to the `_DogDetailPageState`:

```dart
class _DogDetailPageState extends State<DogDetailPage> {
  double dogAvatarSize = 150.0;

  Widget get dogImage {...}

  Widget get dogProfile {...}

  Widget get rating {...}

  ///
  /// Start New Code
  ///

  // This is the starting value of the slider.
  double _sliderValue = 10.0;

  Widget get addYourRating {
    return new Column(
      children: <Widget>[
        new Container(
          padding: new EdgeInsets.symmetric(
            vertical: 16.0,
            horizontal: 16.0,
          ),
          child: new Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              // In a row, column, listview etc
              // A Flexible Widget is a wrapper
              // That works much like CSS's flex-grow property
              //
              // Any room left over in in the main axis after
              // the Widgets are given their width (in this case,
              // because its a row) -
              // will be distributed to all the flexible widgets
              // at a ratio based on the flex property you pass in
              // Because this is the only Flexible,
              // It will take up *all** the extra space
              //
              // Or in other words, it will expand as much as it can until
              // the all the space is taken up
              new Flexible(
                flex: 1,

                // A slider, like many form elements,
                // Needs to know its own value
                // and how to update it's value
                //
                // The slider will call the `onChanged` whenever
                // it changes. But it will only repaint
                // when it's value property changes in the state
                // using 'setState'
                //
                // The workflow is:
                // 1. User drags the slider
                // 2. onChanged is called
                // 3. the callback in onChanged set 'sliderValue' state
                // 4. Flutter repaints everything that relies on 'sliderValue'
                // 5. In this case, just the slider, which is at it's new value
                //
                child: new Slider(
                  activeColor: Colors.indigoAccent,
                  min: 0.0,
                  max: 15.0,
                  (newRating) {
                    setState(() => _sliderValue = newRating);
                  },
                  value: _sliderValue,
                ),
              ),

              // This is the part that displates the value
              // of the slider
              // The width is an arbitrary size that
              // I chose for styles
              new Container(
                width: 50.0,
                alignment: Alignment.center,
                child: new Text('${_sliderValue.toInt()}',
                    style: Theme.of(context).textTheme.display1),
              ),
            ],
          ),
        ),
        // This widget is built below:
        submitRatingButton,
      ],
    );
  }

  // A simple Raised Button
  // That as of now doesn't do anything but print
  //
  Widget get submitRatingButton {
    return new RaisedButton(
      onPressed: () => print('pressed!'),
      child: new Text('Submit'),
      color: Colors.indigoAccent,
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Colors.black87,
      appBar: new AppBar(
        backgroundColor: Colors.black87,
        title: new Text('Meet ${widget.dog.name}'),
      ),
      // Make the body a ListView that displays
      // both the profile and the rating form
      //
      body: new ListView(                                              // updated
        children: <Widget>[dogProfile, addYourRating],
      ),
    );
  }
}
```


If you hot reload your app, you should have a working slider.

### 2. Wire up the Submit button

The submit button does what could *technically*  be done in the `onChanged` callback.

It simply updates the rating of the dogs rating in the dog class itself. That way, through out the app the new rating is shown, because Flutter will rebuild *everything* that relies on the Dog's rating.

This is as simple as adding this function to your `_DogDetailPageState` class, and then calling it when the submit button is pressed:

```dart
  // In the next section you'll add error handling.
  // For now this is all it does.
  void updateRating() {
    setState(() => widget.dog.rating = _sliderValue.toInt());
  }
```

And then in your `submitRatingButton` widget:

```dart
  Widget get submitRatingButton {
    return new RaisedButton(
      onPressed: updateRating,                                          // updated
      child: new Text('Submit'),
      color: Colors.indigoAccent,
    );
  }
 ```


After adding this, you can move the slider, press submit, and then travel back to the main page. You should see the dogs rating updated.


