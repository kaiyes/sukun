
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
   var userId = Session.get('id');
   Meteor.subscribe('biyeForAdmin');
   console.log( userId + " "+"line 23");
   return Biye.findOne({ createdBy: userId });
  }
});

Template.adminApprove.events({
  "click [name=user]": function(){
    Session.set('id', this._id );
  },
});
