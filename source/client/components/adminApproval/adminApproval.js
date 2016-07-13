
Template.adminApprove.helpers({

  male: function () {
    Meteor.subscribe('find', "male");
    return Meteor.users.find({
      "profile.gender": "male",
      "profile.hasDb":true,
      "profile.approved":false,
       },{ sort: { createdAt: -1 }})
    },

  female: function () {
    Meteor.subscribe('find', "female");
    return Meteor.users.find({
      "profile.gender": "female",
      "profile.approved":false,
      "profile.hasDb":true },{ sort: { createdAt: -1 }});
  },

  cv: function () {
   var id = Session.get('id');
   Meteor.subscribe('biyeForAdmin');
   var user = Meteor.users.findOne({_id: id });
     if (user.profile.approved === false) {
      return Biye.findOne({ createdBy: id });
     } else {
       console.log("user is already approved");
     }
  },

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
      "profile.hasDb":true },{ sort: { createdAt: -1 }});
  },

  approvedFemale: function () {
    Meteor.subscribe('find', "female");
    return Meteor.users.find({
      "profile.gender": "female",
      "profile.approved":true,
      "profile.hasDb":true },{ sort: { createdAt: -1 }});
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

Template.adminApprove.events({
  "click [name=user]": function(){
    Session.set('id', this._id );
  },
  "click [name=approve]": function(){
    var id = Session.get('id');
    Meteor.call("approve", id, function(error, result){
      if(error){
        console.log("error", error);
      }
      console.log("approved");
    });

  },
  "click [name=ban]": function(){
    console.log("banned");
  },
});
