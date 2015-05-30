if (Meteor.isClient) {
    SimpleSchema.messages({
      "passwordMismatch": "Passwords do not match"
    });

  Template['authFormBlock'].rendered = function() {
    //this.isLogin = this.data.type.toUpperCase() === 'LOGIN';
    //this.isRegister = this.data.type.toUpperCase() === 'REGISTER';
  }

  Template['authInput'].helpers({
    errorClass : function(submitted, errorMessage) {
      return (submitted && errorMessage) ? 'has-error' : '';
    }

  });

  Template['authFormBlock'].helpers({
    isLogin : function() {
      return this.type.toUpperCase() === 'LOGIN';

    }
    //isRegister : function() {
    //  return this.type.toUpperCase() === 'REGISTER';
    //}

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
            FlowLayout.render('layout-auth', { content: "app" });
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
          instructions: "Password of at least 6 chars",
          //custom: function () {
          //  if (this.value !== this.field('password').value) {
          //    return "passwordMismatch";
          //  }
          //}
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

        Accounts.createUser({ email: this.email, password: this.password}, function(err) {
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
            FlowLayout.render('layout-unauth', { content: "login" });
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

    },
    'click .social-google' : function(e, t) {
        e.preventDefault();

        //if (Template.instance().isLogin()) {
          return Meteor.loginWithGoogle({
            requestPermissions: ['email']
          }, function(error) {
            if (error) {
              console.log('google login error');
              return console.log(error.reason);
            } else {
              console.log('google login success');
              FlowLayout.render('layout-auth', { content: "app" });
            }
          });
        //} else {
        //  console.log("register with Google");
        //
        //}

    },
    'click .social-facebook' : function(e, t) {
      e.preventDefault();
      return Meteor.loginWithFacebook({
        requestPermissions: ['email']
      }, function(error) {
        if (error) {
          console.log('facebook login error');
          return console.log(error.reason);
        } else {
          console.log('facebook login success');
          FlowLayout.render('layout-auth', { content: "app" });
        }
      });

    },
    'click .social-twitter' : function(e, t) {
      e.preventDefault();
      console.log("login with Twitter - not yet supported");
    }
  });

  Template['loginform'].events({
    'click #register' : function(e, t) {
      e.preventDefault();
      console.log("register");
      FlowLayout.render('layout-unauth', { content: "register"});
    }
  });

  Template['registerform'].events({
    'click #signin' : function(e, t) {
      e.preventDefault();
      console.log("login");
      FlowLayout.render('layout-unauth', { content: "login"});
    }
  });

  Template['help-login'].events({
    'click #back' : function(e, t) {
      e.preventDefault();
      console.log("back");
      FlowLayout.render('layout-unauth', { content: "login"});
    }
  });

  Template['help-register'].events({
    'click #back' : function(e, t) {
      e.preventDefault();
      console.log("back");
      FlowLayout.render('layout-unauth', { content: "login"});
    }
  });

  Template['app'].events({
    'click #logout' : function(e, t) {
      e.preventDefault();
      console.log("app logout");
      Meteor.logout();
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
