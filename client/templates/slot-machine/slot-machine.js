/**
 * Created by andrey on 25.07.17.
 */

Template.slotMachine.onCreated(function() {
    let img = ['/img/001.png', '/img/002.png', '/img/003.png', '/img/004.png', '/img/005.png', '/img/006.png', '/img/007.png'];

    let rand = {
        'slot1': img[Math.floor(Math.random() * img.length)],
        'slot2': img[Math.floor(Math.random() * img.length)],
        'slot3': img[Math.floor(Math.random() * img.length)],
    };

    this.slotPosition = new ReactiveVar(rand);
    this.start = new ReactiveVar(false);
    this.finalPosition = new ReactiveVar();

    this.autorun(() => {
        let times = 0;

        if(this.start.get()) {
            let Hendler = Meteor.setInterval(() => {
                times += 1;
                let rand = {
                    'slot1': img[Math.floor(Math.random() * img.length)],
                    'slot2': img[Math.floor(Math.random() * img.length)],
                    'slot3': img[Math.floor(Math.random() * img.length)],
                };
                this.slotPosition.set(rand);

                if (!this.start.get() || times >= 40) {
                    this.start.set(false);
                    this.finalPosition.set(rand);
                    $( ".spinStop" ).removeClass( "spinStop" ).addClass( "spinStart" );

                    let prise = -5;

                    if(rand.slot1 === rand.slot2 === rand.slot3) {
                        prise = 50;
                    } else if(rand.slot1 === rand.slot2) {
                        prise = 15
                    } else if(rand.slot2 === rand.slot3) {
                        price = 10
                    }

                    Meteor.call('updateScore', prise);

                    Meteor.clearInterval(Hendler);
                }
            }, 100);
        }
    });
});

Template.slotMachine.helpers({
    slotimage: function() {
        let slots = Template.instance().slotPosition.get();

        return slots;
    },
    credits: function() {
        let user = Meteor.user();

        if(user) {
            return user.profile.score >= 0;
        }
    },
    machinePosition: function() {
        let instance = Template.instance();
        if (instance.start.get()) {
            return '/img/machine_pushed.png';
        } else {
            return '/img/machine.png';
        }
    }
});

Template.slotMachine.events({
    'click .spinStart': function(event, instance) {
        event.preventDefault();
        $( ".spinStart" ).removeClass( "spinStart" ).addClass( "spinStop" );
        instance.start.set(true);
    },
    'click .spinStop': function(event, instance) {
        event.preventDefault();
        $( ".spinStop" ).removeClass( "spinStop" ).addClass( "spinStart" );
        instance.start.set(false);
    },
    'click #addCredits': function(event) {
        event.preventDefault();

        Meteor.call('updateScore', 20);
    }
});