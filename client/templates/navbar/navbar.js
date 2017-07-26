/**
 * Created by andrey on 25.07.17.
 */
Template.navBar.events({
    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout();
    }
});