
Meteor.publish("find", function(gender){
check(gender, String);
 return  Meteor.users.find({"profile.gender": gender,
 "profile.hasDb":true},{
    fields: {
      "username": 1,
      "profile": 1,
    }
  });
});

Meteor.publish("notification", function(username){
  check(username, String);

   return Notification.find({
     invited: username,seen:false
    });
});

Meteor.publish("payment", function(){
  return Payment.find({createdBy:this.userId},{
     fields: {
       "createdBy": 1,
       "paid": 1,
     }
   });
});

 Meteor.publish("users", function(username){
   check(username, String);
   return Meteor.users.find({username:username},{
      fields: {
        "username": 1
      }
    });
 });

 Meteor.publish("biye", function(userId){
    check(userId, String);
    return Biye.find({createdBy: userId});
 });

Meteor.publish("request", function(){
    return Meteor.requests.find({
      $or: [{requesterId: this.userId},
           {userId: this.userId}]
    },{
       fields: {
         "requesterId": 1,
         "userId": 1
       }
     });
});

Meteor.publish("friends", function(){
    return Meteor.friends.find({
      $or: [{friendId: this.userId},
           {userId: this.userId}]
    },{
       fields: {
         "friendId": 1,
         "userId": 1
       }
    });
});

Meteor.publish("chatInvites", function(user){
    check(user, String);
    return ChatInvites.find({
      $or: [{invited: user},
           {inviter: user}]
    });
});

Meteor.publish("conversation", function(){
    return Meteor.conversations.find({
      _participants: this.userId});
});

Meteor.publish("messages", function(conversationId){
    check(conversationId, String);
    return Meteor.messages.find({
      conversationId: conversationId
    });
});


Meteor.publish('participants', function (conversationId){
    check(conversationId, String);
    return Meteor.participants.find({
      conversationId:conversationId
    },{
       fields: {
         "conversationId": 1,
         "userId": 1,
         "read":1,
         "userId":1
       }
  });
});

Meteor.publish("allConversations", function(){
    return Meteor.conversations.find({});
});

Meteor.publish('allUsers', function () {
    return Meteor.users.find({},{
       fields: {
         "username": 1,
       }
     });
});
