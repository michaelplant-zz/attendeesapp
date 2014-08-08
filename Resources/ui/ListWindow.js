var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.ListWindow = function(args) {
	var AddWindow = require('ui/AddWindow').AddWindow;
	var EditWindow = require('ui/EditWindow').EditWindow;
	var self = Ti.UI.createWindow(args);
	var tableview = Ti.UI.createTableView();
	var isDone = args.isDone;

	tableview.setData(getTableData(isDone));

	// Need to add a special 'add' button in the 'Todo' window for Mobile Web
	if (isDone || platform !== 'mobileweb') {
		self.add(tableview);
	}

	if (!isDone) {
		if (platform !== 'android') {
			var addBtn = Ti.UI.createButton({
				title:'+'
			});
			addBtn.addEventListener('click', function() {
				new AddWindow().open();
			});
			if (platform === 'mobileweb') {
				self.layout = 'vertical';
				addBtn.height = 40;
				addBtn.width = 40;
				addBtn.top = 0;
				addBtn.right = 10;
				self.add(addBtn);
				self.add(tableview);
			}
			else{
				self.rightNavButton = addBtn;
			}
		}
	}

	tableview.addEventListener('click', function(e) {
		new EditWindow(e.row.id,e.row.attendeeName,e.row.attendeeTitle).open();
		//createConfirmDialog(e.row.id, e.row.title, isDone).show();
	});

	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData(isDone));
	});

	return self;
};

var getTableData = function(done) {
	var db = require('db');
	var data = [];
	var row = null;
	var attendees = db.selectItems(done);

	for (var i = 0; i < attendees.length; i++) {
		row = Ti.UI.createTableViewRow({
			id: attendees[i].id,
			attendeeName: attendees[i].name,
			attendeeTitle: attendees[i].title,
			height: 80
		});
		
		var group = Ti.UI.createLabel({
			backgroundImage: 'images/icon-flag.png',
			color: 'white',
		    text: attendees[i].group,
		    touchEnabled: false,
		    left: 20,
		    width: 40,
		    height: 40,
		    font: { fontSize:16 },
		    textAlign: 'center'
		});
		row.add(group);
		
		var picture = Ti.UI.createImageView({
		  image:'/images/profile.jpg',
		  left: 70,
		  top: 10,
		  width: 40,
		  height: 40
		});
		row.add(picture);
		
		var name = Ti.UI.createLabel({
		    text: attendees[i].name,
		    touchEnabled: false,
		    left:120,
		    top: 10,
		    width: '75%',
		    height: 20,
		    font: { fontSize: 16, fontWeight: 'bold' }
		});
		row.add(name);
		
		var title = Ti.UI.createLabel({
		    text: attendees[i].title,
		    touchEnabled: false,
		    left: 120,
		    top: 30,
		    width: 200,
		    height: 20,
		    font: { fontSize:16, fontStyle: 'italic' }
		});
		row.add(title);
		
		var contacted = Ti.UI.createSwitch({
		  value:attendees[i].contacted, // mandatory property for iOS
		  right: 10, 
		  top: 20
		});
		row.add(contacted);
		
		data.push(row);
	}
	return data;
};

var createConfirmDialog = function(id, title, isDone) {
	var db = require('db');
	var buttons, doneIndex, clickHandler;

	if (isDone) {
		buttons = ['Delete', 'Cancel'];
		clickHandler = function(e) {
			if (e.index === 0) {
				deleteItem(db, id, isDone);
				Ti.App.fireEvent('app:updateTables');
			}
		};
	} else {
		buttons = ['Contacted', 'Delete', 'Cancel'];
		clickHandler = function(e) {
			if (e.index === 0) {
				db.updateItem(id, 1);
				Ti.App.fireEvent('app:updateTables');
			} else if (e.index === 1) {
				deleteItem(db, id, isDone);
				Ti.App.fireEvent('app:updateTables');
			}
		};
	}

	var confirm = Ti.UI.createAlertDialog({
		title: 'Change Attendee Status',
		message: title,
		buttonNames: buttons
	});
	confirm.addEventListener('click', clickHandler);

	return confirm;
};

var deleteItem = function(db, id, isDone) {
	if (platform === 'mobileweb') {
		db.deleteItem(id, isDone);
	}
	else {
		db.deleteItem(id);
	}
};
