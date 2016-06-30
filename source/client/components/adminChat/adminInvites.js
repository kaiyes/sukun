Template.adminInvites.onRendered(function () {
   Meteor.subscribe('allConversations');
});

 Template.adminSideBarInvites.helpers({
    'allConversations': function() {
      return ChatInvites.find({admin:"admin"});
    },
  });

  Template.adminSideBarInvites.events({
    'click [name=user]': function() {
      Session.set("id", this._id);
    }
  });


  Template.adminInvitesMessages.helpers({
    'displayMessages': function() {
      var conversationId = Session.get("id");
      Meteor.subscribe("messages",conversationId);
      Meteor.subscribe('participants',conversationId);
      Meteor.subscribe('allUsers');


      return Meteor.messages.find({
        conversationId:conversationId
      });
    }
  });

  Template.adminInputInvites.events({
    'keyup [name=message]': function(event) {
        if (event.which == 13) {
          var conversationId = Session.get("id");
          var conversation = Meteor.conversations.findOne({
            _id: conversationId
          });
          var text = $('[name="message"]').val();
          if (text !== '') {
            conversation.sendMessage(text);
          } //if message
          $('[name="message"]').val('');
        } // if event
      } // if keyup

      /*var user = Meteor.participants.find({
        conversationId:conversationId,
        userId:{$ne:Meteor.userId()}
      });

      var unread = user.read;
      var admin = Meteor.users.find({username:"admin"});
      var users = {
        invited:user.user().username,
        inviter: Meteor.user().username,
        admin:admin.username,
        seen:false,
        type:"chat"
      };

      if(unread===false){
        console.log(unread);
        Meteor.call('insertNotification',users);
      }*/
  });
