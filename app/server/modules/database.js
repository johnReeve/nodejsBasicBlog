
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbPort = 27017;
var dbHost = global.host;
var dbName = 'database-testing';

var Database = {};
	Database.db = new Db(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}, {}));
	Database.db.open(function(e, d){
		if (e) {
			console.log(e);
		} else {
			console.log('connected to database from database.js :: ' + dbName);
		}
	});
	
	Database.accounts = Database.db.collection('accounts');
	Database.blogPosts = Database.db.collection('blogPosts');


module.exports = Database;