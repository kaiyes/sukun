Template.dashBoard.helpers({
   whoViewed: function() {
     var username = Meteor.user().username;
     Meteor.subscribe('dashBoard', username);

     return DashBoard.find({
       profileOf: username,
       type:"profileView",
       seen:true
      });
  },

  'conversationsIstarted': function() {
    var username = Meteor.user().username;
    Meteor.subscribe("ChatInvites", username );
    return ChatInvites.find({
      inviter: Meteor.user().username
    });
  },

  'conversationsIwasInvited': function() {
    return ChatInvites.find({
      invited: Meteor.user().username
    });
  }
});


Template.dashBoard.events({
  'click #delete': function() {
    event.preventDefault();
    var id = this._id;
    Meteor.call('remove', id);
  }
});
