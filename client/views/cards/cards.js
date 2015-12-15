/////////////////////////////// cards template ////////////////////////////////

// onCreated hook bound to the cards template
Template.cards.onCreated(function() {
    // subscribes cards to the books collection
    this.subscribe("books");
});

// helper functions bound to the cards template
Template.cards.helpers({
    // returns a cursor for all books in books collection
    books: function() {
        return Books.find();
    }
});


//////////////////////////////// card template ////////////////////////////////

// onCreated hook bound to the card template
Template.card.onCreated(function() {
    // sets the card's messageSent variable to false
    this.messageSent = new ReactiveVar(false);
});

// event handler bound to the card template
Template.card.events({
    // when the "Contact Sender" button is clicked,
    "click .send-message": function(event, template) {
        if (Meteor.user())
            promptMessage(template);
        else
            $('#loginModal').openModal();
    },
    // when the "Remove Book" button is clicked,
    "click .remove-book": function(event, template) {
        Meteor.call("removeBook", template.data._id);
    }
});

// helper functions bound to the card template
Template.card.helpers({
    // returns true if the user sent a message to the seller already
    messageSent: function() {
        return Template.instance().messageSent.get();
    },
    // returns true if this card is owned by the current user
    myBook: function() {
        return this.user == Meteor.user().username;
    },
    // returns a string representation of a price
    formatPrice: function(price) {
        return (typeof(price) == 'number') ? '$' + price.toFixed(2) : "";
    },
    // replaces empty strings with "n/a"
    checkAvailable: function(detail) {
        return (detail) ? detail : "n/a";
    }
});

// opens a modal for composing a message to send to seller
var promptMessage = function(template) {
    MaterializeModal.prompt({
        title: "Compose message and click submit",
        placeholder: "This field is optional",
        message: "",
        callback: function(error, response) {
            // gather data from template
            var customerName = Meteor.user().username;
            var customerEmail = customerName + '@students.calvin.edu';
            var sellerEmail = template.data.user + '@students.calvin.edu';
            var title = template.data.title;
            // default message to be sent
            var msg = customerName + ' would like to purchase "' + title +
                      '".\nPlease contact your customer at ' + customerEmail;
            // add the custom to the message
            if(response.value)
                msg += '\n' + customerName + ' says:\n' + response.value;
            // email the message to the seller 
            if (response.submit) {
                Meteor.call('sendEmail', sellerEmail, 
                            'calvinbookshelf', 'You have an offer!', msg);
                template.messageSent.set(true);
                Materialize.toast("Message Sent", 4000, "rounded");
            }
        }
    });
}
