if (Meteor.isClient) {


  Template['Login'].helpers({
    schema: function () {
      return new SimpleSchema({
        email: {
          type: String,
          label:'Email',
          regEx: SimpleSchema.RegEx.Email,
          instructions: "Valid email is required"

        },
        password: {
          type: String,
          label: 'Password',
          min: 6,
          instructions: "Password of at least 6 chars"

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

        Meteor.loginWithPassword(this.email, this.password, function(err) {
          if (err) {
            // The user might not have been found, or their passwword
            // could be incorrect. Inform the user that their
            // login attempt has failed.
            console.log("login with password failed");
            callbacks.failed(); // Display error message.
          } else {
            // The user has been logged in.
            console.log("login with password success");
            callbacks.success(); // Display success message.
            callbacks.reset();
          }

        });
           // Run each Element's custom `reset` function to clear the form.
      };
    }
  });

  Template['Login'].events({
    'click #register' : function(e, t) {
      e.preventDefault();
      console.log("register");
    }
  });


  ReactiveForms.createFormBlock({
    template: 'loginFormBlock',
    submitType: 'normal'
  });

  ReactiveForms.createElement({
    template: 'loginInput',
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
