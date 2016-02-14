Biye = new Meteor.Collection('biye');
ChatRooms = new Meteor.Collection("chatrooms");
ChatInvites = new Meteor.Collection('invites');
WantToPay = new Meteor.Collection("wantopay");
Paid = new Meteor.Collection("paid");
Notification = new Meteor.Collection("notification");




if (Meteor.isClient) {

  // ........................ Email Link Verify.............................
  Template.home.onCreated(function() {
      if (Accounts._verifyEmailToken) {
        Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
          if (err != null) {
            if (err.message = 'Verify email link expired [403]') {
              console.log('Sorry this verification link has expired.')
            }
          } else {
            console.log('Thank you! Your email address has been confirmed.')
          }
        });
      }
    });

  // ........................Routing.............................
  Router.route('/', {
    name: 'home',
    template: "home"
  });

  Router.route('/register');
  Router.route('/login');
  Router.route('/payment');
  Router.route('/admin');
  Router.route('/details',{
    onBeforeAction: function() {
      var verify = Meteor.user().emails[0].verified;
         if(!verify){
           Router.go('verifyEmail');
         }else{
           this.next();
         }
      }
    });
  Router.route('/verifyEmail');

  Router.route('/list', {
    onBeforeAction: function() {
      if (!Biye.findOne({createdBy: Meteor.userId()})) {
        Router.go("details");
      } else {
        this.next();
      }
    }
  });



  Router.route('/chat');

  Router.route('show', {
    path: '/list/:username',
    data: function() {
      return Meteor.users.findOne({
        username: this.params.username
      });
    }
  });

  AutoForm.setDefaultTemplate('materialize');

  // ........................register.............................

  Template.register.events({
    'submit form': function() {
      event.preventDefault();
      var email = event.target.email.value;
      var password = event.target.password.value;
      var gender = event.target.sex.value;
      var name = event.target.username.value;
      profile = {
        gender: gender,
        hasDb:false
      };
      Accounts.createUser({
          email: email,
          password: password,
          username: name,
          profile: profile
        },
        function(error) {
          if (error) {
            console.log(error.reason);
          } else {
            Router.go('details');
          }
        });

      $('[name = password]').val('');
      $('[name = email]').val('');
    },

  });


  // ........................login.............................

  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();
      var email = event.target.email.value;
      var password = event.target.password.value;

      Meteor.loginWithPassword(email, password,
        function(error) {

          if (error) {
            console.log(error.reason);
          } else {
            Router.go('list');
          };
        });
      $('[name="listName"]').val('');
      $('[name = password]').val('');
    }

  });



  // .......................List....................


  Template.list.helpers({

    "people": function() {
      var gen = Meteor.user().profile.gender;
      var males = Meteor.users.find({"profile.gender": "male", "profile.hasDb":true});
      var females = Meteor.users.find({"profile.gender": "female", "profile.hasDb":true});
      var ifHasDb = Biye.findOne({createdBy: Meteor.userId()});

        if (gen === "male") {
          return females;
         } else {
          return males;
        };
    }
  });

  // .......................details autoform....................

  Template.details.onRendered(function() {
    this.autorun(function() {
      var exists = Biye.findOne({createdBy: Meteor.userId()});
      if (exists) {
        console.log("আছে");
        $('button[type="submit"]').hide();
        Router.go('/list');
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
    },
    image: {
      type: String,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      }
    },


     /*profession: {
         type: String
     },

     currentResidence: {
         type: String
     },

   originalResidence : {
         type: String
     },

     familyMembers: {
         type: String
     },

     lastOrNextDegree: {
        type: String,
        allowedValues: ['Phd','Doctor','Engineer','Masters','Honours','Diploma','HSC','SSC']
     },

     dateOfBirth: {
        type: Date,
     },

     religiousHistory: {
        type: String,
        allowedValues: ['Started practising 1 or 2 years back',
                         'Been practising for more than 5 years',
                         'Revert Muslim','Have not started practising yet but want too soon',
                         'I have faith in my heart']
     },

     sect: {
        type: String,
        allowedValues: ['Salafi/Ahle Hadeeth', 'Hanafi',
                         'Tablig','Pir','Shia','I do not know']
     },

     prayer: {
        type: String,
        allowedValues: ['Always pray', 'Sometimes miss fajr',
                         'Often pray','Before exam, I pray',
                          'Eid only','Jumuah Only',
                          'Will start praying very soon']
     },

     maritalStatus: {
        type: String,
        allowedValues: ['Never Married', 'Annulled (Khula)',
                       'Divorced','widowed','Married']
     },

     numberOfChildren: {
        type: Number
     },

     Hijab: {
        type: String,
        allowedValues: ['Always With Burkha/Abaya face open',
                        'Always with Burkha/Abaya with Niqab',
                        'Always with Scraf only',
                      'I dress modestly but not Burkha/Abaya/niqab',
                        'I dress modestly but Sometimes I wear Hijab',
                        '(Male only) Shirt,trousers,casual clothing',
                        '(Male only) Panjabi','(Male only) Jobba']
     },

     height: {
        type: String
     },

     beard:{
       type: String,

       allowedValues: ['I have let my beard grow','I trim my beard',
                       'No beaerd, shaved, will not keep beard',
                       'No beaerd, shaved, will keep beard in future',
                       'I am a woman, I CAN NOT HAVE BEARD you silly']
     }*/


  }));


  AutoForm.addHooks('details', {
    onSuccess: function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.hasDb": true}});
      Router.go("/list");
    }
  });


  // .....................Show page.....................

  Template.show.helpers({
    detailsDb: function() {
      var user = Meteor.users.findOne({
        username: Router.current().params.username})._id;
      return Biye.findOne({createdBy: user});
    }

  });


  Template.show.events({

    'click  [name=add-friend]': function() {
      var paidUser = Paid.findOne({user:Meteor.userId()});
      var currentuser = Meteor.user();
      var user = Meteor.users.findOne({
      username: Router.current().params.username});

        if(paidUser){
          this.requestFriendship();
          Notification.insert({
            invited: user.username,
            inviter: currentuser.username,
            seen: false
          });
        }else{
          Router.go('/payment');
        };
    },

    'click  [name=cancel-request]': function() {
      var request = Meteor.requests.findOne({
        requesterId: Meteor.userId(),
        userId: this._id
      });
      request && request.cancel();
    },

    'click  [name=end-friendship]': function() {
      this.unfriend();
    },

    'click  [name=accept]': function() {
      var request = Meteor.requests.findOne({

        userId: Meteor.userId(),
        requesterId: this._id
      });
      request && request.accept();
    },


    'click  [name=deny]': function() {
      var request = Meteor.requests.findOne({
        requesterId: Meteor.userId(),
        userId: this._id
      });
      request && request.deny();
    },

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

      var paidUser = Paid.findOne({user:Meteor.userId()});

        if(paidUser){

            if (!linkExists) {
              console.log("no link, sends the message");
              var conversation = new Conversation().save();
              ChatInvites.insert({
                invited: user.username,
                inviter: currentuser.username,
                convoId: conversation._id,
              });

              conversation.addParticipant(user);
              conversation.sendMessage("hi");
              console.log("message sent");
              Router.go('/chat');

            } else {
              console.log("link exists, hides button");
              event.preventDefault();
              $('[name=chat]').hide();
              Router.go('/chat');
            }; /*else ends here*/

        }else{
           Router.go('/payment');
        };
     }
  });

  // .....................header template.............

  Template.header.helpers({
    me: function() {
      return Meteor.users.findOne({
        _id: Meteor.userId()
      });
    },

    counter: function() {
      return Notification.find({
        invited: Meteor.user().username,
        seen:false}).count();
    },

    requestFromMe: function() {
      // if (true) {}; put both in one place
      return Meteor.requests.find({
        requesterId: Meteor.userId()
      });
    },

    requestFromPeople: function() {
      return Meteor.requests.find({
        userId: Meteor.userId()
      });
    },

    youAreInvited: function() {
      var currentUsersName = Meteor.user().username;
      return ChatInvites.find({
        'invited': currentUsersName
      });

    },

    ihaveInvited: function() {
      var currentUsersName = Meteor.user().username;
      return ChatInvites.find({
        'inviter': currentUsersName
      });

    }
  });

  Template.header.events({

    'click [name=logout]': function() {
      event.preventDefault();
      Meteor.logout();
      Router.go("home");
    },

    'click [name=photoSent]': function() {
      event.preventDefault();
      Meteor.call("clearNotification")

    },

    'click [name=viewRouteAsk]': function() {
      event.preventDefault();
      console.log("works");
    },


    'click [name=chatRoute]': function() {
      event.preventDefault();
      var paidUser = Paid.findOne({user:Meteor.userId()});
      if(paidUser){
        Router.go("chat");
      }else{
        Router.go("payment");
      }
    }

  });

  /*................. payment template..........................*/

  WantToPay.attachSchema(new SimpleSchema({

    bikash: {
      type: Number,
      max: 999999999999999
    },

    createdBy: {
      type: String,
      autoValue: function() {
        if (this.isInsert) {
          console.log( "paid" );
          return this.userId;
        } else {
          console.log("no payment entered");;
        }
      }
    }
  }));

  AutoForm.addHooks('payment', {
    onSuccess: function() {
      Router.go("/list");
    }
  });


