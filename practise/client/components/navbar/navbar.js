Template.header.onRendered(function() {

  this.autorun(function(){
    var username = Meteor.user().username;
    var gender = Meteor.user().profile.gender;
    var notification = Meteor.subscribe("notification",username);
    var Payment =   Meteor.subscribe("payment");
    var reqest = Meteor.subscribe("request");
    var chatInvites = Meteor.subscribe("chatInvites",username);
    var dashBoard = Meteor.subscribe('whoViewed',username);

    if (gender==="male") {
      Meteor.subscribe('find',"female");
    } else {
       Meteor.subscribe('find',"male");
    };


      Tracker.afterFlush(function() {
        $('.dropdown-button').dropdown({
          hover: true,
          belowOrigin: true
        });
      });
  })

 });


Template.header.helpers({

  photoCounter: function() {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"photo"
      }).count();
  },

  chatCounter: function() {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"chat"}).count();
  },

  requestFromMe: function() {
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
  },

  newMessage: function() {
    var currentUsersName = Meteor.user().username;
    return Notification.find({
      'invited': currentUsersName,
       seen:false, type:"chat"
    });
  },

  accepted:function () {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"photo", action:"accepted"
    });
  },

  cancelled:function () {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"photo", action:"cancel"
    });
  },

  revoked:function () {
    return Notification.find({
      invited: Meteor.user().username,
      seen:false, type:"photo", action:"revoke"
    });
  },

  dashBoardCounter:function () {
    return DashBoard.find({
      profileOf: Meteor.user().username,
      seen:false, type:"profileView"
    }).count();
  },

  dashBoard:function () {
    return DashBoard.find({
      profileOf: Meteor.user().username,
      seen:false, type:"profileView"
    });
  },

});

Template.header.events({

  'click [name=logout]': function() {
    event.preventDefault();
    Meteor.logout();
    Router.go("home");
  },

  'click [name=photoSent]': function() {
    event.preventDefault();
    Meteor.call("clearPhotoNotification");
    Router.go('/photo');
  },

  'click [name=chatReceived]': function() {
    event.preventDefault();
    Meteor.call("clearChatNotification");
    Router.go('/chat');
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
  },

  'click  #dashBoard': function() {
    event.preventDefault();
    Meteor.call("clearDashNotification");
    Router.go('/dashBoard')
  },

});
