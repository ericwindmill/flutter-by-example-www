---
title: "Firebase LogIn Middleware"
lesson: 3
chapter: 3
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Firebase Auth Log In"
next: "Log In Redux Cycle contd"
tags:
    - programming
    - flutter
    - dart
---

We need to write our first Middleware for Redux. I'll explain things a bit more in-depth here than I will in the future.

### 1. Create middleware file: `lib/middleware/auth_middleware.dart`

### 2. Add the necessary Redux methods:

```dart
// lib/middleware/auth_middleware.dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:music_party/actions/auth_actions.dart';
import 'package:music_party/models/app_state.dart';
import 'package:redux/redux.dart';


// Recall that middleware is simply functions.
//
// These functions more or less intercept actions -- pausing
// the Redux cycle while your app does some work.
//
// If you have multiple middleware functions that are related
// to a single piece of state, you can use a method like this
// which will return multiple functions that you can add
// to your store.
//
List<Middleware<AppState>> createAuthMiddleware() {
  final logIn = _createLogInMiddleware();
  final logOut = _createLogOutMiddleware();

  // Built in redux method that tells your store that these
  // are middleware methods.
  //
  // As the app grows, we can add more Auth related middleware
  // here.
  return combineTypedMiddleware([
    new MiddlewareBinding<AppState, LogIn>(logIn),
    new MiddlewareBinding<AppState, LogOut>(logOut)
  ]);
}

// Now, we need to write those two methods, both of which
// return a Middleware typed function.
//
Middleware<AppState> _createLogInMiddleware() {
	// These functions will always take
	// your store,
	// the action thats been dispatched
	// and the a special function called next.
  return (Store store, action, NextDispatcher next) async {
		// YOUR LOGIC HERE

		// After you do whatever logic you need to do,
		// call this Redux built-in method,
		// It continues the redux cycle.
    next(action);
  };
}

Middleware<AppState> _createLogOutMiddleware() {
  return (Store store, action, NextDispatcher next) async {
   	// YOUR LOGIC HERE
    next(action);
  };
}
```

### 3. Add Firebase Logic

Almost all of these Classes and methods come from Firebase and it's associated classes.

```dart
...
Middleware<AppState> _createLogInMiddleware() {
  return (Store store, action, NextDispatcher next) async {

  	// FirebaseUser is the type of your User.
		FirebaseUser user;
		// Firebase 'instances' are temporary instances which give
		// you access to your FirebaseUser. This includes
		// some tokens we need to sign in.
    final FirebaseAuth _auth = FirebaseAuth.instance;

    // GoogleSignIn is a specific sign in class.
    final GoogleSignIn _googleSignIn = new GoogleSignIn();

    // Actions are classes, so you can Typecheck them
    if (action is LogIn) {
      try {
      	// Try to sign in the user.
      	// This method will either log in a user that your Firebase
      	// is aware of, or it will prompt the user to log in
      	// if its the first time.
      	//
        GoogleSignInAccount googleUser = await _googleSignIn.signIn();
        GoogleSignInAuthentication googleAuth = await googleUser.authentication;

        // After checking for authentication,
        // We wil actually sign in the user
        // using the token that firebase.
        user = await _auth.signInWithGoogle(
          accessToken: googleAuth.accessToken,
          idToken: googleAuth.idToken,
        );

        print('Logged in ' + user.displayName);

        // This can be tough to reason about -- or at least it was for me.
        // We're going to dispatch a new action if we logged in,
        //
        // We also continue the current cycle below by calling next(action).
        store.dispatch(new LogInSuccessful(user: user));
      } catch (error) {
        store.dispatch(new LogInFail(error));
      }
    }
    // I don't actually know if this is necessary. Let me know!
    next(action);
  };
}

Middleware<AppState> _createLogOutMiddleware() {
	// Temporary instance
	final FirebaseAuth _auth = FirebaseAuth.instance;
	// Typecheck -- beceuse all Middleware functions will be called
	// for all actions. If it *isnt* LogOut, don't waste time.
	if (action is LogOut) {
		try {
			await _auth.signOut();
			print('logging out...');
			store.dispatch(new LogOutSuccessful());
		} catch (error) {
			print(error);
		}
	}
	next(action);
  };
}
```

If you've used Firebase before, then this seems familiar. If you haven't this should be blowing your mind. You just implementing Google OAuth in a couple lines of code.

### 4. Add middleware to Store

```dart
// main.dart
...
  final store = new Store<AppState>(
    appReducer,
    initialState: new AppState(),
    // Middleware has to be a List of MiddleWare functions
    // This syntax will allow you to add any middleware
    // regardless of wether it's already a list of middleware
    // or it's just a function:
    middleware: []
      ..addAll(createAuthMiddleware())
      ..add(new LoggingMiddleware.printer()),
  );
...
```
