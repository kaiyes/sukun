Meteor.startup(function() {
    process.env.MAIL_URL =
      "smtp://postmaster%40sandbox815499bd3e1e4adfaf528b8eb7bad856.mailgun.org:87eac37901678ad8baa94d3159cd6ba8@smtp.mailgun.org:587";

    Accounts.config({
      sendVerificationEmail: true
    });

  });


  Meteor.methods({
   clearNotification: function(){
    Notification.update({invited:Meteor.user().username},
    {$set:{seen:true}}, { multi: true });
   }
 });

 Meteor.publish("checkIfUserHasDb", function(){
   return Biye.findOne({createdBy: Meteor.userId()});
 });


 Meteor.publish("findThem", function(){
   var gen = Meteor.user().profile.gender;
   var findMale = Meteor.users.find({"profile.gender": "male", "profile.hasDb":true});
   var findFemale = Meteor.users.find({"profile.gender": "female", "profile.hasDb":true});

     if (gen === "male") {
       return findFemale;
      } else {
       return findMale;
     }

     /*return Meteor.users.find({"profile.gender": "female", "profile.hasDb":true});*/

 });
