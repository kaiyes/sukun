
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

    age: {
       type: Number,
       max: 55,
       min:15,
       optional: true
    },

    height: {
       type: String,
       optional: true
    },

     PresentResidence : {
         type: String,
         optional: true,
         allowedValues: ['Dhaka-District',
         'Chittagong-District','RajShahi-District',
         'Sylhet-District','Khulna-District',
         'Borishal-District','Rangpur-District','Mymensingh-District']
     },

    originalResidence : {
         type: String,
         optional: true,
         allowedValues: ['Dhaka-District',
         'Chittagong-District','RajShahi-District',
         'Sylhet-District','Khulna-District',
         'Borishal-District','Rangpur-District','Mymensingh-District']
     },

     education: {
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

     school : {
         type: String,
         optional: true
     },

     college : {
         type: String,
         optional: true
     },

     university : {
         type: String,
         optional: true
     },

     prayer: {
        type: String,
        optional: true,
        allowedValues: ['Always pray', 'Sometimes miss fajr',
                         'Often pray','Before exam, I pray',
                          'Eid only','Jumuah Only',
                          'Will start praying very soon']
     },

     religiousHistory: {
        type: String,
        optional: true,
        allowedValues: ['Started practising 1 or 2 years back',
                         'Been practising for more than 3 years',
                         'Been practising for more than 5 years',
                         'Revert Muslim','Have not started practising yet but want too soon',
                         'I have faith in my heart']
     },

     hijab: {
        type: String,
        optional: true,
        allowedValues: ['Always With Burkha/Abaya face open',
                        'Always with Burkha/Abaya with Niqab',
                        'Always with Scraf only',
                        'I dress modestly but not Burkha/Abaya/niqab',
                        'I dress modestly but Sometimes I wear Hijab',
                        '(Male only) Shirt,trousers,casual clothing',
                        '(Male only) Panjabi','(Male only) Jobba',
                        'I follow sunnah clothing']
     },

     beard:{
       type: String,
       optional: true,
       allowedValues: ['I have let my beard grow','I trim my beard',
                       'No beard, shaved, will not keep beard',
                       'No beard, shaved, will keep beard in future',
                       'Not applicable for me as I am a girl']
     },

     fathersJobDescription: {
         type: String,
         optional: true
     },

     maritalStatus: {
        type: String,
        optional: true,
        allowedValues: ['Never Married', 'Annulled (Khula)',
                       'Divorced','widowed','Married']
     },

     numberOfChildren: {
        type: String,
        optional: true,
        allowedValues: ['Dont have children', '1',
                       '2','3','4','5','6','7','8','9']
     },

      profession: {
          type: String,
          optional: true
      },

     aboutMe: {
        type: String,
        max: 20000,
        optional: true,
        autoform: {
          rows: 50
        }
     },

     mySpousesAgeShouldBe: {
        type: String,
        optional: true,
        allowedValues: [
        '18-23',
        '20-25',
        '25-30','30-35',
        '35-40',
        '40-45','45-50']
     },

     /*mySpousesHeightShouldBe: {
        type: String,
        optional: true
     },*/

     myPartnerShouldHaveThisDegree: {
       type: String,
       optional: true,
       allowedValues: ['Phd-completed','Phd-studying',
       'MBBS-completed','Doctor',
       'BEng-completed','BEng-studying',
       'Masters-completed','Masters-studying',
       'Honours-completed','Honours-studying',
       'Diploma-completed','Diploma-completed',
       'HSC-completed','HSC-completed',
       'SSC-studying','SSC-completed']
    },

    youWantYourSpousesPrayerToBe: {
       type: String,
       optional: true,
       allowedValues: ['Always pray', 'Sometimes miss fajr',
                        'Often pray','Before exam, I pray',
                         'Eid only','Jumuah Only',
                         'Will start praying very soon']
    },

    /*whatKindOfHijabYourSpouseShouldWear: {
       type: String,
       optional: true,
       allowedValues: ['Always With Burkha/Abaya face open',
                       'Always with Burkha/Abaya with Niqab',
                       'Always with Scraf only',
                       'I dress modestly but not Burkha/Abaya/niqab',
                       'I dress modestly but Sometimes I wear Hijab',
                       '(Male only) Shirt,trousers,casual clothing',
                       '(Male only) Panjabi','(Male only) Jobba',
                        'anything that maintains Sunnah']
    },*/

    /*HeShouldHaveThisKindOfBeard:{
      type: String,
      optional: true,
      allowedValues: ['I have let my beard grow','I trim my beard',
                      'No beaerd, shaved, will not keep beard',
                      'No beaerd, shaved, will keep beard in future',
                      'n/a']
    },*/


     lookingFor: {
        type: String,
        max: 20000,
        optional: true,
        autoform: {
          rows: 50
       }
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
      Meteor.users.update(Meteor.userId(), {$set: {"profile.hasDb": true}});
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
