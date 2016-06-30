Template.adminChat.onRendered(function () {

   this.autorun(function(){

     Meteor.subscribe('allConversations');
     Meteor.subscribe("adminNotification");
   })
});

 Template.adminSidebar.helpers({
    'allConversations': function() {
      return Meteor.conversations.find({});
    },

    chatCounter: function() {
      return AdminNotification.find({
        convoId: this._id,
        seen:false, type:"chat"}).count();
    },
  });

  Template.adminSidebar.events({
    'click [name=user]': function() {
      Session.set("id", this._id);
      var convoId = this._id;
      Meteor.call("clearAdminNotification",convoId);
    },

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
