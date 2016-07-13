
Template.adminApproved.helpers({
  user: function () {
    var id = Session.get('id');
    var username = Meteor.users.findOne({_id: id }).username;
    return username;
  },

  approvedMale: function () {
    Meteor.subscribe('find', "male");
    return Meteor.users.find({
      "profile.gender": "male",
      "profile.approved":true,
      "profile.banned":false,
      "profile.hasDb":true,
     },{ sort: { createdAt: -1 }});
  },

  approvedFemale: function () {
    Meteor.subscribe('find', "female");
    return Meteor.users.find({
      "profile.gender": "female",
      "profile.approved":true,
      "profile.banned":false,
      "profile.hasDb":true,
    },{ sort: { createdAt: -1 }});
  },

  approvedCv: function () {
   var id = Session.get('id');
   Meteor.subscribe('biyeForAdmin');
   var user = Meteor.users.findOne({_id: id });
     if (user.profile.approved === true) {
      return Biye.findOne({ createdBy: id });
     } else {
       console.log("user is not approved");
     }
  },

});

Template.adminApproved.events({
  "click [name=user]": function(){
    Session.set('id', this._id );
  },
  "click [name=approve]": function(){
    var id = Session.get('id');
    Meteor.call("disApprove", id);
  },
  "click [name=ban]": function(){
    var id = Session.get('id');
    Meteor.call("ban", id);
  },
});
