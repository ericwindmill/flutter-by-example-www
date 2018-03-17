---
title: "LogIn Redux Cycle"
---

Let's wire up a button in our app that logs in a user with Firebase.

### 1. Add a new `auth_actions` file.

### 2. Add relevant actions:

```dart
// actions/auth_actions.dart
import 'package:firebase_auth/firebase_auth.dart';
// gives us access to `@required`
import 'package:flutter/foundation.dart';

class LogIn {}

class LogInSuccessful {
  final FirebaseUser user;

  LogInSuccessful({ @required this.user});

  @override
  String toString() {
    return 'LogIn{user: $user}';
  }
}

class LogInFail {
  final dynamic error;
  LogInFail(this.error);
  @override
  String toString() {
    return 'LogIn{There was an error loggin in: $error}';
  }
}

class LogOut {}

class LogOutSuccessful {
  LogOutSuccessful();
  @override
  String toString() {
    return 'LogOut{user: null}';
  }
}
```

These are our basic actions. From here, we need to write our first middleware. That takes a bit of an aside, and then we'll return to our Redux cycle.
