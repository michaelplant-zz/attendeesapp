exports.EditWindow = function(_rowID, _rowName, _rowTitle) {
	console.log(_rowID,_rowTitle);
	var db = require('db');
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Update Attendee',
		backgroundColor: '#fff',
		layout: 'vertical'
	});
	var nameField = Ti.UI.createLabel({
		width: '300dp',
		height: '45dp',
		top: '40dp',
		text: _rowName,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	var titleField = Ti.UI.createLabel({
		width: '300dp',
		height: '45dp',
		top: '5dp',
		text: _rowTitle,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	var textArea = Ti.UI.createTextArea({
	  borderWidth: 1,
	  borderColor: '#000',
	  borderRadius: 5,
	  color: 'black',
	  font: {fontSize:12, fontWeight:'bold'},
	  textAlign: 'left',
	  hintText: 'Notes',
	  top: '5dp',
	  width: 300, height : 140
	});

	var updateButton = Ti.UI.createButton({
		title: 'Update',
		width: '300dp',
		height: '40dp',
		top: '10dp'
	});
	updateButton.addEventListener('click', function() {
		updateAttendee(nameField.text, titleField.text, textArea.value, self);
	});

	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '300dp',
		height: '40dp',
		top: '10dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});

	self.add(nameField);
	self.add(titleField);
	self.add(textArea);
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
var updateAttendee = function(name, title, notes, win) {
	if (name === '') {
		alert('Please enter an attendee name first');
		return;
	}
	console.log(name,title,notes);
	//require('db').addItem(name,title);
	//Ti.App.fireEvent('app:updateTables');
	win.close();
};