Biye = new Meteor.Collection('biye');
ChatRooms = new Meteor.Collection("chatrooms");
ChatInvites = new Meteor.Collection('invites');
Payment = new Meteor.Collection("payment");
Notification = new Meteor.Collection("notification");
DashBoard =  new Mongo.Collection("dashBoard");
Favourite = new Mongo.Collection("favourite");


Biye.allow({
    insert: function(userId, doc) {
    return !! userId;
    },

    update:function(userId, doc) {
    return !! userId;
    }
  });

  Payment.allow({
      insert: function(userId, doc) {
      return !! userId;
      }
    });
