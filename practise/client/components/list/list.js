Template.list.onRendered(function () {
  this.autorun(function() {
  var check = Meteor.user().profile.gender;
   if (check==="male") {
     Meteor.subscribe('find',"female");
   } else {
      Meteor.subscribe('find',"male");
   }
 })
});

Template.list.helpers({
  "people": function() {

      var gen = Meteor.user().profile.gender;
        if (gen === "male") {

          return Meteor.users.find({
            "profile.gender": "female",
            "profile.hasDb":true});
         } else {

          return Meteor.users.find({
            "profile.gender": "male",
            "profile.hasDb":true});
        }
  }
});
