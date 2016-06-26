Template.verifyEmail.events({
  "click  #reSend": function(){
    console.log("client");
    Meteor.call("reSendVerificationEmail");
    Meteor.logout();
    Router.go("home");
  }
});
