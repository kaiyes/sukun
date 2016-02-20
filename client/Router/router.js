Router.route('/', {
  name: 'home',
  template: "home"
});

Router.route('/register');
Router.route('/login');
Router.route('/payment');
Router.route('/admin');
Router.route('/verifyEmail');
Router.route('/chat');

Router.route('/details',{
  onBeforeAction: function() {
    var verify = Meteor.user().emails[0].verified;
       if(!verify){
         Router.go('verifyEmail');
       }else{
         this.next();
       }
    }
  });

Router.route('/list', {
  onBeforeAction: function() {
    var check = Meteor.subscribe("checkIfUserHasDb");
    if (!check) {
      Router.go("details");
    } else {
      this.next();
    }
  },
  waitOn: function(){
      return Meteor.subscribe('findThem');
  }
});

Router.route('show', {
  path: '/list/:username',
  data: function() {
    return Meteor.users.findOne({
      username: this.params.username
    });
  }
});
