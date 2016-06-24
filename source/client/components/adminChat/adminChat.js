Template.adminChat.onRendered(function () {
   Meteor.subscribe('allConversations');
});

 Template.adminSidebar.helpers({
    'allConversations': function() {
      return Meteor.conversations.find({});
    },
  });

  Template.adminSidebar.events({
    'click [name=user]': function() {
      Session.set("id", this._id);
    }
  });


  Template.adminMessages.helpers({
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

  Template.adminInput.events({
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
  });
