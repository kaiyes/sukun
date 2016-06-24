
Template.resetPassword.helpers({
   reset:function(){
     Session.get('resetPassword');
   }
});

Template.resetPassword.events({
  'submit form': function(e,t) {
  e.preventDefault();
  var currentTarget = $(e.currentTarget);
  var newPassword =  currentTarget.find('#password').val();
  console.log(newPassword);

  var session =  Session.get('resetPassword');
  var token = session.toString();
  console.log(token);

   if (!newPassword=="") {
    Accounts.resetPassword(session, newPassword, function(err) {
      if (err) {
        sweetAlert(err.reason);
      } else {
        sweetAlert('Your password has been changed. Welcome back!');
        Session.set('resetPassword', null);
      }
    });
   }
   Router.go("/list");
 }
});
