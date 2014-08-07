var DATABASE_NAME = 'outing';

exports.createDb = function() {
	Ti.Database.install('outing.sqlite', DATABASE_NAME);
};

exports.selectItems = function(_contacted) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select id, * from attendees where contacted = ?', _contacted);
	while (rows.isValidRow()) {
		retData.push({item:rows.fieldByName('name'), id:rows.fieldByName('id')});
		rows.next();
	}
	db.close();
	return retData;
};

exports.updateItem = function(_id, _contacted) { 
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('update attendees set contacted = ? where id = ?', _contacted, _id);
	var rows = mydb.execute('select * from attendees where contacted = ?', _contacted);
	mydb.close();
	return rows;
};

exports.addItem = function(_name,_title) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('insert into attendees values (?,?,"",0)', _name, _title);
	mydb.close();
};

exports.deleteItem = function(_id) {
	var mydb = Ti.Database.open(DATABASE_NAME);
	mydb.execute('delete from attendees where id = ?', _id);
	mydb.close();
};