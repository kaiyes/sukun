
  AutoForm.setDefaultTemplate('materialize');

  Biye.attachSchema(new SimpleSchema({

    age: {
      type: Number,
      max: 60
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
    /*image: {
      type: String,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      }
    },*/


     /*profession: {
         type: String
     },

     currentResidence: {
         type: String
     },

   originalResidence : {
         type: String
     },

     familyMembers: {
         type: String
     },

     lastOrNextDegree: {
        type: String,
        allowedValues: ['Phd','Doctor','Engineer','Masters','Honours','Diploma','HSC','SSC']
     },

     dateOfBirth: {
        type: Date,
     },

     religiousHistory: {
        type: String,
        allowedValues: ['Started practising 1 or 2 years back',
                         'Been practising for more than 5 years',
                         'Revert Muslim','Have not started practising yet but want too soon',
                         'I have faith in my heart']
     },

     sect: {
        type: String,
        allowedValues: ['Salafi/Ahle Hadeeth', 'Hanafi',
                         'Tablig','Pir','Shia','I do not know']
     },

     prayer: {
        type: String,
        allowedValues: ['Always pray', 'Sometimes miss fajr',
                         'Often pray','Before exam, I pray',
                          'Eid only','Jumuah Only',
                          'Will start praying very soon']
     },

     maritalStatus: {
        type: String,
        allowedValues: ['Never Married', 'Annulled (Khula)',
                       'Divorced','widowed','Married']
     },

     numberOfChildren: {
        type: Number
     },

     Hijab: {
        type: String,
        allowedValues: ['Always With Burkha/Abaya face open',
                        'Always with Burkha/Abaya with Niqab',
                        'Always with Scraf only',
                      'I dress modestly but not Burkha/Abaya/niqab',
                        'I dress modestly but Sometimes I wear Hijab',
                        '(Male only) Shirt,trousers,casual clothing',
                        '(Male only) Panjabi','(Male only) Jobba']
     },

     height: {
        type: String
     },

     beard:{
       type: String,

       allowedValues: ['I have let my beard grow','I trim my beard',
                       'No beaerd, shaved, will not keep beard',
                       'No beaerd, shaved, will keep beard in future',
                       'I am a woman, I CAN NOT HAVE BEARD you silly']
     }*/


  }));


  AutoForm.addHooks('details', {
    onSuccess: function() {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.hasDb": true}});
      Router.go("/list");
    }
  });


  WantToPay.attachSchema(new SimpleSchema({

      bikash: {
        type: Number,
        max: 999999999999999
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
      }
    }));

    AutoForm.addHooks('payment', {
      onSuccess: function() {
        Router.go("/list");
      }
    });
