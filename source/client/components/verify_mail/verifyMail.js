Template.verifyEmail.events({
  "click  #reSend": function(){
    Meteor.call("reSendVerificationEmail");
    //Meteor.logout();
    //Router.go("home");
  }
});
