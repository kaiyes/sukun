Template.details.onRendered(function() {
 $('select').material_select();
  this.autorun(function() {
  var check = Meteor.user().profile.hasDb;
   if (check) {
     console.log("আছে");
     $('button[type="submit"]').hide();
     Router.go('/list');
   } else {
     console.log("নাই");
   }
 })
});


Template.updateDetails.helpers({
   updateProfile: function(){
     Meteor.subscribe('biye',Meteor.userId());
     return Biye.findOne({createdBy: Meteor.userId()});
  }
});

Template.details.events({

   'submit form': function() {
      event.preventDefault();
      var name = event.target.name.value;
      var gender = event.target.gender.value;
      var height = event.target.height.value;
      var profession = event.target.profession.value;
      var education = event.target.education.value;
      var prayer = event.target.prayer.value;
      var practising = event.target.practising.value;
      var beard = event.target.beard.value;
      var hijab = event.target.hijab.value;
      var aboutMe = event.target.aboutMe.value;

      profile = {
        // hasDb:false,
        // approved:false,
        // banned:false,
        name, gender,height, profession, education, prayer, practising, beard, hijab,aboutMe
      };

      console.log(profile);

    },
});
