Template.details.onRendered(function() {
  this.autorun(function() {
    var exists = Meteor.subscribe("checkIfUserHasDb");
    if (exists) {
      console.log("আছে");
      $('button[type="submit"]').hide();
      Router.go('/list');
    } else {
      console.log("নাই");
    }
  });
});
