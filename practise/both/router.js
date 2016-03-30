Router.route('/', {
  name: 'home',
  template: "home"
});

Router.route('/signUp');
Router.route('/payment');
Router.route('/verifyEmail');
Router.route('/forgotPassword');
Router.route('/resetPassword');
Router.route('/photo');
Router.route('/dashBoard');

Router.route('/adminChat', {
  onBeforeAction: function() {
    var check = Meteor.user().username;
    if (check === "admin") {
      this.next();
    } else {
      sweetAlert("you got lost !! Go Back");
      Router.go("/list");
    }
  }
});

Router.route('/details',{
  onBeforeAction: function() {
    var verify = Meteor.user().emails[0].verified;
       if(!verify){
         Router.go('verifyEmail');
       }else{
        console.log("veried, going to details");
      };
      this.next();
    }
  });

Router.route('/list', {
  onBeforeAction: function() {
    var check = Meteor.user().profile.hasDb;
    if (!check) {
      Router.go("details");
    } else {
      console.log("hasDb, going to list");
    }
    this.next();
  }
});

Router.route('show', {
  path: '/list/:username',
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

 Router.route('/chat');
