---
title: "Redux Wrap Up"
lesson: 8
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Logger Middleware"
next: "Adding Firebase"
tags:
    - programming
    - flutter
    - dart
---

That's it for the Redux lesson. You now have a fully functional state management system that scales well. It's easy to reason about, and easy to debug.

It's also a ton of boilerplate. [The README of this example gives great insights into what you may not be able to see yet.](https://gitlab.com/brianegan/flutter_architecture_samples/tree/master/example/redux).

Particularly:

> While this may feel like "Boilerplate" when you first start using Redux, the motivation is thus (from the original Redux Docs):
>
> If a model can update another model, then a view can update a model, which updates another model, and this, in turn, might cause another view to update. At some point, you no longer understand what happens in your app as you have lost control over the when, why, and how of its state. When a system is opaque and non-deterministic, it's hard to reproduce bugs or add new features.

---

### Next: Firebase Auth

The final part of setting up the not-fun boilerplate of this app is adding Firebase and Firebase Auth.
