
 Template.sidebar.helpers({
    'conversationsIstarted': function() {
      return ChatInvites.find({
        inviter: Meteor.user().username
      });
    },

    'conversationsIwasInvited': function() {
      return ChatInvites.find({
        invited: Meteor.user().username
      });
    }

  });

  Template.messages.helpers({
    'displayMessages': function() {
      var conversationId = Session.get("convoId");
      Meteor.subscribe("messages",conversationId);
      Meteor.subscribe('participants');
      Meteor.subscribe('viewingConversation',conversationId);

      var user = Meteor.participants.findOne({
        conversationId:conversationId,
        userId:{$ne:Meteor.userId()}
      });

      var unread = user.read;
      if(unread==false){
        var users = {
          invited:user.user().username,
          inviter: Meteor.user().username,
          seen:false,
          type:"chat"
        };
        Meteor.call('insertNotification',users);
        console.log("not seeing");
      };

      return Meteor.messages.find({
        conversationId:conversationId
      });
    }
  });

  Template.sidebar.events({
    'click [name=user]': function() {
      Session.set("convoId", this.convoId);
      console.log(this.convoId);
    }
  });

  Template.input.events({
    'keyup [name=message]': function(event) {
        if (event.which == 13) {
          var conversationId = Session.get("convoId");
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
  });
