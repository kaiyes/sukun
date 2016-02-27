
  Template.admin.helpers({
    wantsToPay: function() {
    return Payment.find({paid:false});
    }
  });

  Template.admin.events({
    'click [name=paid]': function() {
      event.preventDefault();
      Meteor.call("makePaidUser");
      console.log("This one has been madea member and can now access everything");
    }
  });
