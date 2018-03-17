---
title: "AppState Model"
---

The next step is define out AppState class. This is an arbitrary name, by the way. Some things in Redux do require specific names, but this isn't one of 'em.

The AppState is basically the Model for our entire application's state. Any thing in your app that can have different values should have a property in your AppState.

First, create the file where we'll build AppState:

```
// lib folder:
- models                                                        // new
    - app_state.dart                                            // new
- pages
    - home_page.dart
main.dart
```

The `AppState` class is just a plain Dart class, with no extensions. It doesn't need anything from Flutter or Redux.

We're building an app that's only functionality is that it can create a counter. So, we're going to need to keep track of that count.

```dart
// models/app_state.dart
class AppState {
  final int count;

  // constructor
  // use curlies to denote named parameters
  AppState({this.count = 0});

}
```

That's the basic class that simply keeps track of our state. For Redux purposes, we'll add some methods we need:

**NB:** I added 'isLoading', although we don't need it right now. It's more obvious what AppState will be as it grows when there's more than one property.

```dart
// models/app_state.dart
class AppState {
  final int count;
  final bool isLoading;

  AppState({this.count = 0, this.isLoading = false});

	AppState copyWith({int count, bool isLoading}) {
		return new AppState(
			count: count ?? this.count,
			isLoading: isLoading ?? this.isLoading
		);
	}

	@override
	String toString() {
		return 'AppState{isLoading: $isLoading, count: $count}';
	}
}
```

#### copyWith?

This is a function that allows us to create a new state with updated values. With this method, we never have to directly modify current state. This is ideal. State should be **read-only** in Redux. When it's read only and we're specifically updating it with pure functions from the `reducer`, we're eliminating the risk of unintended side affects in the app.

---

Go back to `main.dart` and import your `AppState`. Now we need to address reducers in order unbreak your app:
