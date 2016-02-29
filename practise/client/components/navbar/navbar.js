Template.header.onRendered(function() {

  this.autorun(function(){
    var subs = Meteor.subscribe("notification");
      Tracker.afterFlush(function() {

        $('.dropdown-button').dropdown({
          hover: true,
          belowOrigin: true
        });
      });
  })

 });


Template.header.helpers({
  me: function() {
    return Meteor.users.findOne({
      _id: Meteor.userId()
    });
  },

  counter: function() {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false}).count();
  },

  requestFromMe: function() {
    // if (true) {}; put both in one place
    return Meteor.requests.find({
      requesterId: Meteor.userId()
    });
  },

  requestFromPeople: function() {
    return Meteor.requests.find({
      userId: Meteor.userId()
    });
  },

  youAreInvited: function() {
    var currentUsersName = Meteor.user().username;
    return ChatInvites.find({
      'invited': currentUsersName
    });

  },

  ihaveInvited: function() {
    var currentUsersName = Meteor.user().username;
    return ChatInvites.find({
      'inviter': currentUsersName
    });

  }
});

Template.header.events({

  'click [name=logout]': function() {
    event.preventDefault();
    Meteor.logout();
    Router.go("home");
  },

  'click [name=photoSent]': function() {
    event.preventDefault();
    Meteor.call("clearNotification")

  },

  'click [name=viewRouteAsk]': function() {
    event.preventDefault();
    console.log("works");
  },


  'click [name=chatRoute]': function() {
    event.preventDefault();
    var paidUser = Paid.findOne({user:Meteor.userId()});
    if(paidUser){
      Router.go("chat");
    }else{
      Router.go("payment");
    }
  }

});
