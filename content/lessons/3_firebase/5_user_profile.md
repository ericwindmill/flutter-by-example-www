---
title: "Add User Profile"
lesson: 5
chapter: 3
cover: "https://unsplash.it/400/300/?random?BoldMage"
category: "flutter"
type: "lesson"
prev: "Log In Redux Cycle contd"
next: ""
tags:
    - programming
    - flutter
    - dart
---

As a last step here with Auth, lets add a bit of visual feedback.

When a user logs in, let's show their image and display name on the screen, so they know they're logged in.

Because this display relies only on whether or not a user is logged in, we don't have to mess with our state or Redux. We simply build this widget.

### 1. Add needed container and files: `lib/containers/user_profile/user_profile.dart`

### 2. Build the widget to display a profile:

```dart
// containers/user_profile/user_profile.dart

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:me_suite/models/app_state.dart';
import 'package:me_suite/selectors/selectors.dart';
import 'package:redux/redux.dart';

class CurrentUserProfile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
  	// This widget will change as the Redux store is updated,
  	// So we need to connnect it to the store:
    return new StoreConnector<AppState, _ViewModel>(
    		// Build a viewModel, as usual:
        converter: _ViewModel.fromStore,
        builder: (BuildContext context, _ViewModel vm) {
        	// First, check to see if
          if (vm.displayName == null) {
            return new Container();
          } else {
            return new Center(
              child: new Column(
                children: <Widget>[
                  new Text('Now signed in:',
                      style: Theme.of(context).textTheme.display1),
                  new Text(vm.displayName,
                      style: Theme.of(context).textTheme.display2),
                ],
              ),
            );
          }
        });
  }
}

// A very basic viewModel.
class _ViewModel {
  final String displayName;
  final String profileImgUrl;

  _ViewModel({@required this.displayName, @required this.profileImgUrl});

  static _ViewModel fromStore(Store<AppState> store) {
    return new _ViewModel(
    		// We have to use the null aware operator here, so that
    		// when there isn't a user, it just fails silently
        displayName: store.state.currentUser?.displayName,
        profileImgUrl: store.state.currentUser?.photoUrl,
    );
  };
}
```

Finally, in your `home_page`, update your `build` method:

```dart
// pages/home_page.dart
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
              new GoogleAuthButtonContainer(),
              new Padding(																			// new
                padding: const EdgeInsets.symmetric(vertical: 16.0),  // new
                child: new CurrentUserProfile(),								// new
              ),
              new Text(
                'You have pushed the button this many times:',
              ),
              new Counter(),
            ],
          ),
        ),
      ),
      floatingActionButton: new IncreaseCountButton(),
    );
  }
```

Once you've added this feature, you can click 'LogIn', and some text will appear showing the displayName of whichever use logged in.

**NB:** displayName is a property on FirebaseUser class, given to us by the flutter_fire package.

And now, we've built the boiler plate app. This is what you should have:

![boiler app](http://res.cloudinary.com/ericwindmill/image/upload/v1518921043/flutter_by_example/boiler_plate_app.gif)
