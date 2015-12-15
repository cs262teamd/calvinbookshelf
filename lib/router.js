// specifies layout template
Router.configure({layoutTemplate: 'layout'});

// route to the home page
Router.route('/', {name: 'home'});

// routes to other pages
Router.route('/about');
Router.route('/results');
Router.route('/sell');
Router.route('/buy');
Router.route('/account');
Router.route('/faq');
