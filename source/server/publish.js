
Meteor.publish("find", function(gender){
check(gender, String);
 return  Meteor.users.find({
   "profile.gender": gender,
   "profile.hasDb":true },{
    fields: {
      "username": 1,
      "profile": 1,
      "createdAt": -1,
    }
  });
});

Meteor.publish("notification", function(username){
  check(username, String);

   return Notification.find({
     invited: username,seen:false
    });
});

Meteor.publish("adminNotification", function(){

   return AdminNotification.find({
      convoId:{$ne: null},seen:false
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
    /*check(userId, String);*/
    return Biye.find({ createdBy: userId });
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
    },{sort: {date: 1}});
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

Meteor.publish("whoViewed", function(username){
  check(username, String);

   return DashBoard.find({
     profileOf: username,
     type:"profileView",
     seen:false
    });
});

Meteor.publish("dashBoard", function(username){
  check(username, String);

   return DashBoard.find({
     profileOf: username,
     type:"profileView",
     seen:true
    });
});


Meteor.publish("didIview", function(profileOwner,viewer){
  check(profileOwner, String);
  check(viewer, String);

   return DashBoard.find({
     profileOf: profileOwner,
     viewer:viewer,
     seen:false,
     type:"profileView"
    });
});

Meteor.publish("revokeNotification", function(username){
  check(username, String);

   return Notification.find({

     $or: [{invited: username,seen:true,
           type:"photo", action:"revoke"},
          {inviter: username,seen:true,
          type:"photo", action:"revoke"}]

    });
});

Meteor.publish("fav", function(){

   return Favourite.find({
       whosFav: this.userId
    });
});

// below subs are for for admin

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

Meteor.publish('admin', function () {
    return Meteor.users.find({ username:"admin" },{
       fields: {
         "username": 1,
       }
     });
});

Meteor.publish('allUsersForAdmin', function () {
    return Meteor.users.find({});
});

Meteor.publish("biyeForAdmin", function(){
   return Biye.find({ });
});
