/**
 * Created by andrey on 25.07.17.
 */
// Configurations
LoginControll = RouteController.extend({
    onBeforeAction: function() {
        let currentUser = Meteor.userId();
        if (currentUser) {
            this.next();
        } else {
            Router.go('login');
        }
    }
});

// DEFINE ROUTS

//Login routs
Router.route('/registration', {
        name: 'registr',
        template: 'registr',
        layoutTemplate: 'loginPage'
    }
);
Router.route('/login', {
        name: 'login',
        template: 'login',
        layoutTemplate: 'loginPage',
        waitOn:function(){
            Accounts.loginServicesConfigured();
        }
    }
);

// App routs configurations
Router.route('/', {
    name: 'home',
    template: "slotMachine",
    controller: 'LoginControll'
});

Router.route('/profile', {
    name: 'userProfile',
    template: 'userProfile',
    data: function() {
        return Meteor.user();
    },
    controller: 'LoginControll'
});

Router.configure({
    layoutTemplate: 'mainLayout'
});