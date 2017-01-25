Template.forgotPassword.events({
  'submit form': function(e,t) {
    e.preventDefault();
    var forgotPassword = $(e.currentTarget);
    var email = forgotPassword.find('#email').val().toLowerCase();
    console.log(email);

    if (!email=="") {
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            sweetAlert('This email does not exist.');
          } else {
            sweetAlert('We are sorry but something went wrong.');
          }
        } else {
          sweetAlert('Email Sent. Check your mailbox.');
        }
      });
     }
     Router.go("/");
   }
});
