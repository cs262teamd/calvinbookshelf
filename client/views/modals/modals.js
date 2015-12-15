///////////////////////////// loginModal template /////////////////////////////

// onRendered hook bound to the loginModal template
Template.loginModal.onRendered(function() {
    // initializes elements with the modal-trigger class
    $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: .5,
        in_duration: 300,
        out_duration: 300
    });
});

// event handler bound to the loginModal class
Template.loginModal.events({
    // when the login button is clicked
    'click button[name="login"]': function(event, template) {
        event.preventDefault();
        initLogin(event, template);
    },
    // when the enter key is pressed
    'keyup input': function(event, template) {
        event.preventDefault();
        if (event.keyCode === 13)
            initLogin(event, template);
    },
    // when the logout button is clicked
    'click button[name="logout"]': function(event) {
        Meteor.logout();
    }
});

// myLdapLogin template inherits from ldapLogin and loginModal
Template.myLdapLogin.inheritsHelpersFrom("ldapLogin");
Template.myLdapLogin.inheritsEventsFrom("loginModal");

// initiates the login process
initLogin = function(event, template) {
    // find username and password from input fields
    var user = $(template.find('input[name="ldap"]')).val();
    var pass = $(template.find('input[name="password"]')).val();
    // if trying to login as dev account
    if (user === "dev") {
        var result = Meteor.loginWithPassword(user, pass, function(error) {
            return error ? false : true;
        });
    }
    // otherwise, use LDAP authentication
    else {
        var result = Meteor.loginWithLdap(user, pass, function() {
            return Meteor.userId() ? true : false;
        });
    }
    return result;
}
