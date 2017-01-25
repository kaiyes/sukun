Router.route('/', {
  name: 'home',
  template: "home"
});

Router.route('/loginPage');
Router.route('/signUp');
Router.route('/payment');
Router.route('/verifyEmail');
Router.route('/forgotPassword');
Router.route('/resetPassword');
Router.route('/banned');
Router.route('/details');

Router.route('/adminApprove',{
  onBeforeAction: function() {
    var check = Meteor.user().username;
    if (check === "admin") {
      this.next();
    } else {
      sweetAlert("you got lost !! Go Back");
      Router.go("home");
    }
  }
});

Router.route('/adminApproved',{
  onBeforeAction: function() {
    var check = Meteor.user().username;
    if (check === "admin") {
      this.next();
    } else {
      sweetAlert("you got lost !! Go Back");
      Router.go("home");
    }
  }
});

Router.route('/adminBan',{
  onBeforeAction: function() {
    var check = Meteor.user().username;
    if (check === "admin") {
      this.next();
    } else {
      sweetAlert("you got lost !! Go Back");
      Router.go("home");
    }
  }
});

Router.route('/adminChat',{
  onBeforeAction: function() {
    var check = Meteor.user().username;
    if (check === "admin") {
      this.next();
    } else {
      sweetAlert("you got lost !! Go Back");
      Router.go("home");
    }
  }
});





Router.route('/list',{
  onBeforeAction: function() {
    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;

    if (!hasDb) {
      Router.go("details");
    };
    if (banned) {
      Router.go("banned");
    };
    this.next();
  }
});

Router.route('show', {
  path: '/list/:username',

  onBeforeAction: function() {
    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;
      if (!hasDb) {
        Router.go("details");
      };
      if (banned) {
        Router.go("banned");
      };
      this.next();
  },
  waitOn: function() {
    var username = Router.current().params.username;
    var user = Meteor.user().username;
    return [
      Meteor.subscribe('users',username),
      Meteor.subscribe("friends"),
      Meteor.subscribe('conversation')
   ]
  },

  data: function(){
    var user = Meteor.users.findOne({
      username: this.params.username
     });
    return user;
   }
 });

Router.route('/chat',{
  onBeforeAction: function() {
    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;
      if (!hasDb) {
        Router.go("details");
      };
      if (banned) {
        Router.go("banned");
      };
      this.next();
  }
});

Router.route('/myProfile',{
  onBeforeAction: function() {
    var verify = Meteor.user().emails[0].verified;
    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;
      if (!hasDb) {
        Router.go("details");
      };
      if (banned) {
        Router.go("banned");
      };
      this.next();
  }
});

Router.route('/dashBoard',{
  onBeforeAction: function() {
    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;
      if (!hasDb) {
        Router.go("details");
      };
      if (banned) {
        Router.go("banned");
      };
      this.next();
  }
});

Router.route('/photo',{
  onBeforeAction: function() {

    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;
      if (!hasDb) {
        Router.go("details");
      };
      if (banned) {
        Router.go("banned");
      };
      this.next();
  }
});
Router.route('/updateDetails',{
  onBeforeAction: function() {

    var hasDb = Meteor.user().profile.hasDb;
    var banned = Meteor.user().profile.banned;
      if (!hasDb) {
        Router.go("details");
      };
      if (banned) {
        Router.go("banned");
      };
      this.next();
  }
});
