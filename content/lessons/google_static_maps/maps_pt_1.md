---
title: "Dart URI + Google Static Maps API"
---

At this point, it doesn't seem likely that Google Maps is going to be
integrated into Flutter any time soon.

Luckily, for the time being, it's easy to fake Google Maps in your app.

![Demo Screenshot](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1512320238/flutter-static-maps/Simulator_Screen_Shot_-_iPhone_6_-_2017-12-03_at_08.56.35.png)

## Google Static Maps API

Google Static Maps simply serves up images. While not ideal, because it's not interactive, it can give you a temporary solution.

The url that you create renders the image on the fly. You don't have to make a request with a body and a method and headers. The url that you create to make the request _is the url you render._

In other words, on the web with HTML you would use Static Maps like this:

```html
<img scr='https://maps.googleapis.com/maps/api/staticmap?center=37.0902%2C-95.7192&zoom=4&size=600x400&API_KEY' />
```

This Url is making the API call to Google, and rendering.

Not only is easy, it's _fast_. So you can, if you need, make it interactive by just rendering images in reaction to stateChange (such as device location);

This is pretty awesome. You don't have to fiddle with anything asynchronous.
You simply construct your URL and use it as if it's an image.

### 1. Get Set Up

1. [Create a new Flutter Project](https://flutter.io/getting-started/#creating-your-first-flutter-app)

```text
$ flutter create static-maps-app
```

2. [Get a Google Maps Api Key](https://developers.gogle.com/maps/)
   1. Click 'Get Started'
   2. Click 'Google Static Maps API'
   3. Click 'Get a Key'
   4. Name the Project (such as 'static-maps')
   5. Click 'Confirm and Get Key'

### 2. Start Building

In your project directory you'll find a whole sample app. We're only concerned
with the `lib` directory for now. For sample or simple apps, you may never need
to touch any other files. I've been working with Flutter on a large app at
work for a few months and I think I've only had to open the iOS and Android
files a handful of times.

```text
$ cd static-maps-app
$ flutter run
```

To begin with, replace the code in `main.dart`. You can leave `MyApp` class and `MyAppHomePage` class alone. We're going to be modifying `_MyHomePageState`.

([Additional Info: Stateful vs Stateless Widgets](https://flutter.io/widgets-intro/#changing-widgets-in-response-to-input))

```dart
   class _MyHomePageState extends State<MyHomePage> {
    // be sure to replace 'YOUR API KEY' with your actual API key.
    String googleMapsApiKey = 'YOUR API KEY';

     @override
     Widget build(BuildContext context) {
       return new Scaffold(
         appBar: new AppBar(
           title: new Text(widget.title),
         ),
         body: new Image.network('https://maps.googleapis.com/maps/api/staticmap?center=37.0902%2C-95.7192&zoom=4&size=600x400&googleMapsApiKey'),
       );
     }
   }
```

Look at that. In a matter of minutes you got a map rendering.

![Demo App Screen Shot](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1512325526/flutter-static-maps/static-maps-one.png)

But this isn't entirely useful. We probably want to render a map based on a users location, and possibly provide a marker based on some input or data.

### 3. Building Your Static Maps API URL

In order to make any sort of real use of Static Maps, you're going to want to
build URLs dynamically, not use hardcoded URLs. First lets take a look at what
information we need for the static map. Once we
can build URLs dynamically, we can add map interactivity. (Or, we can at least fake it.)

In order to implement this building logic, first take a look at what the API is
expecting.

* A base url + the static maps api path:
  `https://maps.googleapis.com/maps/api/staticmap?`
* Required query params:
  * **size**: size in pixels passed in as a string `size={horizontal_value_pixels}x{vertical_value_pixels}`
  * **zoom**: an integer (between `0` (to view Earth) and `20` (down to Building views)). `zoom=6`
  * **center**: either a pair of coordinates `{latitude,longitude}` or a string address `center="moscone center, san francisco, CA"`.
  * **Note**: Zoom and center are only required if there are no markers. For now, we don't have markers.
  * **Note 2**: Query params are seperated by `&`.

This is a totally valid map URL:

```html
https://maps.googleapis.com/maps/api/staticmap?size=600X400&zoom=6&center=-25.0324,45.9324&*YOUR_API_KEY*
```

* Optional Query Parameters
  * **maptype**: The visual style of the map. `roadmap`, `satelite`, `hybrid`, `terrain`.
  * **markers**: where to display markers on the map. Covered below.
  * **path**: provides connected points on the map. Covered below.

_Note: there are more optional params, but these are the ones that I find
useful._ [See All Params](https://developers.google.com/maps/documentation/static-maps/intro)

### 4. Dart Uri Library

Let's start another file so we can separate this logic out. In the `lib` folder, create `static_maps_provider.dart`.

In that file, create the Widget basics:

```dart
import 'package:flutter/material.dart';

class StaticMapsProvider extends StatefulWidget {
  @override
  _StaticMapsProviderState createState() => new _StaticMapsProviderState();
}

class _StaticMapsProviderState extends State<StaticMapsProvider> {
  @override
  Widget build(BuildContext context) {
    return new Image.network('https://maps.googleapis.com/maps/api/staticmap?center=37.0902%2C-95.7192&zoom=4&size=600x400&googleMapsApiKey');
  }
}
```

Now, refactor `main.dart`'s `_MyHomePageState` class:

```dart
// in the build method:
Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new StaticMapsProvider(googleMapsApiKey),
    );
  }
```

Back in the new `static_maps_provider` file, we'll start building our Uri. The Uri class is in `dart:core` so there's no need to import.

Add the following code. The Uri class constructor is looking for parameters so it can build a URL. In this initial part of the \_buildUrl function, we're going to build the base. These properties will be part of every Url you need. You can read about the parameters that the Uri constructor takes [here](https://api.dartlang.org/stable/1.24.2/dart-core/Uri/Uri.html).

Also, be sure to pass your Api Key into the Static Maps Provider.

```dart
class StaticMapsProvider extends StatefulWidget {
  final String googleMapsApiKey;

  StaticMapsProvider(this.googleMapsApiKey);

  @override
  _StaticMapsProviderState createState() => new _StaticMapsProviderState();
}


class _StaticMapsProviderState extends State<StaticMapsProvider> {
  Uri renderURL;

  _buildUrl() {
    var baseUri = new Uri(
        scheme: 'https',
        host: 'maps.googleapis.com',
        port: 443,
        path: '/maps/api/staticmap',
        queryParameters: {});

    setState(() {
      renderURL = baseUri;
    });
  }

  @override
  _buildUrl();

  Widget build(BuildContext context) {
    return new Image.network(renderUrl.toString());
  }
}
```

In this class, we're basically establishing our renderUrl and passing in to the `Image` widget's constructor.

Hot reload your app. The map is gone, an error is thrown. 😢 This is because 
we're missing some required query params for the API. We'll handle this with 
some default values. The default values could be hardcoded in, but later we'll 
want them to be constants that we can edit them based on user input.

Your `_StaticMapsProviderState` Class:

```dart
class _StaticMapsProviderState extends State<StaticMapsProvider> {
  Uri renderUrl;
  static const int defaultWidth = 600;
  static const int defaultHeight = 400;
  Map<String, String> defaultLocation = {
    "latitude": '37.0902',
    "longitude": '-95.7192'
  };

  _buildUrl() {
    var baseUri = new Uri(
        scheme: 'https',
        host: 'maps.googleapis.com',
        port: 443,
        path: '/maps/api/staticmap',
        queryParameters: {
          'size': '${defaultWidth}x$defaultHeight',
          'center': '${defaultLocation['latitude']},${defaultLocation['longitude']}',
          'zoom': '4',
          '${widget.googleMapsApiKey}' : ''
        });
  //...
```

At this point, you're rendering a map that shows the United States.  You've 
started building our Uri's dynamically. Not bad for a few minutes worth of 
work! And we've only leveraged what's built into Flutter and Dart. No packages, no plugins... yet.

The next step is to render maps that are useful. We'll need the get the users 
location, and accept user input, and build dynamically generated Uri's. We'll 
also have a chance to dabble in Flutters UI system.
