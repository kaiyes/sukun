Template.dashBoard.helpers({
   whoViewed: function() {
     var username = Meteor.user().username;
     Meteor.subscribe('whoViewed', username);

     return DashBoard.find({
       profileOf: username,
       seen:false,
       type:"profileView"
      });

  }
});
