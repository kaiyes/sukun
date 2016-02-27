Router.route('/', {
  name: 'home',
  template: "home"
});

Router.route('/register');
Router.route('/login');
Router.route('/payment');
Router.route('/verifyEmail');
Router.route('/chat');

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
  },

  waitOn: function() {
    return [Meteor.subscribe('findFemales'),
    Meteor.subscribe('findMales')];
    }
});

Router.route('show', {
  path: '/list/:username',

  waitOn: function() {
    return [Meteor.subscribe('users'),
    Meteor.subscribe("biye"),
    Meteor.subscribe("payment")]
  },

  data: function() {
    return Meteor.users.findOne({
      username: this.params.username
    });
  }
});

Router.route('/admin',{
  waitOn: function() {
     
    return [Meteor.subscribe('users'),
    Meteor.subscribe("payment")]
  }
}
);
