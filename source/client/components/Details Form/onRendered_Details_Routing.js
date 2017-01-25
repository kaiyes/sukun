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
