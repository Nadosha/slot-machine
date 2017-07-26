/**
 * Created by andrey on 26.07.17.
 */
Template.userProfile.onCreated(function() {
    this.imageId = new ReactiveVar( undefined );
});

Template.userProfile.helpers({
    user: function() {
        let user = Meteor.users.findOne(Meteor.userId());
        return user.profile;
    }
});

Template.userProfile.events({
    'change [name=userPhotoUpload]': function(event) {
        event.preventDefault();
        FS.Utility.eachFile(event, function(file) {
            let newFile = new FS.File(file);
            newFile.metadata = {
                createdBy:Meteor.userId(),
            }
            let query = userImages.findOne({'metadata.createdBy':Meteor.userId()});
            if (query != undefined) {
                userImages.remove({_id:query._id});
            }

            userImages.insert(newFile, function (err, fileObj) {
                if (err){
                    console.log(err);
                } else {
                    // handle success depending what you need to do
                    let currentUserId = Meteor.userId();
                    let intervalHandle = Meteor.setInterval(function () {

                        if (fileObj.hasStored("userImages")) {
                            // File has been uploaded and stored. Can safely display it on the page.
                            let imagesURL = {
                                "profile.userImg": '/cfs/files/userImages/' + fileObj._id + '/' + fileObj.name()
                            };
                            Meteor.users.update(currentUserId, {$set: imagesURL});
                            // file has stored, close out interval
                            Meteor.clearInterval(intervalHandle);
                        }
                    }, 1500);
                }
            });

        });
    }
});