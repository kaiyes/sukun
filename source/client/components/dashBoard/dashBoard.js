
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

  'favourite': function() {
    Meteor.subscribe("fav");
    return Favourite.find({
        whosFav: Meteor.userId()
     });
  },

  myProfile: function() {
    Meteor.subscribe('biye',Meteor.userId());
    return Biye.findOne({createdBy: Meteor.userId()});
  }

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
  },

  'click #deleteFav': function() {
    event.preventDefault();
    var id = this._id;
    Meteor.call('removeFavourite', id);
  }


});
