"use strict";

define(function (require, exports, module) {
	var jquery = require('jquery.min');
	/**
  * [message description]
  * @param  {[type]} options.success [description]
  * @param  {[type]} options.msg     [description]
  * @param  {[type]} options.result  [description]
  * @return {[type]}                 [description]
  */
	var message = function message(_ref) {
		var success = _ref.success;
		var msg = _ref.msg;
		var result = _ref.result;

		return {
			success: success, msg: msg, result: result
		};
	};
	var helper = {
		db: null,
		createTable: function createTable(tableName, fields, callback) {
			var me = this;
			if (me.db == null) {
				me.openDatabase();
			}

			var sql = "CREATE TABLE IF NOT EXISTS " + tableName + " (";

			for (var key in fields) {
				var temp = fields[key] == "" ? "null" : fields[key];
				sql += key + " " + temp + ",";
			}

			sql = sql.substr(0, sql.length - 1);

			sql += ")";
			me.executeSql(sql, [], function (tx, result) {
				if (typeof callback == 'function') {
					callback(new message({
						success: true,
						msg: 'ok',
						result: result
					}));
				}
				return true;
			}, function (tx, errmsg) {
				if (typeof callback == 'function') {
					callback(new message({
						success: false,
						msg: errmsg,
						result: null
					}));
				}
				return false;
			});
		},
		/**
   * [openDatabase description]
   * @param  {[type]} opts [description]
   * databaseName,version,description,size
   * @return {[type]}      [description]
   */
		openDatabase: (function (_openDatabase) {
			function openDatabase(_x) {
				return _openDatabase.apply(this, arguments);
			}

			openDatabase.toString = function () {
				return _openDatabase.toString();
			};

			return openDatabase;
		})(function (opts) {
			var me = this;
			var def = {
				databaseName: 'appDatabase',
				version: '1.0',
				description: 'DB default',
				size: 2 * 1024 * 1024
			};
			def = jquery.extend(def, opts);
			me.db = openDatabase(def.databaseName, def.version, def.description, def.size);
			return me.db;
		}),
		executeSql: function executeSql(sql, params, sucFun, errFun) {
			var me = this;
			if (me.db == null) {
				me.openDatabase();
			}
			//transaction(querysqlFun, errorCallback, successCallback);
			me.db.transaction(function (tx) {
				// executeSql(sqlStatement, arguments, callback, errorCallback);
				tx.executeSql(sql, params, function (tx, result) {
					if (typeof sucFun == 'function') {
						sucFun(tx, result);
					}
					return true;
				}, function (tx, errmsg) {
					if (typeof errFun == 'function') {
						errFun(tx, errmsg);
					}
					return false;
				});
			}, function (tx, errmsg) {
				console.log("transaction errer: " + errmsg);
				return false;
			}, function (tx, result) {
				return true;
			});
		},
		insert: function insert(tableName, objs, callback) {
			var me = this;
			var prefix = "INSERT INTO " + tableName + " (";
			var mid = ') values (';
			var suffix = ')';
			var fields = '';
			var values = '';
			var params = [];
			for (var key in objs) {
				fields += key + ',';
				values += '?,';
				params.push(objs[key]);
			}
			fields = fields.substring(0, fields.length - 1);
			values = values.substring(0, values.length - 1);

			var sql = prefix + fields + mid + values + suffix;
			me.executeSql(sql, params, function (tx, result) {
				if (typeof callback == 'function') {
					callback(new message({
						success: true,
						msg: 'ok',
						result: result
					}));
				}
				return true;
			}, function (tx, errmsg) {
				if (typeof callback == 'function') {
					callback(new message({
						success: false,
						msg: errmsg,
						result: null
					}));
				}
				return false;
			});
		},
		select: function select(tableName, selectFileds, whereObj, callback) {

			var me = this;
			var sel = selectFileds == '' ? '*' : selectFileds;
			var prefix = "SELECT " + sel + " FROM " + tableName + " ";
			var where = ' where ';
			var params = [];
			var sql = prefix;
			if (typeof whereObj == 'object') {
				for (var key in whereObj) {

					where += key + "=? and ";
					params.push(whereObj[key]);
				}
				where = where.substring(0, where.length - 4);
				sql += where;
			};
			me.executeSql(sql, params, function (tx, result) {
				if (typeof callback == 'function') {
					callback(new message({
						success: true,
						msg: 'ok',
						result: result
					}));
				}
				return true;
			}, function (tx, errmsg) {
				if (typeof callback == 'function') {
					callback(new message({
						success: false,
						msg: errmsg,
						result: null
					}));
				}
				return false;
			});
		},
		update: function update(tableName, fileds, whereObj, callback) {
			var me = this;
			var sql = "update " + tableName + " set ";
			var params = [],
			    where = ' where ';

			for (var key in fileds) {
				sql += key + "=?,";
				params.push(fileds[key]);
			}
			sql = sql.substr(0, sql.length - 1);

			if (typeof whereObj != "undefined") {
				for (var key in whereObj) {
					where += key + "=? and ";
					params.push(whereObj[key]);
				}
				where = where.substring(0, where.length - 4);
				sql += where;
			}

			me.executeSql(sql, params, function (tx, result) {
				if (typeof callback == 'function') {
					callback(new message({
						success: true,
						msg: 'ok',
						result: result
					}));
				}
				return true;
			}, function (tx, errmsg) {
				if (typeof callback == 'function') {
					callback(new message({
						success: false,
						msg: errmsg,
						result: null
					}));
				}
				return false;
			});
		},
		"delete": function _delete(tableName, whereObj, callback) {
			var me = this;
			var sql = "delete from " + tableName;
			var where = ' where ';
			var params = [];
			if (typeof whereObj == 'object') {
				for (var key in whereObj) {

					where += key + "=? and ";
					params.push(whereObj[key]);
				}
				where = where.substring(0, where.length - 4);
				sql += where;
			};

			me.executeSql(sql, params, function (tx, result) {
				if (typeof callback == 'function') {
					callback(new message({
						success: true,
						msg: 'ok',
						result: result
					}));
				}
				return true;
			}, function (tx, errmsg) {
				if (typeof callback == 'function') {
					callback(new message({
						success: false,
						msg: errmsg,
						result: null
					}));
				}
				return false;
			});
		}
	};

	module.exports = helper;
});