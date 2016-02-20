Template.list.helpers({
  
  "people": function() {
    return  Meteor.users.find({});
  }
});
