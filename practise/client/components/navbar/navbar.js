Template.header.onRendered(function() {

  this.autorun(function(){
    var notification = Meteor.subscribe("notification");
    var Payment =   Meteor.subscribe("payment");
    var reqest = Meteor.subscribe("request");
    var chatInvites = Meteor.subscribe("chatInvites");

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

  photoCounter: function() {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"photo"}).count();
  },

  chatCounter: function() {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"chat"}).count();
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
    Meteor.call("clearPhotoNotification")
  },

  'click [name=chatReceived]': function() {
    event.preventDefault();
    Meteor.call("clearChatNotification")
  },

  'click [name=chatRoute]': function() {
    event.preventDefault();
    var paidUser = Payment.findOne({
      createdBy:Meteor.userId(),  "paid":true
      });
    if(paidUser){
      Router.go("chat");
    }else{
      Router.go("payment");
    }
  }

});
