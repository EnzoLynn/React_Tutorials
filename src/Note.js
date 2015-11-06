define(function(require, exports, module) {
	var dbHelper = require('build/WebSqlHelper');
	dbHelper.openDatabase();
	 
 
	dbHelper.select('LOGS', '*', {
		"id": 1
	}, function(message) {
		console.log(message);
		if (message.success) {
			for (var i = 0; i < message.result.rows.length; i++) {
				console.log(message.result.rows[i]);
			};
		};
	});

	// dbHelper.insert('LOGS',{
	// 	id:3,
	// 	log:(new Date()).getTime()
	// },function(message){
	// 	console.log(message);
	// });
});