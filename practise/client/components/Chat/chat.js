Template.messages.onRendered(function () {

    this.autorun(function () {
      var conversationId = Session.get('convoId');

         Tracker.afterFlush(function() {
           $('#chatWrapper').slimScroll({
            height: '400px',
            width: '1000px',
            railVisible: true,
            alwaysVisible: true,
            //start: 'bottom',
            size: '20px',
            wheelStep: 70,
          //  scrollTo: "110px",
         });
      });
   });
});

Template.messages.onCreated(function () {

    this.autorun(function () {
      var conversationId = Session.get('convoId');
         Tracker.afterFlush(function() {
           $('.slimScrollBar').scrollTop((350));
      });
   });
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
      return Meteor.conversations.findOne({
        _id: conversationId
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
