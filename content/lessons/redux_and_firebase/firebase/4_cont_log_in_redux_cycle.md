---
title: "LogIn Redux Cycle contd"
---

Back to the Redux cycle.

So far, we've done this:

1. Add a new `auth_actions` file.
2. Add relevant actions.
3. Add Firebase middleware.

### 5. create file for Auth reducer: `lib/reducers/auth_reducer.dart`

### 4. Build Auth Reducer

```dart
// reducers/auth_reducer.dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:me_suite/actions/auth_actions.dart';
import 'package:redux/redux.dart';

// This is a built in method for creating type safe reducers.
// The alternative is building something the way we did with
// the counter reducer -- a simple method.
//
// This is the preferred method and it allows us to create
// modular functions that are safer.
//
final authReducer = combineTypedReducers<FirebaseUser>([
		// create a reducer binding for each possible reducer--
		// generally thered be one for each possible action a user
		// will take.
		// We'll pass in what a method, which takes a piece of
		// application state and an action.
		// In this case, auth methods take a user as the piece
		// of state
		//
  new TypedReducer<FirebaseUser, LogInSuccessful>(_logIn),
  new TypedReducer<FirebaseUser, LogOut>(_logOut),
]);

// Create the actual reducer methods:
//
// this is dispatched from the LogIn middleware,
// That middleware passes in the user and the action.
// All the reducer needs to do is replace the slice of state
// That handles user.
//
// *NB -- We haven't actually added a user to the state yet.
FirebaseUser _logIn(FirebaseUser user, action) {
  return action.user;
}

// This will just replace the user slice of state with null.
Null _logOut(FirebaseUser user, action) {
  return null;
}
```

---

At this point in the Redux cycle, this is the flow:

1. Action is dispatched
2. LogIn middleware intercepts the action.
3. Middleware completes and sends the action to the `appReducer`.
4. `appReducer` calls all the sub-reducers, including authReducer, which is what we just wrote.

The problem is that we haven't actually added this reducer to the `appReducer`

### 5. Add authReducer to appReducer

```dart
// reducers/app_state_reducer.dart
import 'package:me_suite/models/app_state.dart';
import 'package:me_suite/reducers/auth_reducer.dart';        //new
import 'package:me_suite/reducers/counter_reducer.dart';

AppState appReducer(AppState state, action) {
  return new AppState(
      isLoading: false,
      count: counterReducer(state.count, action),
      currentUser: authReducer(state.currentUser, action));     //new
}
```

So now when an action is dispatched, this reducer will know to perform auth actions as well.

There's only one problem:

We haven't actually updated the `AppState` class to be aware of users.

### 6. Add FirebaseUser to AppState

```dart
// models/app_state.dart
import 'package:firebase_auth/firebase_auth.dart';              //new

class AppState {
  final int count;
  final bool isLoading;
  final FirebaseUser currentUser;                               //new

  AppState({
    this.count = 0,
    this.isLoading = false,
    this.currentUser,                                           //new
  });

  AppState copyWith({int count, bool isLoading}) {
    return new AppState(
      count: count ?? this.count,
      isLoading: isLoading ?? this.isLoading,
      currentUser: currentUser ?? this.currentUser,             // new
    );
  }

  @override
  String toString() {                                           // changed
    return 'AppState{isLoading: $isLoading, count: $count, currentUser: $currentUser}';
  }
}
```

At this point, your Redux cycle is complete. Execept we don't have a way to make that cycle start.

### 7. Add needed files for Containers and Views

```
// lib folder:
- actions
	- auth_actions.dart
	- counter_actions.dart
- containers
	- auth_button                                                 // new
		- auth_button_container.dart                                // new
		- google_auth_button.dart                                   // new
	- counter
		- counter.dart
		- increase_counter.dart
- models
	- app_state.dart
- pages
	- home_page.dart
- reducers
	- auth_reducer.dart
	- app_reducer.dart
	- counter_reducer.dart
main.dart
```