// .....................admin template............

  Template.admin.helpers({
    wantsToPay: function() {
    return WantToPay.find({});
    }
  });

  Template.admin.events({
    'click [name=paid]': function() {
      event.preventDefault();
      Paid.insert({ user:this.createdBy ,paid:true});
      console.log("This one has been made a member and can now access everything");

    }
  });


  // .....................Chat template ...............

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
      console.log("hmmm");

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


} // meteor is client ends...............................

if (Meteor.isServer) {

  Meteor.startup(function() {
    process.env.MAIL_URL =
      "smtp://postmaster%40sandbox815499bd3e1e4adfaf528b8eb7bad856.mailgun.org:87eac37901678ad8baa94d3159cd6ba8@smtp.mailgun.org:587";

    Accounts.config({
      sendVerificationEmail: true
    });

  });


  Meteor.methods({
   clearNotification: function(){
    Notification.update({invited:Meteor.user().username},
    {$set:{seen:true}}, { multi: true });
    console.log("from server yo");
   }
 });
}



    /*'click [name=viewRouteAsked]': function() {
      event.preventDefault();
      var paidUser = Paid.findOne({user:Meteor.userId()});
      if(paidUser){
        var request =  this.username;
        console.log(request);
        //Router.go("chat");
      }else{
        //Router.go("payment");
        console.log("message");

      }
    },

    'click [name=viewRouteAsk]': function() {
      event.preventDefault();
      var paidUser = Paid.findOne({user:Meteor.userId()});
      if(paidUser){
        var u =  this.user.username;
        console.log(u);
        //Router.go("chat");
      }else{
        //Router.go("payment");
        console.log("nai");

      }
    }*/
