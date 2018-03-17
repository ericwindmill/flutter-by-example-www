---
title: "Basic Dogs App Setup"
---

### It's a Good Framework, Brant.

In this basic app tutorial we'll build a very simple, **pure Flutter app**, inspired by the greatest Twitter conversation of all time -- the We Rate Dogs v. Brant showdown of 2012.

The idea here is that we won't pull in any extra packages, we won't think about architecture or state management. We'll just use the tools that Flutter gives us out of the box to learn the basics.

By the end of this, you won't know nearly all Flutter has to offer, but you'll understand how much Flutter provides us as developers.

This is what you're making:

![add dog](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520699901/flutter_by_example/new_dog.gif)
![good dogs](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520699902/flutter_by_example/good_dogs.gif)

Finished source code: [We Rate Dogs example app](https://github.com/ericwindmill/flutter_by_example_dogs_example)

We'll just start this from a fresh app. Once you have [Flutter installed on your machine and your environment set up](https://flutter.io), enter the following in the your terminal:

```bash
flutter create we_rate_dogs
cd we_rate_dogs
flutter packages get
```

This will give you a fresh [Flutter counter app](https://flutterbyexample.com/basic-flutter-app).
