Template.list.helpers({
  "people": function() {

      var gen = Meteor.user().profile.gender;
        if (gen === "male") {
          return Meteor.users.find({
            "profile.gender": "female",
            "profile.hasDb":true,
             },{sort: {createdAt: -1}}).fetch()
         } else {

          return Meteor.users.find({
            "profile.gender": "male",
            "profile.hasDb":true});
        }
  }
});
