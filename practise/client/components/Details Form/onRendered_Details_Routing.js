Template.details.onRendered(function() {

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
