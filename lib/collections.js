// creates the classes collection
Classes = new Mongo.Collection('classes');

// creates the book collection
Books = new Mongo.Collection('books');

// creates an easy:search index on book titles
BooksIndex = new EasySearch.Index({
    engine: new EasySearch.MongoDB(),     // use the MongoDB engine
    collection: Books,                    // search the books collection
    defaultSearchOptions: { limit: 12 },  // initially render 12 results
    fields: ['title', 'author', 'course'] // the fields to search by
});
