Template.userStat.helpers({
    user: function() {
        let user = Meteor.user();
        return user;
    }
});