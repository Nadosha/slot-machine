import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    return Meteor.methods({
       updateScore: function(score) {
           Meteor.users.update({
               _id: Meteor.userId()
           },{
               $inc: {
                   'profile.score': score
               }
           });
       }
    });
});
