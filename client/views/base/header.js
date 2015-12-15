/////////////////////////////// header template ///////////////////////////////

// event handler bound to the header template
Template.header.events({
    // when the login button is clicked
    'click [name="login"]': function(event) {
        $('#loginModal').openModal();
    }
});

///////////////////////////// menuButton template /////////////////////////////

// onRendered hook bound to the menuButton template
Template.menuButton.onRendered(function(){
    // initializes elements with the .dropdown-button class
    this.$(".dropdown-button").dropdown({
        belowOrigin: true,
        hover: false,
        constrain_width: false,
        alignment: 'right'
    });
});
