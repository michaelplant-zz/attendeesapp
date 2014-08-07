exports.EditWindow = function() {
	var db = require('db');
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Update Attendee',
		backgroundColor: '#fff'
	});
	var nameField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		hintText: 'Attendee Name',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	var titleField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '70dp',
		hintText: 'Attendee Title',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});

	var updateButton = Ti.UI.createButton({
		title: 'Update',
		width: '300dp',
		height: '40dp',
		top: '120dp'
	});
	updateButton.addEventListener('click', function() {
		updateAttendee(nameField.value, titleField.value, self);
	});

	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '300dp',
		height: '40dp',
		top: '160dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});

	self.add(nameField);
	self.add(titleField);
	self.add(updateButton);
	self.add(cancelButton);

	return self;
};

var addAttendee = function(name, title, win) {
	if (name === '') {
		alert('Please enter an attendee name first');
		return;
	}

	require('db').addItem(name,title);
	Ti.App.fireEvent('app:updateTables');
	win.close();
};
var updateAttendee = function(name, title, win) {
	if (name === '') {
		alert('Please enter an attendee name first');
		return;
	}

	//require('db').addItem(name,title);
	//Ti.App.fireEvent('app:updateTables');
	win.close();
};