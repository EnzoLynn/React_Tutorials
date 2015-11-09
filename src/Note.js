define(function(require, exports, module) {
	var dbHelper = require('build/WebSqlHelper');
	dbHelper.openDatabase();
	 
 
	dbHelper.select('LOGS', '*', {
		"id": 2
	}, function(message) {
		console.log(message);
		if (message.success) {
			for (var i = 0; i < message.result.rows.length; i++) {
				console.log(message.result.rows[i]);
			};
		};
	});
	// dbHelper.update('LOGS',{log:'update'},{
	// 	id:2
	// }, function(message) {
	// 	console.log(message);		 
	// });
	// dbHelper.delete('LOGS',{"id": 1});
	// dbHelper.createTable('test',{id:"integer primary key autoincrement",name:"not null"},function(message){
	// 	 console.log(message);
	// });

	// dbHelper.insert('LOGS',{
	// 	id:3,
	// 	log:(new Date()).getTime()
	// },function(message){
	// 	console.log(message);
	// });
});