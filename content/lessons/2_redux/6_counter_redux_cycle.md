---
title: "Counter Redux Cycle"
lesson: 6
chapter: 2
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "App Reducer"
next: "Logger Middleware"
tags:
    - programming
    - flutter
    - dart
---

Now, we have all the boiler plate we need to implement an entire Redux cycle. If anything hasn't made any sense yet, this should clear it up.

Take a look at this visual again from [Ignacio Chavez](https://ignaciochavez.com/how-redux-puts-middleware-together/)

![redux flow](https://ignaciochavez.com/wp-content/uploads/2016/12/redux-middleware-flow-1.png)

I personally like to build my redux cycles starting at the Action, then implementing middleware (if any), the reducer, and finally the views which dispatch the actions.

### 1. Add the Counter Action

Start by adding the proper files. Create a new `actions` directory with a `counter_actions.dart` file:

```
// lib folder:
- actions
	-counter_actions.dart
- models
	- app_state.dart
- pages
	- home_page.dart
- reducers
	- app_reducer.dart
main.dart
```

Open the `counter_actions` file:

**NB:** I'm imagining that our app can also decrease count to make a point:

```dart
// actions/counter_actions.dart
class IncrementCountAction {}

class DecrememtCountAction {}
```

That's literally the entire file. Many actions will be more complicated than this, but many actions are simply declarations that the action is an option.

Because the reducers will only mutate state when given a pre-defined action, you must create a new class for each possible action, even if it does nothing else. This is desirable because it means _nothing_ can mutate your state on accident. You had to have explicitly coded in a possible action before your reducers will acknowledge them.

---

**NB:**The way I'm structuring my files is preference. I like to make things as modular as possible. In most examples of Flutter_Redux, you'll see all of the actions in a single file -- and that's completely fine.

---

### 2. Add a Counter Reducer

Again, you need to add the files:

```
// lib folder:
- actions
	- counter_actions.dart
- models
	- app_state.dart
- pages
	- home_page.dart
- reducers
	- app_reducer.dart
	- counter_reducer.dart  																			//new
main.dart
```

Then in the new `counter_reducer` file:

_NB:_ Still pretending our app can decrement.

```dart
import 'package:me_suite/actions/counter_actions.dart';

int counterReducer(int currentCount, action) {
  if (action is IncrementCountAction) {
    currentCount++;
    return currentCount;
	} else if (action is DecrememtCountAction) {
		currentCount--;
		return currentCount;
  } else {
    return currentCount;
  }
}
```

All that's going on here is the counterReducer is checking which action has been dispatched by the `appReducer`, and mutating the slice of state that's concerned with. The counter reducer is passed in `state.count` from the `appReducer`, not the entire state. So all it needs to do is change the state and return that slice. Very modular. Very nice.

So far, we've created an action so that the reducer knows it's an allowed mutation, and created a reducer to actually perform that.

---

**NB:** We skipped middleware, because this cycle doesn't need any middleware.

---

### 3. Add the Views

Finally, we have all this, but there needs to be a button of some sort that will actually make this cycle fire.

First, make a new directory called `containers`.

Within that directory, make a directory called `counter`.

Then, create a file called `increase_counter.dart`.

```dart
// lib folder:
- actions
	- counter_actions.dart
- containers                                                    // new
	- counter                                                     // new
		- increase_counter.dart                                     // new
		- counter.dart                                              // new
- models
	- app_state.dart
- pages
	- home_page.dart
- reducers
	- app_reducer.dart
```

`Containers` are an idea that I learned when I started with Redux in JS-world that I really like. Each container is like a wrapper widget that's 'smart'. It's aware of the state, and it has the ability to dispatch an action to Redux to start a redux cycle. This wrapper wraps a 'dumb' view widget.

In our case, the views are so simple that we'll combine a container with it's dumb component.

* The `increase_counter` widget is a smart widget that displays a button, that on pressed, dispatches an action to the store.
* The `counter` widget simply displays the current `count` in the state. It has no ability to change the state.

There's a lot going on here. The important Redux-y parts are:

* StoreConnector - This simply provides the widget access to the store
* StoreConnector.converter - This is the callback that will be called when the user interacts with view. It always takes a 'store'
* store.dispatch() method - This is a built in method that tells Redux to begin a redux cycle. It always takes a `new YourActionHere()`
* StoreConnector.builder - This is a flutter `builder` method. It always takes `BuildContext` and a callback. The call back is the one defined in the `converter` arg. It's automatically wired up by redux. - builder methods simply return widgets.

```dart
// containers/increase_counters.dart
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:me_suite/actions/counter_actions.dart';
import 'package:me_suite/models/app_state.dart';
import 'package:redux/redux.dart';

// This is just another stateless widget.
class IncreaseCountButton extends StatelessWidget {
  IncreaseCountButton({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, VoidCallback>(
      converter: (Store<AppState> store) {
        return () {
          store.dispatch(new IncrementCountAction());
        };
      },
      builder: (BuildContext context, VoidCallback increase) {
        return new FloatingActionButton(
          onPressed: increase,
          child: new Icon(Icons.add),
        );
      },
    );
  }
}
```

This is a very basic `container`, but all containers follow this pattern. The only real difference between this and more complex flutter patterns is that rather than returning a new `FloatingActionButton` in your builder, you'd most likely return a custom widget that takes in some data from the store. That's a dumb component, but that doesn't apply here.

### 4. Build the Counter View

The counter view adds yet another redux concept -- but this is the last one! (for now)

Most of this file -- especially the `Counter` class, looks the same. But we have added a second class: `_viewModel`.

These `viewModel` helper classes are just that -- a model for your view's data (from the store).

Whenever you're creating a `container` widget that displays data from the state that will be updated, you should use a `viewModel` helper class.

These viewModel classes will use a Redux method called `fromStore()`, which gets the data from the store, and knows to re-render when the slices of relevant state are updated.

```dart
// containers/counter/counter.dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:me_suite/models/app_state.dart';
import 'package:redux/redux.dart';

class Counter extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new StoreConnector<AppState, _ViewModel>(
    		// Rather than build a method here, we'll defer this
    		// responsibilty to the _viewModel.
        converter: _ViewModel.fromStore,
        // Our builder now takes in a _viewModel as a second arg
        builder: (BuildContext context, _ViewModel vm) {
          return new Text(
          	// Our _viewModel is 'watching' the count slice of state
          	// So this will be rerendered when that slice of
          	// state changes
            vm.count.toString(),
            style: Theme.of(context).textTheme.display1,
          );
        }
			);
  }
}

// This is just a class -- nothing fancy
class _ViewModel {
	// It should take in whatever it is you want to 'watch'
  final int count;

  _ViewModel({
    @required this.count,
  });

	// This is simply a constructor method.
	// This creates a new instance of this _viewModel
	// with the proper data from the Store.
	//
	// This is a very simple example, but it lets our
	// actual counter widget do things like call 'vm.count'
  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(count: store.state.count);
  }
}
```

### Add the Counter Widgets into the App

With these two widgets, all we've really done is make a button with fancy capabilities to dispatch actions to Redux, and a text widget with fancy capabilities to get information from our Redux Store. Let's add this button and text to our app so we can see em in action.

```dart
// pages/home_page.dart
import 'package:flutter/material.dart';
import 'package:me_suite_code_along/containers/counter/counter.dart';
import 'package:me_suite_code_along/containers/counter/increase_counter.dart';

class HomePage extends StatelessWidget {
  final String title;

  HomePage(this.title);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(this.title),
      ),
      body: new Container(
        child: new Center(
          child: new Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              new Text(
                'You have pushed the button this many times:',
              ),
              new Counter(),                                    // updated
            ],
          ),
        ),
      ),
      floatingActionButton: new IncreaseCountButton()           // updated
    );
  }
}
```

The result:

Reload your app, press that Increment button, and watch that number rise.