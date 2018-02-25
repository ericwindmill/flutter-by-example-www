---
title: "What You'll Build"
lesson: 1
chapter: 1
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Basic Flutter App"
next: "Getting to Start"
tags:
    - programming
    - flutter
    - dart
---

This is what we're working towards:

A silly application called Music Party. Its a place where vinyl snobs can set up virtual listening parties. Because everyone knows that just collecting vinyl isn't enough -- you also need to tell everyone about it. This way, music lovers can gather in a virtual chat room, drop the needle on the record at the same time, and then pretentiously judge it togther.

Let's be honest -- it's Yelp for music combined with an online book club.

The MVP features:

* Users can log in via Google Firebase Auth.
* Users can add records to their collections.
* Users can set up new listening parties.
* Users can join listening parties.
* Users can leave reviews on albums in their collection.

### The Mock Ups

Here's a few mockups.

In reality, there are many missing screens, and the ones that I made were thrown together. So ddon't get attached to what you see here.

Lets not hold ourselves to the style or layout or even architetcure. But, apps are much easier to build if you have something in mind to work towards.

![auth screen](http://res.cloudinary.com/ericwindmill/image/upload/v1519581498/flutter_by_example/Auth_Screen.png)
![home screen](http://res.cloudinary.com/ericwindmill/image/upload/v1519581497/flutter_by_example/Home_Screen.png)
![my parties screen](http://res.cloudinary.com/ericwindmill/image/upload/v1519581496/flutter_by_example/My_Listening_Party_List_Screen.png)
![profile screen](http://res.cloudinary.com/ericwindmill/image/upload/v1519581496/flutter_by_example/User_Profile_Screen.png)

---

**This Yelp for Music app is still very much a work in progress.**

I like to add a feature in the app, then add the lessons here, and so on.

---

## The App Boiler Plate:

* Basic Flutter functionality and features
* Redux
* Firebase Authentication
* Firebase Realtime Database

**NB**: This is what I'll call the 'boiler plate' for this app. Every feature from here on out is `choose-your-own-adventure` style. But they'll all rely on having Firebase and Redux wired up.

![boiler plate app](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1518921043/flutter_by_example/boiler_plate_app.gif)

You can look at the source code or just trust that Redux is actually managing the state and that the Log In button is actually logging me in with Firebase.

Even the counter is being managed by Redux. In real life, if this was all your app did, Redux would be overkill. But we're going to save ourselves refactoring touble by just going straight out the gate with Redux and Auth.
