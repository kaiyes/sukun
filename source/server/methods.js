Meteor.methods({

addUser: function(email,password,username,profile){
  check(profile, Object);
  Accounts.createUser({
        email: email,
        password: password,
        username: username,
        profile: profile
      });
},

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

 clearAdminNotification: function(convoId){
  check(convoId, String);
  AdminNotification.remove({ convoId: convoId });
 },

 makePaidUser: function(){
 Payment.update(
   { createdBy:this.userId },
   { $set: { paid:true }});
 },

 insertNotification: function(users){
    check(users, Object);
    Notification.insert(users);
},

insertAdminNotification: function(adminInfo){
   check(adminInfo, Object);
   AdminNotification.insert(adminInfo);
},

startChat:function(chatId){
  check(chatId, Object);
  ChatInvites.insert(chatId);
},

deleteChat:function(chatId){
  check(chatId, String);
  ChatInvites.remove({ convoId:chatId });
  Meteor.messages.remove({
    conversationId: chatId
  });
  Meteor.participants.remove({
    conversationId:chatId
  });
  Meteor.conversations.remove({
    _id:chatId
  });
  Notification.remove({ convoId : chatId });

},

dashBoard: function(info){
   check(info, Object);
   DashBoard.insert(info);
},

clearDashNotification: function(){
 DashBoard.update(
   {profileOf:Meteor.user().username,type:"profileView"},
   {$set:{seen:true}}, { multi: true });
},

remove: function(id){
  check(id, String);
  DashBoard.remove({_id:id});
},

removeRevoke: function(id){
  check(id, String);
  Notification.remove({_id:id});
},

insertFavourite: function(info){
   check(info, Object);
   Favourite.insert(info);
},

removeFavourite: function(id){
  check(id, String);
  Favourite.remove({_id:id});
},

reSendVerificationEmail: function(){
  Accounts.sendVerificationEmail(this.userId);
},

approve: function(id){
 Meteor.users.update(
   { _id: id },
   { $set: { "profile.approved": true }}
  );
},

disApprove: function(id){
 Meteor.users.update(
   { _id: id },
   { $set: { "profile.approved": false }}
  );
},

ban: function(id){
 Meteor.users.update(
   { _id: id },
   { $set: { "profile.banned": true }}
  );
},

unBan: function(id){
 Meteor.users.update(
   { _id: id },
   { $set: { "profile.banned": false }}
  );
},

});
