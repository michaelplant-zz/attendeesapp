if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	//add a single variable to the global scope to which we may choose to
	//intentionally add items to
	var globals = {};

	//create a private scope to prevent further polluting the global object
	(function() {
		var AppTabGroup = require('ui/AppTabGroup').AppTabGroup,
			ListWindow = require('ui/ListWindow').ListWindow,
			AddWindow = require('ui/AddWindow').AddWindow;

		// Initialize local storage
		require('db').createDb();

		//create our global tab group
		globals.tabs = new AppTabGroup(
			{
				title: 'All',
				icon: 'images/KS_nav_ui.png',
				window: new ListWindow({
					title: 'All',
					backgroundColor: '#fff',
					navBarHidden: false,
					isDone: 0,
					activity: {
						onCreateOptionsMenu: function(e) {
							var menu = e.menu;
							var menuItem = menu.add({ title: "Add Attendee" });
							menuItem.setIcon("images/ic_menu_add.png");
							menuItem.addEventListener("click", function(e) {
								new AddWindow().open();
							});
						}
					}
				})
			},
			{
				title: 'No Contact',
				icon: 'images/KS_nav_views.png',
				window: new ListWindow({
					title: 'Done',
					backgroundColor: '#fff',
					navBarHidden: false,
					isDone: 1
				})
			}
		);

		globals.tabs.open();
	})();
}