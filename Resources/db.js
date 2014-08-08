var DATABASE_NAME = 'outing';

exports.createDb = function() {
	// when you need to clear DB
	var db = Ti.Database.open(DATABASE_NAME);
	db.remove();
	db = null;
	Ti.Database.install('outing.sqlite', DATABASE_NAME);
};

exports.selectItems = function(_contacted) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select ROWID, * from attendees where contacted = ?', _contacted);
	while (rows.isValidRow()) {
		retData.push({name:rows.fieldByName('name'), title:rows.fieldByName('title'), group:rows.fieldByName('group'), contacted:rows.fieldByName('contacted'), id:rows.fieldByName('ROWID')});
		rows.next();
	}
	db.close();
	return retData;
};

exports.updateItem = function(_ROWID, _contacted) { 
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('update attendees set contacted = ? where ROWID = ?', _contacted, _ROWID);
	var rows = mydb.execute('select * from attendees where contacted = ?', _contacted);
	mydb.close();
	return rows;
};

exports.addItem = function(_name,_title) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into attendees values (?,?,"",0)', _name, _title);
	mydb.close();
};

exports.deleteItem = function(_ROWID) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('delete from attendees where ROWID = ?', _ROWID);
	mydb.close();
};