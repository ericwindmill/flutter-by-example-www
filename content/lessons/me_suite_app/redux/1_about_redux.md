---
title: "What is Redux"
---

**NB:** This is _not_ a Redux tutorial. Here's a small overview of what it is.

[Redux](https://redux.js.org/) is a state management library and specification originally written in JavaScript and made for React Apps. Although you can use Redux in any kind of app, React not needed.

### From Redux.js.org:

> I wrote Redux while working on my React Europe talk called “Hot Reloading with Time Travel”. My goal was to create a state management library with minimal API but completely predictable behavior, so it is possible to implement logging, hot reloading, time travel, universal apps, record and replay, without any buy-in from the developer.

In laymens terms, the important part of Redux for us is that it have a very small API and created a completely predictable state container.

In the early stages of an application, your state is probably simple. In the starter Flutter app with the counter, the only state of the application is current count. And the only way to interact with that state is a single action: increasing the count.

![simple widget tree](http://res.cloudinary.com/ericwindmill/image/upload/v1518974500/flutter_by_example/simple_tree.png)

In this situation, you don't really need to think about Redux or state management. But as your app grows, you might want to have a button on a different page that increases the count. So maybe it looks like this:

![kind of complicated tree](http://res.cloudinary.com/ericwindmill/image/upload/v1518974500/flutter_by_example/medium_tree.png)

And this is fine. You have a `counter` variable high up in that StatefulWidget, as well as `setState` function that increases it. Pass the method all the way down to the button, and the counter var to your Text widget that displays it.

But eventually your app will be more like this:

![very complicated widget tree](http://res.cloudinary.com/ericwindmill/image/upload/v1518974500/flutter_by_example/hairy_tree.png)

This is a poor representation of a very simple todo app. But, just looking at the chart sucks, so you can image that actually implementing this using a single widget could get hairy fast.

And now, you can reach for something like Redux.

### Redux in a Nutshell

In a nutshell, Redux has two main qualities that we care about:

1. **A single Store that holds all the State.**
   No matter where you are in your app, you can access your Store's state, which includes all the data you need. And if you need to update your state from anywhere in your app, the rest of your app 'knows' it's been updated.
2. **All the data flows one way** (and State is read-only) This is slightly harder concept but it makes management super easy. All data flows in one direction:
   1. User interaction (i.e. button clicked) =>
   2. Tells Redux to fire an `action` =>
   3. Your app does some functions if you need (i.e. increase the count by one) =>
   4. Redux updates the store in a `reducer`. Reducers are pure functions, so you know there are no unwanted side affects. =>
   5. The store is updated and now the app knows which widgets need to be repainted.

The important thing here is that the button _does not_ tell the counter to repaint, nor does it update state directly. Redux gets the information, passes the information along with an action to the reducer and tells the counter to repaint. This is awesome and important because it means that, if you're following the rules, it's impossible for subtle issues to creep into your state.

If you're brand new to Redux, check out the resources below.

### Redux Jargon

1. `dispatch` -- When Redux tells the store which `action` has been fired from user interaction

### Additional Redux Resources

* My favorite Redux overview article:
  [A Cartoon Intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6)
* A great talk about Flutter architecture in general, from the creator of `flutter_redux` and a contributor to Dart's `redux` package. Brian does a great job of exmplaing architecture options for simple apps to complicated ones:
  [DartConf 2018 Flutter Architecture Talk](https://www.youtube.com/watch?v=zKXz3pUkw9A&t=1467s)
* A very poor Redux visualizer that my pals an I made in a day: (It shows examples in JavaScript).
  [Redux Visualizer](https://hackbit.github.io/reactriot2017-oceanbeach/)
