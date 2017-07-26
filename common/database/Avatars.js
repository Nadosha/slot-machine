var imageStore = new FS.Store.GridFS('userImages');

userImages = new FS.Collection('userImages', {
    stores: [imageStore],
    filter: {
        maxSize: 1258291,
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpg', 'jpeg']
        },
        onInvalid: function(messege) {
            if(Meteor.isClient) {
                alert(messege);
            } else {
                console.log(messege);
            }
        }
    }
});