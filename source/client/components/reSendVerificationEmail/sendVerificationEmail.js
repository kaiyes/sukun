

Template.reSendVerificationEmail.events({
  'submit form': function() {
  event.preventDefault();
  console.log("message");
  var email =  $('#email').val();

   if (!email=="") {
    Meteor.call("reSendVerificationEmail", email);
    Router.go("home");
  }
 }
});
