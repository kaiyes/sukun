Template.dashBoard.helpers({
   whoViewed: function() {
     var username = Meteor.user().username;
     Meteor.subscribe('dashBoard', username);

     return DashBoard.find({
       profileOf: username,
       type:"profileView",
       seen:true
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
