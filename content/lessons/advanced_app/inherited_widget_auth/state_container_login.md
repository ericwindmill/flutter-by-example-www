---
title: "Auto Login"
---

Right now, when you start the app, it's showing a spinner for 2 seconds, then
 routing to the log in page. 
 
 What it *should* be doing is checking to see if a user exists on this device
  in this app. If so, log that use in, otherwise, defer to the auth page. 
  First, handle the case that a user does in-fact exist. That'll start in the
   AppStateContainer.
   
### 1. Replace 'startCountdown' with 'initUser'
   
```dart
// lib/app_state_container.dart
class _AppStateContainerState extends State<AppStateContainer> {
  AppState state;
  GoogleSignInAccount googleUser;                                     // new
  final googleSignIn = new GoogleSignIn();                            // new

  @override
  void initState() {
    super.initState();
    if (widget.state != null) {
      state = widget.state;
    } else {
      state = new AppState.loading();
      initUser();                                                     // new
    }
  }
  
  Future<Null> initUser() async {
    googleUser = await _ensureLoggedInOnStartUp();
    if (googleUser == null) {
      setState(() {
        state.isLoading = false;
      });
    } else {
      var firebaseUser = await logIntoFirebase();
    }
  }
```