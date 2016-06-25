Template.chat.onRendered(function() {
    sweetAlert(" Fear Allah and keep the chatting to minimum.click username in the left column to view the messages");
});



 Template.chat.helpers({
    'conversationsIstarted': function() {
      var user = Meteor.user().username;
      Meteor.subscribe("conversation");
      return ChatInvites.find({
        inviter: Meteor.user().username
      });
    },

    'conversationsIwasInvited': function() {
      return ChatInvites.find({
        invited: Meteor.user().username
      });
    },

    'displayMessages': function() {
      var convoId = Session.get("convoId");
      var conversationId = convoId.toString();
      Meteor.subscribe("messages",conversationId);
      Meteor.subscribe('participants',conversationId);

      return Meteor.messages.find({
        conversationId:conversationId
      });
    }

  });



  Template.chat.events({
    'click [name=user]': function() {
      Session.set("convoId", this.convoId);
      console.log(this.convoId);
    },

    'keyup [name=message]': function(event) {
        if (event.which == 13) {
          var convoId = Session.get("convoId");
          var conversationId = convoId.toString();
          var conversation = Meteor.conversations.findOne({
            _id: conversationId
          });
          var text = $('[name="message"]').val();
          if (text !== '') {
            conversation.sendMessage(text);
            var scrollHeight = document.body.scrollHeight;
            window.scrollTo(0,scrollHeight);
          } //if message
          $('[name="message"]').val('');

// code for unread messaging notification

          var user = Meteor.participants.findOne({
            conversationId:conversationId,
            userId:{$ne:Meteor.userId()}
          });

          var unread = user.read;
          var users = {
            invited:user.user().username,
            inviter: Meteor.user().username,
            seen:false,
            type:"chat"
          };

          if(unread===false){
            console.log(unread);
            Meteor.call('insertNotification',users);
          }
  // code for unread messaging notification

        } // if event
      } // if keyup
  });
