
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
