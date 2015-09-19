Biye = new Meteor.Collection ('biye');

Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images")]
});

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
Router.route('/upload');
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
         profile = {
            gender: gender
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

  age: {
      type: Number,
      max: 60      
  },

  profession: {
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
     allowedValues: ['Phd','Masters','Honours','Diploma','HSC','SSC']
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
  }
  
}));

  

AutoForm.addHooks('details',{

      onSuccess:function(){
         Router.go("/upload");
      }


});



// .....................upload images.............

Template.upload.events({
  'change #exampleInput':function(event, template){  
    var file = $('#exampleInput').get(0).files[0]; 
    fsFile = new FS.File(file);
   
    fsFile.metadata = {ownerId:Meteor.userId()}
    Images.insert(fsFile,function(err,result){
      if(!err){
        console.log(result)
      }
    })
  }

});


// .....................profile pic.............


Template.profile.helpers({
    profilePic: function () {
      return Images.find({'metadata.ownerId':Meteor.userId()});
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

}

if(Meteor.isServer){
  
}
