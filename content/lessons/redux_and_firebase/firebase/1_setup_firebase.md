---
title: "Adding Firebase"
---

So far, this is what we have. It's just the starter app, but it's updating via Redux. Which is cool.

![end of redux gif](http://res.cloudinary.com/ericwindmill/image/upload/c_scale,w_300/v1520031199/flutter_by_example/end-of-redux.gif)

Now, we're going to add Firebase Firestore, as well as the ability to sign in users.

[Firebase](https://firebase.google.com/) makes this incredibly easy.

Firebase is collection of tools that app developers can use to solve 'boilerplate' problems. The biggest of which are user authentication and a realtime database.

Every app pretty much needs these two things. Rather than hand-rolling a solution to these problems on every project you make, why not just defer to the experts?

I encourage you to poke around the Firebase homepage if you aren't convinced, and return to this when you're ready to set it up.

***

### Integrating Firebase

Adding Firebase functionality to your application is one of the few times that you'll actually have to explore outside your Flutter app's `lib` folder, and add some low level configurations.

There is no way that I could write a better walk-through to setting up Firebase than the people at Google themselves could, so I'm going to send you [to this Codelab about adding Firebase to your app](https://codelabs.developers.google.com/codelabs/flutter-firebase/#5)

For the purpose of this tutorial, you should do Step 5 and half of Step 6. Stop when you get the heading 'Add Google Sign-In to Friendlychat'.










