Meteor.startup(function() {
    process.env.MAIL_URL =
      "smtp://postmaster%40sandbox815499bd3e1e4adfaf528b8eb7bad856.mailgun.org:87eac37901678ad8baa94d3159cd6ba8@smtp.mailgun.org:587";

    Accounts.config({
      sendVerificationEmail: true
    });

  });


  Meteor.methods({

   clearPhotoNotification: function(){
    Notification.update(
      {invited:Meteor.user().username,type:"photo"},
      {$set:{seen:true}}, { multi: true });
   },

   clearChatNotification: function(){
    Notification.update(
      {invited:Meteor.user().username,type:"chat"},
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
  },

  startChat:function(chatId){
    check(chatId, Object);
    ChatInvites.insert(chatId);
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

 Meteor.publish("users", function(){
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

Meteor.publish("notification", function(){
   return Notification.find({});
});

Meteor.publish("chatInvites", function(){
    return ChatInvites.find();
});

Meteor.publish("conversation", function(){
    return Meteor.conversations.find({});
});

Meteor.publish("messages", function(){
    return Meteor.messages.find({});
});
