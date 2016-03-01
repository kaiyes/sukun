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

  Template.sidebar.events({
    'click [name=user]': function() {
      Session.set("convoId", this.convoId);
      console.log(this.convoId);

    }
  });

  Template.messages.helpers({
    'displayMessages': function() {
      var conversationId = Session.get("convoId");
      return Meteor.conversations.findOne({
        _id: conversationId
      });
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
