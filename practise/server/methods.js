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
