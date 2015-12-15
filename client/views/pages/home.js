////////////////////////////// searchBox template /////////////////////////////

// helper functions bound to the searchBox template
Template.searchBox.helpers({
    // the parameters for the search input
    inputParameters: function () {
        return {
            index: BooksIndex,
            timeout: 250,
            attributes: {
                class: 'col s8 offset-s2',
                placeholder: 'Start searching...',
                style: 'font-size: 24px'
            }
        }
    },
    // the parameters for the "Load More" button
    loadMoreParameters: function () {
        return {
            index: BooksIndex,
            content: 'Load More',
            attributes: {
                'class': 'btn grey waves-effect'
            }
        }
    },
    // returns all books sorted by lowest price
    books: function () {
        return Books.find({}, { sort: { price: -1, name: 1 }});
    },
    // simply returns BooksIndex
    index: function () {
        return BooksIndex;
    },
    // returns a string that explains how many results were found
    resultsCount: function () {
        var count = BooksIndex.getComponentDict().get('count');
        switch(count) {
            case 0: return "No results found.";
            case 1: return "1 result found.";
            default: return String(count) + " results found.";
        }
    }
});
