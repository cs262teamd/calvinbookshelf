//////////////////////////////// sell template ////////////////////////////////

// event handler bound to the sell template
Template.sell.events({
    // when the sellForm is submitted
    'submit #sellForm': function(event) {
        event.preventDefault();
        // if the user is logged in, submits book
        if (Meteor.user()) {
            submitBook(event);
        }
        // otherwise, opens the login modal
        else {
            $('#loginModal').openModal();
        }
    }
});

// inserts a new book into the books collection with data from an event
submitBook = function (event) {
    // routes to the home page
    Router.go('/');
    var title = event.target.title.value;
    // inserts a new book with data from the event
    Meteor.call('newBook', {
        title: title,
        author: event.target.author.value,
        edition: event.target.edition.value,
        price: parsePrice(event.target.price.value),
        comment: event.target.comments.value,
        course:  event.target.course.value,
        user: Meteor.user().username,
        // currently uploads a placeholder image
        thumbnail: "http://www.stjordalfoto.no/templates/clean/images/no_image.png"
    });
    // informs the user that the book was added
    Materialize.toast(title + " added", 2000, 'rounded');
}

// parses floats from price strings
parsePrice = function (price) {
    if (price.charAt(0) == '$')
        price = price.substr(1);
    price = parseFloat(price).toFixed(2);
    return parseFloat(price);
}
