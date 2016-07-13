Template.adminBan.helpers({

  male: function () {
    Meteor.subscribe('find', "male");
    return Meteor.users.find({
      "profile.gender": "male",
      "profile.hasDb":true,
      "profile.banned":true,
     },{ sort: { createdAt: -1 }})
    },

  female: function () {
    Meteor.subscribe('find', "female");
    return Meteor.users.find({
      "profile.gender": "female",
      "profile.hasDb":true,
      "profile.banned":true,
    },{ sort: { createdAt: -1 }});
  },

  cv: function () {
   var id = Session.get('id');
   Meteor.subscribe('biyeForAdmin');
   var user = Meteor.users.findOne({_id: id });
   return Biye.findOne({ createdBy: id });
  },

  user: function () {
    var id = Session.get('id');
    var username = Meteor.users.findOne({_id: id }).username;
    return username;
  },

});

Template.adminBan.events({
  "click [name=user]": function(){
    Session.set('id', this._id );
    console.log(this._id);

  },
  "click [name=approve]": function(){
    var id = Session.get('id');
    Meteor.call("approve", id);
  },
  "click [name=unBan]": function(){
    var id = Session.get('id');
    Meteor.call("unBan", id);
  },
});
