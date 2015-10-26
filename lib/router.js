// sets layout for all pages
Router.configure({ 
  layoutTemplate: 'layout' 
});

Router.route('/', {name: 'home'}); // route for the home page
Router.route('/about');            // route for the about page
Router.route('/results');          // route for the results page
Router.route('/sell');             // route for the sell page
Router.route('/buy');              // route for the buy page

