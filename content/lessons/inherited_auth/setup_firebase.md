---
title: "State Management the Flutter Way"
---

The goal for this app is to learn how to do things the Flutter way. You can
learn to implement the same features in a different way in the Redux / Firebase
section, but this is how you'd do it with out any extra libraries. You'll learn
how to leverage all the things that Flutter and Dart give us out of the box to make big beautiful
applications.

###1: A Bare Minimum App to Start

* In your terminal:

```text
git clone https://github.com/ericwindmill/flutter_by_example_apps.git
cd flutter_by_example_apps/blank_flutter_app
flutter packages get
flutter run
```

This is an app with a blank screen. But it runs. This is what you should see:

![blank_flutter_app screen shot](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1523979312/flutter_by_example/blank.png)

Very blank.

###2. Integrate Firebase Auth

Next, it's time to add auth via Firebase, as well as Firestore database while
you're at it.

Firebase is collection of tools that app developers can use to solve
'boilerplate' problems. The biggest of which are user authentication and a real-time database.

Firebase is especially appealing in Flutter apps because its another Google product, which means you can bet it'll
always be compatible, regardless of dependencies and upgrades.

Adding Firebase functionality to your application is one of the few times that you'll actually have to explore outside your Flutter app's `lib` folder, and add some low level configurations.

There is no way that I could write a more in-depth walk-through to setting up
Firebase than the people at Google themselves could, so I'm going to send you [to this Codelab about adding Firebase to your app](https://codelabs.developers.google.com/codelabs/flutter-firebase/#5)

For the purpose of this tutorial, you should do Step 5 and half of Step 6. Stop when you get the heading 'Add Google Sign-In to Friendlychat'.
