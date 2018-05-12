---
title: "Set up AppLoading"
---

To prove that app loading is indeed doing anything, some easy refactoring to 
use a loading screen are in order.

You `appState` has a property called isLoading. In a big app with 
configuration, that'll probably always start as 'true', and then be switched 
off when the configuration is complete. This bool is what Flutter will use to
 render the loading screen.
 
For now, the `HomePage` will just render a loading spinner until the config 
is loaded, and then it'll render with the full HomeScreen experience.

### 1. Add a LoadingView to HomeScreen
In your `HomeScreenState` widget...

```dart
// screens/home_screen.dart
class HomeScreen extends StatefulWidget {/*...*/}

class HomeScreenState extends State<HomeScreen> {
  // new 
  AppState appState;
  
  // new
  Widget get _pageToDisplay {
    if (appState.isLoading) {
      return _loadingView;
    } else {
      return _homeView;
    }
  }

  // new
  Widget get _loadingView {
    return new Center(
      child: new CircularProgressIndicator(),
    );
  }
  
  // new
  Widget get _homeView {
    return new Center(child: new Text(appState.user.displayName));
  }

  @override
  Widget build(BuildContext context) {
    // This is the InheritedWidget in action.
    // You can reference the StatefulWidget that
    // wraps it like this, which allows you to access any
    // public method or property on it.
    var container = AppStateContainer.of(context);
    // For example, get grab its property called state!
    appState = container.state;
    // Everything this build method is called, which is when the state 
    // changes, Flutter will 'get' the _pageToDisplay widget, which will 
    // return the screen we want based on the appState.isLoading
    Widget body = _pageToDisplay;

    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Suite'),
      ),
      // Replace the hardcoded widget
      // with our widget that switches.
      body: body,
    );
  }
}
```

This is neat. It doesn't look like much now, but you can call methods on that
 variable called `container`, which can call setState and tell Flutter to 
 rerender *any* widget in the tree that relies on that piece of state.
 
### 2. Add Loading Logic to AppStateContainer

Now, you can add logic to your app state container, which will tell the home 
screen to rerender based on isLoading.

In `_AppStateContainerState`...

```dart
// app_state_container.dart
class AppStateContainer extends StatefulWidget {/*..*/}

class _AppStateContainerState extends State<AppStateContainer> {
  // Pass the state through because on a StatefulWidget, 
  // properties are immutable. This way we can update it. 
  AppState state;

  @override
  // Updated
  void initState() {
    super.initState();
    if (widget.state != null) {
      state = widget.state;
    } else {
      state = new AppState.loading();
      // fake some config loading
      startCountdown();
    }
  }
  
  // If all goes well, when you launch the app 
  // you'll see a loading spinner for 2 seconds
  // Then the HomeScreen main view will appear
  Future<Null> startCountdown() async {
    const timeOut = const Duration(seconds: 2);
    new Timer(timeOut, () {
      setState(() => state.isLoading = false);
    });
  }

  // So the WidgetTree is actually
  // AppStateContainer --> InheritedStateContainer --> The rest of your app. 
  @override
  Widget build(BuildContext context) {
    return new _InheritedStateContainer(
      data: this,
      child: widget.child,
    );
  }
}

//...
```

Once this is done, your app should be doing this:

![gif of basic app](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1524232766/flutter_by_example/inherited_fake_login.gif)

That's proof that your inherited widget is working, and setting state 
at the proper time. Nice!



