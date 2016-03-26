Template.home.onCreated(function() {
    if (Accounts._verifyEmailToken) {
      Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
        if (err != null) {
          if (err.message = 'Verify email link expired [403]') {
            sweetAlert("Sorry this verification link has expired.");
          }
        } else {
          sweetAlert('Thank you! Your email address has been confirmed.');
          Router.go("/details");
        }
      });
    }

    if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
    Router.go("/resetPassword");
   }
  });
