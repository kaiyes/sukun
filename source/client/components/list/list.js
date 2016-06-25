Template.list.helpers({
  "people": function() {

      var gen = Meteor.user().profile.gender;
        if (gen === "male") {
          return Meteor.users.find({
            "profile.gender": "female",
            "profile.hasDb":true,
             },{sort: {createdAt: 1}})
         } else {

          return Meteor.users.find({
            "profile.gender": "male",
            /*"emails.0.verified": true,*/
            "profile.hasDb":true},{sort: {createdAt: 1}});
        }
  }
});
