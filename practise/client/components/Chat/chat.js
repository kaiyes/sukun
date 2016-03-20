Template.chat.onRendered(function () {
  this.autorun(function() {
  var check = Meteor.user().profile.gender;

   if (check==="male") {
     Meteor.subscribe('find',"female");
   } else {
      Meteor.subscribe('find',"male");
   }
 })
});


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
      Meteor.subscribe('participants',conversationId);
      
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
