Biye = new Meteor.Collection ('biye');
ChatRooms = new Meteor.Collection("chatrooms");
ChatInvites = new Meteor.Collection('invites');


if(Meteor.isClient) {

// ........................Routing.............................
Router.route('/', {
  name : 'home',
  template : "home"
});

Router.route('/register');
Router.route('/login');
Router.route('/details');
Router.route('/list');
Router.route('/chat');

Router.route('show',{
      path:'/list/:username',

  data: function(){
  return Meteor.users.findOne({username: this.params.username});
  }

});

AutoForm.setDefaultTemplate('materialize');

// ........................register.............................

      Template.register.events({
       'submit form': function (){
         event.preventDefault();
         var email = event.target.email.value;
         var password = event.target.password.value;
         var gender = event.target.sex.value;
         var name = event.target.username.value;
         profile = {
            gender: gender,

          };
         Accounts.createUser({
               email: email,
               password: password,
               username:name,
               profile: profile
             },
              function(error){
                if (error) {
                  console.log(error.reason);
                } else{
                  Router.go('details');
                }
             });

         $('[name = password]').val('');
         $('[name = email]').val('');
       },

     });


// ........................login.............................

     Template.login.events({
      'submit form': function (event) {
         event.preventDefault();
         var email = event.target.email.value;
         var password = event.target.password.value;

         Meteor.loginWithPassword(email, password,
         function(error){

           if (error) {
             console.log(error.reason);
           } else{
            Router.go('list');
           };
         });
         $('[name="listName"]').val('');
         $('[name = password]').val('');
      }

    });



  // .......................List....................


  Template.list.helpers({

     "people": function(){
      var gen = Meteor.user().profile.gender;
      var males = Meteor.users.find({"profile.gender": "male"});
      var females = Meteor.users.find({"profile.gender": "female"});
         if (gen==="male") {
          return females;
         } else{
          return males;

         };
      }
    });

   Template.list.events({
       'click [name=logout]': function () {
         event.preventDefault();
         Meteor.logout();
         Router.go("home");
       },

       'click [name=chat]': function () {
         event.preventDefault();
         Router.go('/chat');
       }

     });


// .......................details autoform....................

Template.details.onRendered(function () {
  this.autorun(function () {
    var exists = Biye.findOne({createdBy:Meteor.userId()});
    if (exists) {
      console.log("আছে");
      $('button[type="submit"]').hide();

    } else {
      console.log("নাই");
    }
  });
});


Biye.attachSchema(new SimpleSchema({

  age: {
      type: Number,
      max: 60
  },

  createdBy: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
      	console.log("id inserted :  " + this.userId);
        return this.userId;
      } else {
        console.log("no userId entered");;
      }
    }
   }


  // image: {
  //   type: String,
  //   autoform: {
  //     afFieldInput: {
  //       type: 'cloudinary'
  //     }
  //   }
  // }

}));


AutoForm.addHooks('details',{
      onSuccess:function(){
         Router.go("/list");
      }
});


// .....................Show page.....................

   Template.show.helpers({
     detailsDb: function () {
        var user = Meteor.users.findOne({
        username:Router.current().params.username})._id;
        return Biye.findOne({createdBy:user});
     }

   });


   Template.show.events({

      'click  [name=add-friend]': function () {
         this.requestFriendship();
        },

      'click  [name=cancel-request]': function () {
          var request = Meteor.requests.findOne({
           requesterId:Meteor.userId(),
           userId:this._id
           });
          request && request.cancel();
       },

       'click  [name=end-friendship]': function () {
          this.unfriend();
         },

        'click  [name=accept]': function () {
            var request = Meteor.requests.findOne({

             userId:Meteor.userId(),
             requesterId:this._id
             });
            request && request.accept();
         },


       'click  [name=deny]': function () {
           var request = Meteor.requests.findOne({
            requesterId:Meteor.userId(),
            userId:this._id
            });
           request && request.deny();
        },

        'click [name=chat]': function () {
          event.preventDefault();
          var currentuser = Meteor.user();
          var user = Meteor.users.findOne({
          username:Router.current().params.username});
          var conversation = new Conversation().save();

          var linkExists = ChatInvites.findOne({ $or:
            [{invited:user.username, inviter:currentuser.username},
            {invited:currentuser.username, inviter:user.username}]
           });

          if(linkExists){
            console.log("link exists, hides button");
            $('[name=chat]').hide();
          }else{
            console.log("no link, sends the message");
            ChatInvites.insert({
              invited: user.username,
              inviter: currentuser.username,
              convoId:conversation._id,
            });

            conversation.addParticipant(user);
            conversation.sendMessage("hi");
            console.log("message sent");

          };/*else ends here*/
        },

     /*............send messages................. */

        'keyup [name=formArea]' : function (event) {
          if (event.which == 13) {

        var userId = Meteor.users.findOne({
        username:Router.current().params.username})._id;
        var text =  $('[name="formArea"]').val();

          Meteor.user().findExistingConversationWithUsers([userId],
          function(error, result){
            if(result){
             var convoId = result;
             var conversation =
               Meteor.conversations.findOne({id:convoId});
                if(text !== ''){
                conversation.sendMessage(text);
               }//if message
             }
            });

          $('[name="formArea"]').val('');
        } // if enter
      }, //keyup

    /*..............send messages.............. */

       'click [name=logout]': function () {
         event.preventDefault();
         Meteor.logout();
         Router.go("home");
       }
     });
 /*................. show page ends here...........................*/




