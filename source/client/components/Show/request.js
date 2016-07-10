Template.show.onRendered(function() {

    var profileOwner = Router.current().params.username;
    var viewer = Meteor.user().username;
    var approved = Meteor.user().profile.approved;
    var paid = Meteor.user().profile.paid;

    var info = {
      profileOf:profileOwner,
      viewer: viewer,
      seen:false,
      type:"profileView"
    };

    Meteor.subscribe('didIview', profileOwner,viewer);
    Meteor.subscribe("fav");
    Meteor.subscribe("admin");

    var exists = DashBoard.findOne({
        profileOf: profileOwner,
        viewer:viewer,
        seen:false,
        type:"profileView"
     });

     if (approved) {
       if (exists) {
           console.log("exists");
       } else {
           Meteor.call('dashBoard', info);
       }
     } else {
       console.log("not approved,skipping notification");
     }



});


Template.show.helpers({
  detailsDb: function() {
    var userId = Meteor.users.findOne({
      username: Router.current().params.username})._id;
      Meteor.subscribe('biye',userId);
    return Biye.findOne({createdBy: userId});
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
      seen:false,
      type:"photo",
      action:"add"
    };

      /*if(paidUser){*/
        this.requestFriendship();
        Meteor.call('insertNotification', users);
      /*}else{
        Router.go('/payment');
      };*/
  },

  'click  [name=cancel-request]': function() {
    var request = Meteor.requests.findOne({
      requesterId: Meteor.userId(),
      userId: this._id
    });

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"cancel"
    };

    Meteor.call('insertNotification', users);
    request && request.cancel();
  },

  'click  [name=end-friendship]': function() {

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"revoke"
    };

    Meteor.call('insertNotification', users);
    this.unfriend();
  },

  'click  [name=accept]': function() {
    var user = Meteor.users.findOne({
    username: Router.current().params.username})._id;

    var users = {
      invited:Router.current().params.username,
      inviter: Meteor.user().username,
      seen:false,
      type:"photo",
      action:"accepted"
    };

    var request = Meteor.requests.findOne({
      userId: Meteor.userId(),
      requesterId: user
    });

    var paidUser = Payment.findOne({
     createdBy:Meteor.userId(),
     "paid":true});

   /*if(paidUser){*/
     Meteor.call('insertNotification', users);
     request && request.accept();
   /*}else{
     Router.go('/payment');
   };*/
  },


  // 'click  [name=deny]': function() {
  //   var user = Meteor.users.findOne({
  //   username: Router.current().params.username})._id;
  //
  //   var request = Meteor.requests.findOne({
  //     requesterId: user,
  //     userId: Meteor.userId()
  //   });
  //
  //
  //   request && request.deny();
  // },

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

    /*if(paidUser){*/
         if (!linkExists) {
           console.log("no link, sends the message");
           var conversation = new Conversation().save();
           var admin = Meteor.users.findOne({username:"admin"});
           var chatId = {
             invited: Router.current().params.username,
             inviter: currentuser.username,
             convoId: conversation._id
           };
           var users = {
             invited:Router.current().params.username,
             inviter: currentuser.username,
             seen:false,
             convoId:conversation._id,
             type:"chat"
           };

           var adminInfo = {
             invited:user.username,
             inviter: Meteor.user().username,
             convoId:conversation._id,
             seen:false,
             type:"chat"
           }

           Meteor.call("startChat", chatId);

           conversation.addParticipant(user);
           conversation.addParticipant(admin);

           Meteor.call('insertNotification', users);
           Meteor.call("insertAdminNotification", adminInfo);

           /*conversation.sendMessage("Assalamu Alaikum");*/
           Router.go('chat');
         } else {
           console.log("link exists, hide button");
           event.preventDefault();
           $('[name=chat]').hide();
           Router.go('chat');
         }; /*else ends here*/
     /*}else{
        Router.go('/payment');
     };*/
  },

  'click #favourite': function() {
    event.preventDefault();
    var info = {
      username: Router.current().params.username,
      whosFav : Meteor.userId()
    }

    var exists = Favourite.findOne({
      username: Router.current().params.username,
      whosFav : Meteor.userId()
      });

      if(!exists){
        Meteor.call('insertFavourite', info);
      }else{
        sweetAlert("subhanallah,I know you like this person. But you can only favourite just once !!")
      }

  }
});
