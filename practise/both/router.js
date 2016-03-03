Router.route('/', {
  name: 'home',
  template: "home"
});

Router.route('/register');
Router.route('/login');
Router.route('/payment');
Router.route('/verifyEmail');

Router.route('/admin',{
  waitOn: function() {
    return [Meteor.subscribe('users'),
    Meteor.subscribe("payment")]
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
    return [
      Meteor.subscribe('users',username),
      Meteor.subscribe("biye"),
      Meteor.subscribe("payment"),
      Meteor.subscribe("request"),
      Meteor.subscribe("friends"),
      Meteor.subscribe("chatInvites")
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

   waitOn: function() {

     return [
       Meteor.subscribe("chatInvites"),
       Meteor.subscribe("conversation"),
       Meteor.subscribe("messages"),
       Meteor.subscribe('users')
    ]
   }
  });
