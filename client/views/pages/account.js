/////////////////////////////// account template //////////////////////////////

// binds to the account template when its created
Template.account.onCreated(function() {
    this.subscribe("books");
});

// helper functions bound to the account template
Template.account.helpers({
    // returns all of the books that the user is selling
    myBooks: function() {
        return Books.find({user: Meteor.user().username});
    }
});