// .....................header template.............

Template.header.onRendered(function(){
  this.$(".dropdown-button").dropdown({
    hover: true ,
    belowOrigin: true // Displays dropdown below the button
  });
});


 Template.header.helpers({
   me: function () {
    return  Meteor.users.findOne({_id:Meteor.userId()});
   },

  requestFromMe: function () {
    // if (true) {}; put both in one place
    return  Meteor.requests.find({requesterId:Meteor.userId()});
   },

   requestFromPeople : function () {
   return  Meteor.requests.find({userId:Meteor.userId()});
   },

  youAreInvited : function () {
   var currentUsersName =  Meteor.user().username;
   return ChatInvites.find({'invited':currentUsersName});

    },

  ihaveInvited: function () {
   var currentUsersName =  Meteor.user().username;
   return ChatInvites.find({'inviter':currentUsersName});

}
 });

 Template.header.events({

    'click [name=logout]': function () {
         event.preventDefault();
         Meteor.logout();
         Router.go("home");
    }

  });

// .....................Chat template ...............

Template.sidebar.helpers({
    'conversationsIstarted':function(){
        return ChatInvites.find({inviter: Meteor.user().username});
    },

    'conversationsIwasInvited': function(){
        return ChatInvites.find({invited: Meteor.user().username});
    }

});

Template.sidebar.events({
    'click [name=user]':function(){
      Session.set("convoId",this.convoId);
    }
});

Template.messages.helpers({
    'displayMessages':function(){
    var conversationId= Session.get("convoId");
    return Meteor.conversations.findOne({_id:conversationId});
    }
});

Template.input.events({
  'keyup [name=message]' : function (event) {
    if (event.which == 13) {
      var conversationId= Session.get("convoId");
      var conversation = Meteor.conversations.findOne({_id:conversationId});
      var text =  $('[name="message"]').val();
       if(text !== ''){
        conversation.sendMessage(text);
        }//if message
      $('[name="message"]').val('');
    } // if event
  } // if keyup
});


}   // meteor is client ends...............................

if(Meteor.isServer){


}


// userName: {
  //     type: String
  // },

// gender: {
//    type: String,
//    allowedValues: ['Male', 'Female']
// },

// age: {
  //     type: Number,
  //     max: 60
  // },

  // profession: {
  //     type: String
  // },

  // currentResidence: {
  //     type: String
  // },

  // originalResidence : {
  //     type: String
  // },

  // familyMembers: {
  //     type: String
  // },

  // lastOrNextDegree: {
  //    type: String,
  //    allowedValues: ['Phd','Doctor','Engineer','Masters','Honours','Diploma','HSC','SSC']
  // },

  // dateOfBirth: {
  //    type: Date,
  // },

  // religiousHistory: {
  //    type: String,
  //    allowedValues: ['Started practising 1 or 2 years back',
  //                     'Been practising for more than 5 years',
  //                     'Revert Muslim','Have not started practising yet but want too soon',
  //                     'I have faith in my heart']
  // },

  // sect: {
  //    type: String,
  //    allowedValues: ['Salafi/Ahle Hadeeth', 'Hanafi',
  //                     'Tablig','Pir','Shia','I do not know']
  // },

  // prayer: {
  //    type: String,
  //    allowedValues: ['Always pray', 'Sometimes miss fajr',
  //                     'Often pray','Before exam, I pray',
  //                      'Eid only','Jumuah Only',
  //                      'Will start praying very soon']
  // },

  // maritalStatus: {
  //    type: String,
  //    allowedValues: ['Never Married', 'Annulled (Khula)',
  //                   'Divorced','widowed','Married']
  // },

  // numberOfChildren: {
  //    type: Number
  // },

  // Hijab: {
  //    type: String,
  //    allowedValues: ['Always With Burkha/Abaya face open',
  //                    'Always with Burkha/Abaya with Niqab',
  //                    'Always with Scraf only',
  //                    'I dress modestly but not Burkha/Abaya/niqab',
  //                    'I dress modestly but Sometimes I wear Hijab',
  //                    '(Male only) Shirt,trousers,casual clothing',
  //                    '(Male only) Panjabi','(Male only) Jobba']
  // },

  // height: {
  //    type: String
  // },

  // beard:{
  //   type: String,

  //   allowedValues: ['I have let my beard grow','I trim my beard',
  //                   'No beaerd, shaved, will not keep beard',
  //                   'No beaerd, shaved, will keep beard in future',
  //                   'I am a woman, I CAN NOT HAVE BEARD you silly']
  // },
