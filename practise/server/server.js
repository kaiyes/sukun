Meteor.startup(function() {
    process.env.MAIL_URL =
    "smtp://postmaster%40sandbox815499bd3e1e4adfaf528b8eb7bad856.mailgun.org:87eac37901678ad8baa94d3159cd6ba8@smtp.mailgun.org:587";

    Accounts.config({
      sendVerificationEmail: true
    });

    Houston.add_collection(Meteor.users);

  });
