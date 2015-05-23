if (Meteor.isClient) {


  Template['testLogin'].helpers({
    schema: function () {
      return new SimpleSchema({
        testField: {
          type: String,
          label: 'Username',
          max: 3,
          instructions: "Enter a value!"
        },
        testEmail: {
          type: String,
          label:'Email',
          regEx: SimpleSchema.RegEx.Email,
          instructions: "Enter a valid email!"
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
    template: 'coreFormBlock',
    submitType: 'normal'
  });

  ReactiveForms.createElement({
    template: 'coreInput',
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
