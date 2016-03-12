
Template.show.helpers({
  detailsDb: function() {
    var userId = Meteor.users.findOne({
      username: Router.current().params.username})._id;
      Meteor.subscribe('biye',userId);
    return Biye.findOne({createdBy: userId});
  }

});


Template.show.events({

  'click  [name=add-friend]': function() {
    event.preventDefault();
   var paidUser = Payment.findOne({
    createdBy:Meteor.userId(),
    "paid":true});

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"add"
    };

      if(paidUser){
        this.requestFriendship();
        Meteor.call('insertNotification', users);
      }else{
        Router.go('/payment');
      };
  },

  'click  [name=cancel-request]': function() {
    var request = Meteor.requests.findOne({
      requesterId: Meteor.userId(),
      userId: this._id
    });

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"cancel"
    };

    Meteor.call('insertNotification', users);
    request && request.cancel();
  },

  'click  [name=end-friendship]': function() {

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"revoke"
    };

    Meteor.call('insertNotification', users);
    this.unfriend();
  },

  'click  [name=accept]': function() {
    var user = Meteor.users.findOne({
    username: Router.current().params.username})._id;

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"accepted"
    };

    var request = Meteor.requests.findOne({
      userId: Meteor.userId(),
      requesterId: user
    });

    Meteor.call('insertNotification', users);
    request && request.accept();

  },


  // 'click  [name=deny]': function() {
  //   var user = Meteor.users.findOne({
  //   username: Router.current().params.username})._id;
  //
  //   var request = Meteor.requests.findOne({
  //     requesterId: user,
  //     userId: Meteor.userId()
  //   });
  //
  //
  //   request && request.deny();
  // },

  'click [name=chat]': function() {
    event.preventDefault();
    var currentuser = Meteor.user();
    var user = Meteor.users.findOne({
      username: Router.current().params.username
    });

    var linkExists = ChatInvites.findOne({
      $or: [{
        invited: user.username,
        inviter: currentuser.username
      }, {
        invited: currentuser.username,
        inviter: user.username
      }]
    });

    var paidUser = Payment.findOne({
      createdBy:Meteor.userId(),"paid":true
    });

    if(paidUser){
         if (!linkExists) {
           console.log("no link, sends the message");
           var conversation = new Conversation().save();

           var chatId = {
             invited: Router.current().params.username,
             inviter: currentuser.username,
             convoId: conversation._id
           };

           var users = {
             invited:Router.current().params.username,
             inviter: currentuser.username,
             seen:false,
             type:"chat"
           };

           Meteor.call("startChat", chatId);
           Meteor.call('insertNotification', users);

           conversation.addParticipant(user);
           conversation.sendMessage("Assalamu Alaikum");
           console.log("message sent");
           Router.go('chat');
         } else {
           console.log("link exists, hide button");
           event.preventDefault();
           $('[name=chat]').hide();
           Router.go('chat');
         }; /*else ends here*/
     }else{
        Router.go('/payment');
     };
  }
});
