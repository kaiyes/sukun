Template.chat.onRendered(function() {
  sweetAlert(" Fear Allah and keep the chatting to minimum.click username in the left column to view the messages");
});



 Template.chat.helpers({
    conversationsIstarted: function() {
      var user = Meteor.user().username;
      Meteor.subscribe("conversation");
      return ChatInvites.find({
        inviter: Meteor.user().username
      });
    },

    conversationsIwasInvited: function() {
      return ChatInvites.find({
        invited: Meteor.user().username
      });
    },

    displayMessages: function() {
      var convoId = Session.get("convoId");
      var conversationId = convoId.toString();
      Meteor.subscribe("messages",conversationId);
      Meteor.subscribe('participants',conversationId);
      Meteor.subscribe("admin");

      return Meteor.messages.find({
        conversationId:conversationId
      });
    },

    messageClass: function(gender){
       var user = this.user();
       if (user.username === "admin") {
         return "adminMessage";
       } else{
         if (user.profile.gender === "male") {
            return "maleMessage";
          } else {
            return "femaleMessage";
          }
        }
     },
    });



  Template.chat.events({
    'click [name=user]': function() {
      Session.set("convoId", this.convoId);
      console.log(this.convoId);
    },

    'click #delete': function() {
      var chat = ChatInvites.findOne({
        _id:this._id
      });
      Meteor.call("deleteChat",chat.convoId );
      console.log(chat._id);

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
            conversationId: conversationId,
            userId: { $nin: [ Meteor.userId() , "6BD5M2JDT5jHXhYPY" ] }
          });


          var unread = user.read;
          var users = {
            invited:user.user().username,
            inviter: Meteor.user().username,
            seen:false,
            convoId:conversationId,
            type:"chat"
          };

          var adminInfo = {
            invited:user.user().username,
            inviter: Meteor.user().username,
            convoId:conversationId,
            seen:false,
            type:"chat"
          }

          if(unread===false){
            console.log(unread);
            Meteor.call('insertNotification',users);
            Meteor.call('insertAdminNotification',adminInfo);
          }
  // code for unread messaging notification

        } // if event
      } // if keyup
  });
