
  AutoForm.setDefaultTemplate('materialize');

  Biye.attachSchema(new SimpleSchema({

    image: {
      type: String,
      optional: true,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      }
    },

    /*nationalIdCardNumber: {
      type: String,
      optional: true,
      custom: function() {
        var gender = Meteor.user().profile.gender;
        if ( gender === 'male' && !this.isSet ) {
         return 'required';
        } else {
          return true;
        }
      }
    },

    scanOfNationalIdCard: {
      type: String,
      optional: true,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      },
      custom: function() {
        var gender = Meteor.user().profile.gender;
        if (!this.isSet && gender === 'male') {
        return 'required';
        } else {
          return true;
        }
      }
    },*/

    personalInformation: {
      type: Object,
      optional: true
    },

    'personalInformation.age': {
      type: Number,
      optional: true
    },

    'personalInformation.height': {
        type: String,
        optional: true,
        allowedValues: ["4 feet", "4 feet 1 inch", "4 feet 2 inch",
        "4 feet 3 inch","4 feet 4 inch","4 feet 5 inch","4 feet 6 inch",
        "4 feet 7 inch", "4 feet 8 inch","4 feet 9 inch", "4 feet 10 inch","4 feet 11 inch",
        "5 feet",
        "5 feet 1 inch", "5 feet 2 inch", "5 feet 3 inch",
        "5 feet 4 inch", "5 feet 5 inch", "5 feet 6 inch", "5 feet 7 inch",
        "5 feet 8 inch", "5 feet 9 inch", "5 feet 10 inch","5 feet 11 inch",
        "6 feet",
        "6 feet 1 inch", "6 feet 2 inch", "6 feet 3 inch",
        "6 feet 4 inch", "6 feet 5 inch", "6 feet 6 inch", "6 feet 7 inch",
        "6 feet 8 inch", "6 feet 9 inch", "6 feet 10 inch","6 feet 11 inch",
        ],
         autoform: {
           afFieldInput: {
             firstOption: "(Select your Height)"
           }
         }
    },

    'personalInformation.presentResidence': {
      type: String,
      optional: true,
      allowedValues: ['Dhaka','Faridpur','Gazipur','Gopalganj',
      'Jamalpur','Kishoreganj','Madaripur','Manikganj','Munshiganj',
      'Mymensingh','Narayanganj','Narsingdi','Netrakona','Rajbari',
      'Shariatpur','Sherpur','Tangail','Bagerhat','Chuadanga',
      'Jessore','Jhenaidah','Khulna','Kushtia','Magura','Meherpur',
      'Narail','Satkhira','Bogra','Joypurhat','Naogaon','Natore',
      'Nawabganj','Pabna','Rajshahi','Sirajganj','Dinajpur','Gaibandha',
      'Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Rangpur',
      'Thakurgaon','Habiganj','Moulvibazar','Sunamganj','Sylhet',
      'Barguna','Barisal','Bhola','Jhalokati','Patuakhali','Pirojpur',
      'Bandarban','Brahmanbaria','Chandpur','Chittagong','Comilla',
      'Coxs Bazar','Feni','Khagrachhari', 'Lakshmipur','Noakhali',
      'Rangamati'],

      autoform: {
        afFieldInput: {
          firstOption: "(বর্তমান বাসস্থান)"
        }
      }
    },

    'personalInformation.originalResidence': {
      type: String,
      optional: true,
      allowedValues: ['Dhaka','Faridpur','Gazipur','Gopalganj',
      'Jamalpur','Kishoreganj','Madaripur','Manikganj','Munshiganj',
      'Mymensingh','Narayanganj','Narsingdi','Netrakona','Rajbari',
      'Shariatpur','Sherpur','Tangail','Bagerhat','Chuadanga',
      'Jessore','Jhenaidah','Khulna','Kushtia','Magura','Meherpur',
      'Narail','Satkhira','Bogra','Joypurhat','Naogaon','Natore',
      'Nawabganj','Pabna','Rajshahi','Sirajganj','Dinajpur','Gaibandha',
      'Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Rangpur',
      'Thakurgaon','Habiganj','Moulvibazar','Sunamganj','Sylhet',
      'Barguna','Barisal','Bhola','Jhalokati','Patuakhali','Pirojpur',
      'Bandarban','Brahmanbaria','Chandpur','Chittagong','Comilla',
      'Coxs Bazar','Feni','Khagrachhari', 'Lakshmipur','Noakhali',
      'Rangamati'],
      autoform: {
        afFieldInput: {
          firstOption: "(দেশের বাড়ী )"
        }
      }
    },

    education: {
      type: Object,
      optional: true
    },

    'education.college' : {
        type: String,
        optional: true
    },

     'education.university' : {
         type: String,
         optional: true
     },

    'education.degree': {
      type: String,
      optional: true,
      allowedValues: ['Phd-completed','Phd-studying',
                      'MBBS-completed','MBBS-studying',
                      'BEng-completed','BEng-studying',
                      'BSc-completed','BSc-studying',
                      'Masters-completed','Masters-studying',
                      'Honours-completed','Honours-studying',
                      'Diploma-completed','Diploma-studying',
                      'HSC-completed','HSC-studying',
                      'SSC-completed','SSC-studying']
    },

     religiousFacts: {
       type: Object,
       optional: true
     },


     'religiousFacts.prayer': {
        type: String,
        optional: true,
        allowedValues: ['Always pray', 'Sometimes miss fajr',
                         'Often pray','Before exam, I pray',
                          'Eid only','Jumuah Only',
                          'Will start praying very soon']
     },

     'religiousFacts.religiousHistory': {
        type: String,
        optional: true,
        allowedValues: ['Started practising 1 or 2 years back',
                         'Been practising for more than 3 years',
                         'Been practising for more than 5 years',
                         'Revert Muslim',
                         'Have not started practising yet but want to, soon',
                         'I have faith in my heart']
     },



     'religiousFacts.hijab': {
        type: String,
        optional: true,
        allowedValues: ['Always With Burkha/Abaya face open',
                        'Always with Burkha/Abaya with Niqab',
                        'Always with Scarf only',
                        'I dress modestly but not Burkha/Abaya/niqab',
                        'I dress modestly but Sometimes I wear scarf'],
          },

     'religiousFacts.beard':{
       type: String,
       optional: true,
       allowedValues: ['I have let my beard grow','I trim my beard',
                       'No beard, shaved, will not keep beard',
                       'No beard, shaved, will keep beard in future']
        },

     family: {
       type: Object,
       optional: true
     },

     'family.fathersJobDescription': {
         type: String,
         optional: true
     },

     maritalStatus: {
       type: Object,
       optional: true
     },

     'maritalStatus.maritalStatus': {
        type: String,
        optional: true,
        allowedValues: ['Never Married', 'Annulled (Khula)',
                       'Divorced','widowed','Married']
     },

     'maritalStatus.numberOfChildren': {
        type: String,
        optional: true,
        allowedValues: ['Dont have children', '1',
                       '2','3','4','5','6','7','8','9']
     },

     profession: {
       type: Object,
       optional: true
     },

      'profession.profession': {
          type: String,
          optional: true
      },

     aboutMe: {
        type: String,
        max: 20000,
        optional: true,
        autoform: {
          rows: 5
        }
     },

     lookingFor: {
        type: String,
        max: 20000,
        optional: true,
        autoform: {
          rows: 5
       }
     },

     mySpouseShouldBe: {
       type: Object,
       optional: true
     },

     'mySpouseShouldBe.height': {
        type: String,
        optional: true
     },

     'mySpouseShouldBe.age': {
        type: String,
        optional: true,
        allowedValues: [
        '18-23',
        '20-25',
        '25-30','30-35',
        '35-40',
        '40-45','45-50']
     },

     'mySpouseShouldBe.degree': {
       type: String,
       optional: true,
       allowedValues: ['Phd-completed','Phd-studying',
                       'MBBS-completed','MBBS-studying',
                       'BEng-completed','BEng-studying',
                       'BSc-completed','BSc-studying',
                       'Masters-completed','Masters-studying',
                       'Honours-completed','Honours-studying',
                       'Diploma-completed','Diploma-studying',
                       'HSC-completed','HSC-studying',
                       'SSC-completed','SSC-studying']
    },

    'mySpouseShouldBe.prayer': {
       type: String,
       optional: true,
       allowedValues: ['Always pray', 'Sometimes miss fajr',
                        'Often pray','Before exam, I pray',
                         'Eid only','Jumuah Only',
                         'Will start praying very soon']
    },

    'mySpouseShouldBe.religiousHistory': {
       type: String,
       optional: true,
       allowedValues: ['Started practising 1 or 2 years back',
                        'Been practising for more than 3 years',
                        'Been practising for more than 5 years',
                        'Revert Muslim','will start practising soon',
                        'has faith in the heart']
    },

    'mySpouseShouldBe.hijab': {
       type: String,
       optional: true,
       allowedValues: ['Always With Burkha/Abaya face open',
                       'Always with Burkha/Abaya with Niqab',
                       'Always with Scraf only','Sometimes wears Hijab',
                       'modest clothing but not Burkha/Abaya/niqab']
    },

    'mySpouseShouldBe.beard':{
      type: String,
      optional: true,
      allowedValues: ['full beard','trimmed beard',
                      'shaved']
    },

     createdBy: {
       type: String,
       autoValue: function() {
         if (this.isInsert) {
           console.log("id inserted :  " + this.userId);
           return this.userId;
         } else {
           console.log("no userId entered");;
         }
       }
     }

  }));




  AutoForm.addHooks('details', {
    onSuccess: function() {
      Meteor.users.update( Meteor.userId(), { $set: { "profile.hasDb": true }});
      sweetAlert('created your profile, Alhamdulillah')
      Router.go("/list");
    }
  });

  AutoForm.addHooks('updateDetails', {
    onSuccess: function() {
      Meteor.users.update( Meteor.userId(), { $set: { "profile.approved":false }});
      sweetAlert('updated your profile, Awaiting approval from admin')
      Router.go("/list");
    }
  });

  Payment.attachSchema(new SimpleSchema({

      bikash: {
        type: Number,
        max: 999999999999999
      },

      amount: {
          type: String
      },

      createdBy: {
        type: String,
        autoValue: function() {
          if (this.isInsert) {
            console.log( "paid" );
            return this.userId;
          } else {
            console.log("no payment entered");;
          }
        }
      },

      paid:{
        type: Boolean,
        defaultValue:false
      }

    }));

    AutoForm.addHooks('payment', {
      onSuccess: function() {
        Router.go("/list");
      }
    });


    /*custom: function() {
      var gender = Meteor.user().profile.gender;
      if (!this.isSet && gender === 'male') {
      return 'required';
      } else {
        return true;
      }
    }*/
