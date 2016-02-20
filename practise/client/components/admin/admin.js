
  Template.admin.helpers({
    wantsToPay: function() {
    return WantToPay.find({});
    }
  });

  Template.admin.events({
    'click [name=paid]': function() {
      event.preventDefault();
      Paid.insert({ user:this.createdBy ,paid:true});
      console.log("This one has been made a member and can now access everything");

    }
  });