### 8. Implement AuthButtonContainer

**NB:** This the first time we'll get to see a true `smart container` and `dumb widget` relationship.

The smart container interacts with the store, and then simply passes the correct data to the dumb widget to display.

This is the smart component, it'll have access to the Store.

```dart
// containers/auth_button/auth_button_container.dart
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:me_suite/actions/auth_actions.dart';
import 'package:me_suite/models/app_state.dart';
import 'package:me_suite/containers/auth_button/google_auth_button.dart';
import 'package:redux/redux.dart';

class GoogleAuthButtonContainer extends StatelessWidget {
  GoogleAuthButtonContainer({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
  	// Connect to the store:
    return new StoreConnector<AppState, _ViewModel>(
      converter: _ViewModel.fromStore,
      builder: (BuildContext context, _ViewModel vm) {
      	// We haven't made this yet.
        return new GoogleAuthButton(
          buttonText: vm.buttonText,
          onPressedCallback: vm.onPressedCallback,
        );
      },
    );
  }
}

class _ViewModel {
  final String buttonText;
  final Function onPressedCallback;

  _ViewModel({this.onPressedCallback, this.buttonText});

  static _ViewModel fromStore(Store<AppState> store) {
  	// This is a bit of a more complex _viewModel
  	// constructor. As the state updates, it will
  	// recreate this _viewModel, and then pass
  	// buttonText and the callback down to the button
  	// with the appropriate qualities:
  	//
    return new _ViewModel(
        buttonText:
        store.state.currentUser != null ? 'Log Out' : 'Log in with Google',
        onPressedCallback: () {
          if (store.state.currentUser != null) {
            store.dispatch(new LogOut());
          } else {
            store.dispatch(new LogIn());
          }
        });
  }
}
```

### 9. Add GoogleAuthButton widget

This is just a dumb widget. All it does is take in the data from its container, and then displays the proper data.

There are some Flutter things here that we've not yet seen:

* RaisedButton component
* Images
* Layout things like padding, width, and height
* Row widget
* TextAlign

All are addressed in the comments below, but all Flutter layout issues will be addressed in much more depth after the Firebase section.

```dart
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';

class GoogleAuthButton extends StatelessWidget {
  final String buttonText;
  final Function onPressedCallback;

	// Passed in from Container
  GoogleAuthButton({
    @required this.buttonText,
    this.onPressedCallback,
  });

  @override
  Widget build(BuildContext context) {
  	// Raised button is a widget that gives some
  	// automatic Material design styles
    return new RaisedButton(
      onPressed: onPressedCallback,
      color: Colors.white,
      child: new Container(
      	// Explicitly set height
      	// Contianer has many options you can pass it,
      	// Most widgets do *not* allow you to explicitly set
      	// width and height
        width: 230.0,
        height: 50.0,
        alignment: Alignment.center,
        // Row is a layout widget
        // that lays out its children on a horizontal axis
        child: new Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
          	// Padding is a convenience widget that adds Padding to it's child
            new Padding(
              padding: const EdgeInsets.only(right: 20.0),
              // Image, like everyhting, is just a class.
              // This constructor expects an image URL -- I found this one on Google
 							child: new Image.network(
                'https://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png',
                width: 30.0,
              ),
            ),
            new Text(
              buttonText,
              textAlign: TextAlign.center,
              style: new TextStyle(
                fontSize: 16.0,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### 10. Finally, add LogIn button to app

Let's add our button container to our HomePage:

```dart
// pages/home_page.dart
...

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
							new GoogleAuthButtonContainer(),									// new
              new Text(
                'You have pushed the button this many times:',
              ),
              new Counter(),
            ],
          ),
        ),
      ),
      floatingActionButton: new IncreaseCountButton()
    );
  }
```

Once that's added in, restart your app, press 'LogIn with Google' and you should be walked through the LogIn OAuth process.

Also, if all is working properly, the button now says 'Log Out'!
