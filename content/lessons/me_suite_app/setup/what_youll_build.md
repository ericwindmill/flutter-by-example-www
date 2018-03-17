---
title: "What You'll Build"
---

This is what we're working towards:

A trivial app called 'MeSuite'. It's like G-Suite, but for a human that runs their life like a business. It'll be a suite of small apps like habit tracking, calendar, reminders, etc.

The truth is, this is ambiguous and just allows us to willy-nilly add features that are as easy or hard to add as we want.

In other words, we can focus on Flutter, not nitty gritty details of building a real application.

### The Mock Ups

The first feature is a basic Habit Tracker.

Here's a few mockups. This is just so we have a basic direction -- we won't stick to these.

![auth_sreen](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520114771/flutter_by_example/Auth_Screen.png)
![loading screen](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520114736/flutter_by_example/Loading_Screen.png)
![habit list](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520114736/flutter_by_example/Habits.png)
![habit detail](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520114736/flutter_by_example/HabitDetail.png)

---

This is what we've built out so far:

## The App Boiler Plate:

* Basic Flutter functionality and features
* Redux
* Firebase Authentication
* Firebase Realtime Database

**NB**: This is what I'll call the 'boiler plate' for this app. Every feature from here on out is `choose-your-own-adventure` style. But they'll all rely on having Firebase and Redux wired up.

![boiler plate app](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1518921043/flutter_by_example/boiler_plate_app.gif)

You can look at the source code or just trust that Redux is actually managing the state and that the Log In button is actually logging me in with Firebase.

Even the counter is being managed by Redux. In real life, if this was all your app did, Redux would be overkill. But we're going to save ourselves refactoring touble by just going straight out the gate with Redux and Auth.
