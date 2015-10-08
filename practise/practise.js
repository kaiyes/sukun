Biye = new Meteor.Collection ('biye');
ChatRooms = new Meteor.Collection("chatrooms");

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
      path:'/list/:_id',
  data: function(){
    return Biye.findOne({_id: this.params._id});
    
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
            name:name
          }; 
         Accounts.createUser({            
               email: email,
               password: password,
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
         if (gen==="male") {
          //console.log("female ");
          return Biye.find({gender: "Female"});
         } else{
             //console.log("male ");
             return Biye.find({gender: "Male"});
            
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


Biye.attachSchema(new SimpleSchema({
  
  // userName: {
  //     type: String      
  // },

  gender: {
     type: String,
     allowedValues: ['Male', 'Female']
  },

  

  image: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'cloudinary'
      }
    }
  }

}));


AutoForm.addHooks('details',{

      onSuccess:function(){
         Router.go("/list");
      }


});



// .....................Show details page.............


   Template.show.events({
       'click [name=logout]': function () {
         event.preventDefault();
         Meteor.logout();
         Router.go("home");
       }
     });

// .....................Chat .............


Template.sidebar.helpers({
    'onlusr':function(){
        return Meteor.users.find({_id:{$ne:Meteor.userId()}});
    }
});

Template.sidebar.events({
    'click [name=user]':function(){
        Session.set('currentId',this._id);
        var get = Session.get('currentId');
        var res=ChatRooms.findOne({chatIds:{$all:[this._id,Meteor.userId()]}});
        if(res)
        {
            //already room exists
            Session.set(  "roomid",res._id);
        }
        else{
            //no room exists
            var newRoom= ChatRooms.insert({chatIds:[this._id , Meteor.userId()],messages:[]});
            Session.set('roomid',newRoom);
        }

    }
});

Template.messages.helpers({
    'msgs':function(){
        var result=ChatRooms.findOne({_id:Session.get('roomid')});
        
       return result.messages;
    }
});

Template.input.events({
  'keyup [name=message]' : function (event) {
    if (event.which == 13) { 
       if (Meteor.user()) {
          var name = Meteor.user().profile.name;
          var message =  $('[name="message"]').val();

              if(message !== ''){ 
                ChatRooms.update({"_id":Session.get("roomid")},
                  {$push:
                    {messages:{name: name,text: message,createdAt: Date.now()}
                  }
                });    
                $('[name="message"]').val('');    
              } //if message
        } // if user
    } // if enter
  } //keyup
});
        

}   // meteor is client ...............................

if(Meteor.isServer){
  

}


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
