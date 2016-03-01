Template.show.helpers({
  detailsDb: function() {
    var user = Meteor.users.findOne({
      username: Router.current().params.username})._id;
    return Biye.findOne({createdBy: user});
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
      seen:false
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
    request && request.cancel();
  },

  'click  [name=end-friendship]': function() {
    this.unfriend();
  },

  'click  [name=accept]': function() {
    var user = Meteor.users.findOne({
    username: Router.current().params.username})._id;

    var request = Meteor.requests.findOne({
      userId: Meteor.userId(),
      requesterId: user
    });
    request && request.accept();
  },


  'click  [name=deny]': function() {
    var request = Meteor.requests.findOne({
      requesterId: Meteor.userId(),
      userId: this._id
    });
    request && request.deny();
  },

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
              invited: user.username,
              inviter: currentuser.username,
              convoId: conversation._id
            };
            Meteor.call("startChat", chatId);
            conversation.addParticipant(user);
            conversation.sendMessage("hi");
            console.log("message sent");
            Router.go('/chat');
          } else {
            console.log("link exists, hide button");
            event.preventDefault();
            $('[name=chat]').hide();
            Router.go('/chat');
          }; /*else ends here*/
      }else{
         Router.go('/payment');
      };
   }
});
