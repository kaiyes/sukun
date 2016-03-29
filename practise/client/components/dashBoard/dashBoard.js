
Template.dashBoard.onRendered(function(){
  $(document).ready(function(){
      $('ul.tabs').tabs();
    });

});


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
  },

  'requestFromMe': function() {
    return Meteor.requests.find({
      requesterId: Meteor.userId()
    });
  },

  'requestFromPeople': function() {
    return Meteor.requests.find({
      userId: Meteor.userId()
    });
  },

  'friends': function() {
    return Meteor.user().friendsAsUsers()
  },

  'revokedNotify': function() {
    Meteor.subscribe("revokeNotification", Meteor.user().username );
    return Notification.find({
      invited: Meteor.user().username,
      seen:true,
      action:"revoke"
     });
  },

  'favourite': function() {
    Meteor.subscribe("fav");
    return Favourite.find({
        whosFav: Meteor.userId()
     });
  },


});


Template.dashBoard.events({
  'click #delete': function() {
    event.preventDefault();
    var id = this._id;
    Meteor.call('remove', id);
  },

  'click #deleteRevoke': function() {
    event.preventDefault();
    var id = this._id;
    Meteor.call('removeRevoke', id);
  }



});
