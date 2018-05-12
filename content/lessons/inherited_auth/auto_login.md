---
title: "Auto Login on Startup"
---

If there is a user associated with this account, we want to sign them in 
without them having to do anything. This actually doesn't take much extra code.

### 1. If a user exists, logIntoFirebase

We just need to add one line to the initUser method in `_AppStateContainerState`.

```dart
  Future<dynamic> initUser() async {
    googleUser = await _ensureLoggedInOnStartUp();
    if (googleUser == null) {
      setState(() {
        state.isLoading = false;
      });
    } else {
      // If there is a user, tell Flutter to keep that
      // loading screen up Firebase logs in this user.
      var firebaseUser = await logIntoFirebase();                     // new
    }
  }
```

This is the other case in which that method is called, but its already set up 
to handle it, by checking for a user and switching off isLoading when a user is
 logged in.
 
 Neat. 