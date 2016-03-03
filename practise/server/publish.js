
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
    return Meteor.friends.find();
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
