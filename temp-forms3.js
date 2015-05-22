if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template['testForm'].helpers({
    schema: function () {
      return new SimpleSchema({
        testField: {
          type: String,
          max: 3,
          instructions: "Enter a value!"
        }
      });
    },
    action: function () {
      return function (els, callbacks, changed) {
        console.log("[forms] Action running!");
        console.log("[forms] Form data!", this);
        console.log("[forms] HTML elements with `.reactive-element` class!", els);
        console.log("[forms] Callbacks!", callbacks);
        console.log("[forms] Changed fields!", changed);
        callbacks.success(); // Display success message.
        callbacks.reset();   // Run each Element's custom `reset` function to clear the form.
      };
    }
  });

  ReactiveForms.createFormBlock({
    template: 'basicFormBlock',
    submitType: 'normal'
  });

  ReactiveForms.createElement({
    template: 'basicInput',
    validationEvent: 'keyup',
    reset: function (el) {
      $(el).val('');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
