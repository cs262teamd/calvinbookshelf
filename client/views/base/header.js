// event handler that's bound to the header template
Template.header.events({
  'click [name="login"]': function(event) {
        event.preventDefault();
        $('#loginModal').openModal();
    }
});

Template.header.onRendered({
    $('.dropdown-button').dropdown({
        inDuration: 300,
      	outDuration: 225,
      	constrain_width: false, // Does not change width of dropdown to that of the activator
    	hover: true,  // Activate on hover
      	gutter: 20,   // Spacing from edge
      	belowOrigin: false, // Displays dropdown below the button
      	alignment: 'left'   // Displays dropdown with edge aligned to the left of button
    });
});
