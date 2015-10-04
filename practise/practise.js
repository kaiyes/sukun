Biye = new Meteor.Collection ('biye');


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
  
  userName: {
      type: String      
  },

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

}

if(Meteor.isServer){
  
}
