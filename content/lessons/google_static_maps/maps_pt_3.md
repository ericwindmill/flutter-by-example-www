---
title: Update Location with Dart Streams
---

The `flutterlocation` package has built in functionality to continuously ask
the users device for their location and then execute a callback.

<div class='aside>

### Dart Streams Conceptual Aside

If you're familiar with streams, you can skip this.

This is done via `Streams`. In Dart, Streams are a class that allow you to
"listen" to a data source and perform an action when the data is updated. In
this case, we'll listen to the `_location` given to us by the `flutterlocation`
library, and update our map when it gets a new location.

**tldr:** There are two parts to using streams.

1. The stream, which emits changes.
2. The subscription, which 'listens' to changes.

**In depth:**

In a chat app, for example, you may have a List of messages between two users.

Whenever a user _sends_ a new message, it will be added to that List. So, you
could set up a stream which will send out a 'broadcast' whenever `messages` is
updated.

The stream is basically going to say 'Hey, if anyones listening, I just want
you to know that there is a new message in my list'.

Then, maybe you have a function that is in fact listening (aka subscribed), and
wants to create a new 'Text' widget every time a new message is added to the  
list. It'll say 'Thanks for the update Stream, I'm going to add a new widget
with the information from the newest message in that list.'

And that's _conceptually_ what a `Stream` is, in a nut shell.

</div>

### 1. Add a Listener

First, add a subscription to the `location` object provided by `flutterlocation`.

```dart
class _MyHomePageState extends State<MyHomePage> {
  Location _location = new Location();
  StreamSubscription<Map<String, double>> _locationSub;               // new
  Map<String, double> _currentLocation;
  List locations = [];
  String googleMapsApi = 'YOUR API KEY';
  TextEditingController _latController = new TextEditingController();
  TextEditingController _lngController = new TextEditingController();

    // All new!
    @override
    void initState() {
      super.initState();
      _locationSub =
          _location.onLocationChanged.listen((Map<String, double> locationData) {
        setState(() {
          _currentLocation = {
            "latitude": locationData["latitude"],
            "longitude": locationData['longitude'],
          };
        });
      });
    }
```

Like I mentioned, the stream is established in the library, so there is very
little work in making use of this functionality.

This is all you have to do.

Now, when ever the users device's location changes, it'll update the
\_currentLocation variable in a setState call. That tells flutter to rebuild,
and when it does, its with a new `_currentLocation`.

<div class='tip'>

**tip**: You can see these changes in your iOS simulator by opening the 'Debug'
menu, and selecting 'Location > 'City Bicycle Ride''.

 </div>
