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
}


});
