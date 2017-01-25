Template.register.events({
  'submit form': function() {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;


    profile = {
      hasDb:false,
      approved:false,
      banned:false,
    };

    Meteor.call("addUser", email,password,profile, function(error,result){
      if (error) {
        sweetAlert(error.reason);
      } else {
        sweetAlert("your account was created successfully");

        Meteor.loginWithPassword(email, password,
          function(error) {
            if (error) {
              sweetAlert(error.reason);
            } else {
              Router.go('details');
            };
          });

      }
    });

    $('[name = password]').val('');
    $('[name = email]').val('');
  },

});


// ........................login.............................

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;

    Meteor.loginWithPassword(email, password,
      function(error) {

        if (error) {
          sweetAlert(error.reason);
        } else {
          Router.go('list');
        };
      });
    $('[name="listName"]').val('');
    $('[name = password]').val('');
  }
});
