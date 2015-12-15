///////////////////////////////// faq template ////////////////////////////////

// onRendered hook bound to the faq template
Template.faq.onRendered(function() {
    // initializes elements with the .collapsible class
    $('.collapsible').collapsible({
        accordion : false
    });
});
