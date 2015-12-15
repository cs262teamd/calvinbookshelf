/* this file only runs on the server */

// publishes the books collection
Meteor.publish('books', function() {
    return Books.find();
});

// publishes the classes collection
Meteor.publish('classes', function() {
    return Classes.find();
});

// methods for communicating with the client
Meteor.methods({
    newBook: function (book) {
        Books.insert(book);
    },
    removeBook: function (id) {
        Books.remove(id);
    },
    sendEmail: function (to, from, subject, text) {
        // asserts that arguments are strings
        check([to, from, subject, text], [String]);

        // don't make the client wait until the
        // email is sent to continue execution
        this.unblock();

        // send the email
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});

// creates the dev account if it's not already created
if (Meteor.users.find({username: "dev"}).count() === 0) {
    Accounts.createUser({
        username: "dev",
        password: "slaap262"
    });
}

// if books collection is empty, inserts three dummy books
if (Books.find().count() === 0) {
    Books.insert({
        title: "Fundamentals of Chemistry",
        author: "Ralph A. Burns",
        edition: "1st",
        isbn: 9780321500458,
        price: "25.00",
        comment: "Only worn once",
        thumbnail: "http://www.thomasriggs.net/blog/wp-content/uploads/2009/08/TextbookCover.jpg"
    });
    Books.insert({
        title: "Human Biology",
        edition: null,
        isbn: 9780321511152,
        price: "35.00",
        comment: "BUY IT",
        author: "Michael D. Johnson",
        thumbnail: "http://homepage.smc.edu/azuma_kay/bio2/images/Johnson4.jpg"
    });
    Books.insert({
        title: "Essential English",
        author: "E. Suresh Kumar",
        isbn: 9782221511447,
        price: "8.50",
        edition: "3rd",
        comment: "Mint-condition, never even opened it",
        thumbnail: "http://www.languageinindia.com/april2011/essentialenglishfrontcover.jpg"
    });
}
