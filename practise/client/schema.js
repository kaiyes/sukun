
  AutoForm.setDefaultTemplate('materialize');

  Biye.attachSchema(new SimpleSchema({

    image: {
      type: String,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      }
    },

    age: {
       type: Number,
       max: 55,
       min:15
    },

    height: {
       type: String
    },

     PresentResidence : {
         type: String
     },

    originalResidence : {
         type: String
     },

     lastOrNextDegree: {
        type: String,
        allowedValues: ['Phd',
        'Doctor','Engineer',
        'Masters','Honours',
        'Diploma','HSC','SSC']
     },

     school : {
         type: String
     },

     college : {
         type: String
     },

     university : {
         type: String
     },

     prayer: {
        type: String,
        allowedValues: ['Always pray', 'Sometimes miss fajr',
                         'Often pray','Before exam, I pray',
                          'Eid only','Jumuah Only',
                          'Will start praying very soon']
     },

     religiousHistory: {
        type: String,
        allowedValues: ['Started practising 1 or 2 years back',
                          'Been practising for more than 3 years',
                         'Been practising for more than 5 years',
                         'Revert Muslim','Have not started practising yet but want too soon',
                         'I have faith in my heart']
     },

     hijab: {
        type: String,
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

       allowedValues: ['I have let my beard grow','I trim my beard',
                       'No beaerd, shaved, will not keep beard',
                       'No beaerd, shaved, will keep beard in future',
                       'N/A']
     },

     fathersJobDescription: {
         type: String
     },

     brothersJobDescription: {
         type: String
     },


     maritalStatus: {
        type: String,
        allowedValues: ['Never Married', 'Annulled (Khula)',
                       'Divorced','widowed','Married']
     },

     numberOfChildren: {
        type: Number
     },

      profession: {
          type: String
      },

     jobTitle: {
         type: String
     },

     aboutMe: {
        type: String,
        max: 20000,
        autoform: {
          rows: 50
        }
     },

     mySpousesAgeShouldBe: {
        type: Number,
        max: 55,
        min:15
     },

     mySpousesHeightShouldBe: {
        type: String
     },

     lastOrNextDegreeShouldBe: {
       type: String,
       allowedValues: ['Phd',
       'Doctor','Engineer',
       'Masters','Honours',
       'Diploma','HSC','SSC']
    },

    youWantYourSpousesPrayerToBe: {
       type: String,
       allowedValues: ['Always pray', 'Sometimes miss fajr',
                        'Often pray','Before exam, I pray',
                         'Eid only','Jumuah Only',
                         'Will start praying very soon']
    },

    whatKindOfHijabYourSpouseShouldWear: {
       type: String,
       allowedValues: ['Always With Burkha/Abaya face open',
                       'Always with Burkha/Abaya with Niqab',
                       'Always with Scraf only',
                       'I dress modestly but not Burkha/Abaya/niqab',
                       'I dress modestly but Sometimes I wear Hijab',
                       '(Male only) Shirt,trousers,casual clothing',
                       '(Male only) Panjabi','(Male only) Jobba',
                        'anything that maintains Sunnah']
    },

    HeShouldHaveThisKindOfBeard:{
      type: String,

      allowedValues: ['I have let my beard grow','I trim my beard',
                      'No beaerd, shaved, will not keep beard',
                      'No beaerd, shaved, will keep beard in future',
                      'n/a']
    },


     lookingFor: {
        type: String,
        max: 20000,
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
