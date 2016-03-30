Template.photo.helpers({

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
    Meteor.subscribe("friends");
    return Meteor.user().friendsAsUsers()
  },

  'theyRevoked': function() {
    Meteor.subscribe("revokeNotification", Meteor.user().username );
    return Notification.find({
      invited: Meteor.user().username,
      seen:true,
      action:"revoke"
     });
  },

  'iRevoked': function() {

    return Notification.find({
      inviter: Meteor.user().username,
      seen:true,
      action:"revoke"
     });
  },

});


Template.photo.events({

  'click #deleteRevoke': function() {
    event.preventDefault();
    var id = this._id;
    Meteor.call('removeRevoke', id);
  }



});
