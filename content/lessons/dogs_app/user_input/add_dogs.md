---
title: "Add Dog Functionality"
---

Adding functionality to that form on your `AddDogForm` isn a pretty easy feat.

Essentially, you just need to add a couple built in Flutter classes that keep track of form input, and a function that returns the data to the main page through the router.

### 1. TextEditingController class

There are a couple ways to go about tracking text input form elements. You can use Form widgets, or you can track each text input separately.

In this example, I will show you how to do the latter. TextEditingController is an important and fundamental thing in Flutter.

A `TextEditingController` is basically a class that listens to its assigned TextField, and updates it's own internal state everytime the text in the TextField changes.

In your `new_dog_form.dart`:

```dart
// lib/new_dog_form in the _AddDogFormPageState class:
class _AddDogFormPageState extends State<AddDogFormPage> {
  // New:
  // One TextEditingController for each form input:
  TextEditingController nameController = new TextEditingController();
  TextEditingController locationController = new TextEditingController();
  TextEditingController descriptionController = new TextEditingController();

@override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Add a new Dog'),
        backgroundColor: Colors.black87,
      ),
      body: new Container(
        color: Colors.black54,
        child: new Padding(
          padding: const EdgeInsets.symmetric(
            vertical: 8.0,
            horizontal: 32.0,
          ),
          child: new Column(
            children: [
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    // Tell your textfield which controller it owns
                    controller: nameController,                         // new
                    // Every single time the text changes in a
                    // TextField, this onChanged callback is called
                    // and it pass in the value
                    //
                    // Set the text of your controller to
                    // to the next value
                    onChanged: (v) => nameController.text = v,          // new
                    decoration: new InputDecoration(
                      labelText: 'Name the Pup',
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: locationController,                     // new
                    onChanged: (v) => locationController.text = v,      // new
                    decoration: new InputDecoration(
                      labelText: "Pups location",
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: new TextField(
                    controller: descriptionController,                  // new
                    onChanged: (v) => descriptionController.text = v,   // new
                    decoration: new InputDecoration(
                      labelText: 'All about the pup',
                    )),
              ),
              new Padding(
                padding: const EdgeInsets.all(16.0),
                child: new Builder(
                  builder: (context) {
                    return new RaisedButton(
                      onPressed: () => print('PRESSED'),
                      color: Colors.indigoAccent,
                      child: new Text('Submit Pup'),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
```

Now, even though it doesn't look like anything new is happening, the `TextEditingControllers` are keeping track of you form.

### 2. Submit The Form

In the same class, add this function, which will pass the form information back via the Navigator:

```dart
  // You'll need the context
  // in order for the Navigator to work.
  void submitPup(context) {
    // first make sure there is some information
    // in the form.
    // A dog needs a name, but may be location independent
    // So we'll only abandon the save if theres no name.
    if (nameController.text.isEmpty) {
      print('Dogs need names!');
    } else {
      // Create a new dog wit hthe information from the form
      var newDog = new Dog(nameController.text, locationController.text,
          descriptionController.text);
      // Pop the page off the route stack
      // and pass the new dog back to wherever this page
      // was created.
      Navigator.of(context).pop(newDog);
    }
  }
```

And lastly, add that method to your 'raised button'

```dart 
// lib/new_dog_form.dart in the bottom of the build method:
...
    builder: (context) {
      return new RaisedButton(
        onPressed: () => submitPup(context),                            // new
        color: Colors.indigoAccent,
        child: new Text('Submit Pup'),
      );
    },
...
```


And that's that. Now, you should be able to submit a new dog and see it on your main page!
