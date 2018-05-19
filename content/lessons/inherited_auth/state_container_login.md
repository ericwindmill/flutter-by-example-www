---
title: "Login New User"
---

Right now, when you start the app, it's showing a spinner for 2 seconds, then
 routing to the log in page. 
 
 What it *should* be doing is checking to see if a user exists on this device
  in this app. If so, log that use in, otherwise, defer to the auth page. 
  First, handle the case that a user does in-fact exist. That'll start in the
   AppStateContainer.
   
### 1. Replace 'startCountdown' with 'initUser'

In this app I've only set up Google OAuth via Firebase, so you'll see classes
 and methods that refer to `GoogleUser`.
   
```dart
// lib/app_state_container.dart
class _AppStateContainerState extends State<AppStateContainer> {
  AppState state;
  // This is used to sign into Google, not Firebase.
  GoogleSignInAccount googleUser;                                     // new
  // This class handles signing into Google.
  // It comes from the Firebase plugin.
  final googleSignIn = new GoogleSignIn();                            // new

  @override
  void initState() {
    super.initState();
    if (widget.state != null) {
      state = widget.state;
    } else {
      state = new AppState.loading();
      // Call a separate function because you can't use
      // async functionality in initState()
      initUser();                                                     // new
    }
  }
  
  // All new:
  // This method is called on start up no matter what.
  Future<Null> initUser() async {
    // First, check if a user exists.
    googleUser = await _ensureLoggedInOnStartUp();
    // If the user is null, we aren't loading anyhting
    // because there isn't anything to load. 
    // This will force the homepage to navigate to the auth page.
    if (googleUser == null) {
      setState(() {
        state.isLoading = false;
      });
    } else {
      // Do some other stuff, handle later. 
    }
  }
  
  Future<GoogleSignInAccount> _ensureLoggedInOnStartUp() async {
    // That class has a currentUser if there's already a user signed in on 
    // this device.
    GoogleSignInAccount user = googleSignIn.currentUser;
    if (user == null) {
      // but if not, Google should try to sign one in whos previously signed in
      // on this phone.
      user = await googleSignIn.signInSilently();
    }
    // NB: This could still possibly be null.
    googleUser = user;
    return user;
  }
```

This code alone will lead you back to this 

![Sign in with google](https://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1524503129/flutter_by_example/Simulator_Screen_Shot_-_iPhone_X_-_2018-04-23_at_09.04.56.png)

### 2. Make The Log In Button Do Something

Start this section in the `auth_screen.dart` file.

If you're seeing this Login page, that means you have no Google account 
associated with this device and app. So when you click the button, you need 
to both log into Google and then log into Firebase (which will happen in the 
background). 

The auth screen will only have a few minor tweaks in the build method:

```dart
// screens/auth_screen.dart
// ... 
 Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    // Get access to the AppState
    final container = AppStateContainer.of(context);                  // new

    return new Container(
      width: width,
      child: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          new RaisedButton(
          // Call a method from the state (!!!) 
            onPressed: () => container.logIntoFirebase(),             // updated
  // ...
```

Add that method into your `_AppStateContainerState` class:

```dart
// app_state_container.dart
Future<Null> logIntoFirebase() async {
  // This method will be used in two cases,
  // To make it work from both, we'll need to see if theres a user.
  // When fired from the button on the auth screen, there should
  // never be a googleUser
    if (googleUser == null) {
      // This built in method brings starts the process
      // Of a user entering their Google email and password.
      googleUser = await googleSignIn.signIn();
    }
    
    // This is how you'll always sign into Firebase.
    // It's all built in props and methods, so not much work on your end.
    FirebaseUser firebaseUser;
    FirebaseAuth _auth = FirebaseAuth.instance;
    try {
      // Authenticate the GoogleUser
      // This will give back an access token and id token
      GoogleSignInAuthentication googleAuth = await googleUser.authentication;
      // Sign in to firebase with that:
      firebaseUser = await _auth.signInWithGoogle(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );
      // Not necessary
      print('Logged in: ${firebaseUser.displayName}');
      

      setState(() {
        // Updating the isLoading will force the Homepage to change because of
        // The inheritedWidget setup.
        state.isLoading = false;
        // Add the use to the global state
        state.user = firebaseUser;
      });
    } catch (error) {
      print(error);
      return null;
    }
  }
```

That code is enough to log in. Hit that button.


