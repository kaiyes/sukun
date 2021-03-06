Template.list.helpers({
  people: function() {
      var gen = Meteor.user().profile.gender;
        if (gen === "male") {
          return Meteor.users.find({
            "profile.gender": "female",
            "profile.hasDb":true,
            "profile.approved":true,
            "profile.banned":false,
          },{ sort: { createdAt: -1 }})
         } else {
          return Meteor.users.find({
            "profile.gender": "male",
            "profile.hasDb":true,
            "profile.approved":true,
            "profile.banned":false,
          },{ sort: { createdAt: -1 }});
        }
  },

});
