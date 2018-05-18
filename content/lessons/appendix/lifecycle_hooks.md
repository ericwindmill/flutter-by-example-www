---
title: "Widget Lifecycle Hooks"
---

Flutter Stateful widgets have a couple built in properties associated with them
 that'll help you make sure the right data is rendered at the right time. If 
 you've worked with React or Angular, these are similar to `componentWillMount`
  and `ngOnInit`, respectively.
  
## What is State (in Flutter)?

According to the docs, state in Flutter refers specifically to information in 
your application that cannot be read asynchronously when the widget is built, 
and may change. 
  
The State object in Flutter is a Dart object which is created by a 
`StatefulWidget`. All widgets have immutable state, so a StatefulWidget itself 
doesn't change, rather it's state object changes.
  
## A Widget's Lifecycle

The Flutter framework classifies a widget's current lifecycle state in one of 
four stages:

1. Created
2. Initialized
3. Ready
4. Defunct

Each of these stages are associated with different properties and methods.

 ###1. The State is Created
 
 First, the parent StatefulWidget calls `createState()` and creates a state 
 object:
 
 ```dart
class CounterDisplay extends StatefulWidget {
  CounterDisplay({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _CounterDisplayState createState() => new _CounterDisplay();
}
```

