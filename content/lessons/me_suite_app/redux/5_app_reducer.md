---
title: "App Reducer"
---

Redux works by firing `actions`, which express an _intent_ to change state. Then, if all is playing well together, your `reducer` is the actual pure function that updates your state.

That said, let's define your `AppReducer` before we define any actions, so your linter will stop complaining about `appReducer` in your `main.dart` file.

First, create the file `lib/reducers/app_reducer.dart`

This is your directory now:

```
// lib folder:
- models
	- app_state.dart
- pages
	- home_page.dart
- reducers
	- app_reducer.dart
main.dart
```

Again, a reducer is just a pure function. Generally it takes in the current state and the action that's instructing the modifying of that state. If everything goes right, it returns a new instance of your state, which your Redux Store then uses as your global state.

That said, you'll have many different Reducers that perform a particular action on your state. You'll generally have a `reducer` for each different slice of state.

In our case, you'd have a `counterReducer` and a `isLoadingReducer`.

But really these are just "sub-reducers". All reducers are managed by one top level reducer called the `appReducer`. (This is an arbitrary name -- in the JS world you'll often see it called 'rootReducer'.)

This is what your `appReducers` looks like with our current AppState model:

```dart
import 'package:music_party/models/app_state.dart';

AppState appReducer(AppState state, action) {
  return new AppState(
      isLoading: false,
      count: counterReducer(state.count, action),
  );
}
```

This is basic appReducer. As your app grows, this won't necessarily get more complex, the list of properties and corresponding 'sub-reducers' will just get longer. Now, whenever you dispatch an action, that action, along with the relevant slice of state, will get passed into a each and every sub-reducer. Those reducers will mutate only the bits they're concerned with and return that. This happens in the order that you'd expect since its all synchronous.

***

Your linter is probably complaining right now because `counterReducer` doesn't exist. Let's make that next.