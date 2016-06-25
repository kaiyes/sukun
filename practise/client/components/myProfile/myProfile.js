
Template.myProfile.helpers({
  myProfile: function() {
    Meteor.subscribe('biye',Meteor.userId());
    return Biye.findOne({createdBy: Meteor.userId()});
  }
});
