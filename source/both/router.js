Router.route('/', {name: 'home',template: "home"},function() {});
Router.route('/loginPage',{name: 'loginPage'}, function() {});
Router.route('/signUp',{name: 'signUp'}, function() {});
Router.route('/payment',{name: 'payment'}, function() {});
Router.route('/verifyEmail',{name: 'verifyEmail'}, function() {});
Router.route('/forgotPassword',{name: 'forgotPassword'}, function() {});
Router.route('/resetPassword', {name: 'resetPassword'}, function() {});
Router.route('/photo',{name: 'photo'}, function() {});
Router.route('/dashBoard',{name: 'dashBoard'}, function() {});
Router.route('/updateDetails',{name: 'updateDetails'}, function() {});

Router.route('/adminChat',{
  onBeforeAction: function() {
    var check = Meteor.user().username;
    if (check === "admin") {
      this.next();
    } else {
      sweetAlert("you got lost !! Go Back");
      Router.go("/list");
    }
  }
},{name: 'adminChat'});

Router.route('/details', {name: 'details'}, {
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

Router.route('/list', {name: 'list'},{
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

 Router.route('/chat', {name: 'chat'}, function() {});
