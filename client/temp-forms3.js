if (Meteor.isClient) {

  Template['authFormBlock'].helpers({
    isLogin : function() {
      return this.type.toUpperCase() === 'LOGIN'
    },
    isRegister : function() {
      return this.type.toUpperCase() === 'REGISTER'
    }

  });
  Template['loginform'].helpers({
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

  Template['registerform'].helpers({
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

        },
        confirmpswd: {
          type: String,
          label: 'Confirm password',
          min: 6,
          instructions: "Password of at least 6 chars"

        }      });
    },
    action: function () {
      return function (els, callbacks, changed) {
        console.log("[forms] Action running!");
        console.log("[forms] Form data!", this);
        console.log("[forms] HTML elements with `.reactive-element` class!", els);
        console.log("[forms] Callbacks!", callbacks);
        console.log("[forms] Changed fields!", changed);

        Meteor.createUser({ email: this.email, password: this.password}, function(err) {
          if (err) {
            // The user might not have been found, or their passwword
            // could be incorrect. Inform the user that their
            // login attempt has failed.
            console.log("register with password failed");
            callbacks.failed(); // Display error message.
          } else {
            // The user has been logged in.
            console.log("register with password success");
            callbacks.success(); // Display success message.
            callbacks.reset();
          }

        });
        // Run each Element's custom `reset` function to clear the form.
      };
    }
  });

  Template['authFormBlock'].events({
    'click #help' : function(e, t) {
      e.preventDefault();
      console.log("help");

      FlowLayout.render('layout-unauth', { content: "help-" + this.type });

    }
  });

  Template['loginform'].events({
    'click #register' : function(e, t) {
      e.preventDefault();
      console.log("register");
      FlowLayout.render('layout-unauth', { content: "register"});
    },
    'click #helpx' : function(e, t) {
      e.preventDefault();
      console.log("help");
    }
  });

  Template['registerform'].events({
    'click #signin' : function(e, t) {
      e.preventDefault();
      console.log("login");
      FlowLayout.render('layout-unauth', { content: "login"});
    }
  });

  ReactiveForms.createFormBlock({
    template: 'authFormBlock',
    submitType: 'normal'
  });

  ReactiveForms.createElement({
    template: 'authInput',
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
