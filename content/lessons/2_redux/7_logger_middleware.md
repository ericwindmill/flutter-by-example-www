---
title: "Logger Middleware"
lesson: 7
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Counter Redux Cycle"
next: "Redux Wrap Up"
tags:
    - programming
    - flutter
    - dart
---

In the counter example, we skipped Middleware -- Middleware is only necessary if you want to:

* produce side affects in your cycle, such as logging
* do asynchronous work, such as HTTP calls

But, lets prove that Redux is working the way we claim by adding some middleware.

Let's add some middleware that's already been created as a package. I already had you install the package, it's called `redux_logging`.

What this will do is log to your console everytime an Action is dispatched. It'll log the action, as well as the payload.

Middleware is simply a function that, if you tell the store to, it'll perform inbeteen the action dispatch and the reducer function. So you can write your own or add a package.

We're just going to add the package. Once installed, head to your `main.dart` file.

On line 15 or so, in the new Store creation, there should be a named argument called `middleware` that we're passing an empty List. Simply add the functions as properties in the list:

```dart
// main.dart
import 'package:redux_logging/redux_logging.dart';
...
  final store = new Store<AppState>(
    appReducer,
    initialState: new AppState(),
    middleware: [new LoggingMiddleware.printer()],              //new
  );
...
```

That's it. Save it, give it a **full restart**, and then press the Increment button and watch your terminal.

You'll see something like this:

```
[INFO] LoggingMiddleware: {Action: Instance of 'IncrementCountAction', State: AppState{isLoading: false, count: 0}, ts: 2018-02-24 11:01:46.261344}
```
