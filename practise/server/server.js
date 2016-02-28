Meteor.startup(function() {
    process.env.MAIL_URL =
      "smtp://postmaster%40sandbox815499bd3e1e4adfaf528b8eb7bad856.mailgun.org:87eac37901678ad8baa94d3159cd6ba8@smtp.mailgun.org:587";

    Accounts.config({
      sendVerificationEmail: true
    });

  });


  Meteor.methods({

   clearNotification: function(){
    Notification.update(
      {invited:Meteor.user().username},
      {$set:{seen:true}}, { multi: true });
   },

   makePaidUser: function(){
   Payment.update(
     {createdBy:this.userId},
     {$set:{paid:true}});
   },

   insertNotification: function(users){
      check(users, Object);
      Notification.insert(users);
  }
 });

 Meteor.publish("findMales", function(){
  return  Meteor.users.find({"profile.gender": "male",
  "profile.hasDb":true});
 });


 Meteor.publish("findFemales", function(){
  return  Meteor.users.find({"profile.gender": "female",
  "profile.hasDb":true});
 });

 Meteor.publish("users", function(argument){
   return Meteor.users.find({});
 });

 Meteor.publish("biye", function(){
    return Biye.find();
 });

 Meteor.publish("payment", function(){
   return Payment.find();
 });

Meteor.publish("request", function(){
    return Meteor.requests.find();
});

Meteor.publish("friends", function(){
    return Meteor.friends.find();
});
