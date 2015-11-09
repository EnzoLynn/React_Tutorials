'use strict';

define(function (require, exports, module) {
	var $ = require('jquery.min.js');
	var dbHelper = require('build/WebSqlHelper');
	dbHelper.openDatabase();

	dbHelper.createTable('Notes', {
		id: "integer primary key autoincrement",
		title: "not null",
		content: ""
	}, function (message) {
		console.log(message);
	});

	// dbHelper.select('LOGS', '*', {
	// 	"id": 2
	// }, function(message) {
	// 	console.log(message);
	// 	if (message.success) {
	// 		for (var i = 0; i < message.result.rows.length; i++) {
	// 			console.log(message.result.rows[i]);
	// 		};
	// 	};
	// });

	// dbHelper.dropTable('test', function(message) {
	// 	console.log(message);		
	// });
	// dbHelper.update('LOGS',{log:'update'},{
	// 	id:2
	// }, function(message) {
	// 	console.log(message);		
	// });
	// dbHelper.delete('LOGS',{"id": 1});
	// dbHelper.createTable('test',{id:"integer primary key autoincrement",name:"not null"},function(message){
	// 	 console.log(message);
	// });

	// dbHelper.insert('Notes',{	

	// 	title:(new Date()).getTime(),
	// 	content:'tes1t'
	// },function(message){
	// 	console.log(message);
	// });
	//
	//

	var NoteRows = React.createClass({
		displayName: 'NoteRows',

		render: function render() {
			return React.createElement(
				'tr',
				{ content: this.props.note.content },
				React.createElement(
					'td',
					{ className: 'NoteRow' },
					this.props.note.id
				),
				React.createElement(
					'td',
					{ className: 'NoteRow' },
					this.props.note.title
				)
			);
		}
	});
	var NoteHead = React.createClass({
		displayName: 'NoteHead',

		addNote: function addNote() {},
		render: function render() {
			return React.createElement(
				'tr',
				{ className: '' },
				React.createElement(
					'th',
					{ colSpan: '2', className: 'text-center' },
					'备忘录',
					React.createElement(
						'span',
						{ style: { float: "right" } },
						React.createElement('input', { className: 'btn btn-default', type: 'button', value: '+', onclick: this.addNote })
					)
				)
			);
		}
	});

	var NoteList = React.createClass({
		displayName: 'NoteList',

		getInitialState: function getInitialState() {
			return {
				notes: []
			};
		},
		loadNoteFromWebsql: function loadNoteFromWebsql() {
			var me = this;
			dbHelper.select('Notes', '*', false, function (message) {
				console.log(message);
				if (message.success) {
					var arr = [];

					for (var i = 0; i < message.result.rows.length; i++) {
						arr.push(message.result.rows[i]);
					};
					me.setState({
						notes: arr
					});
				};
			});
		},
		componentDidMount: function componentDidMount() {
			this.loadNoteFromWebsql();
		},
		render: function render() {
			var rows = [];
			console.log(this.state.notes);
			this.state.notes.forEach(function (note, key) {
				rows.push(React.createElement(NoteRows, { key: key, note: note }));
			});
			return React.createElement(
				'table',
				{ className: 'NoteList table table-hover' },
				React.createElement(
					'thead',
					null,
					React.createElement(NoteHead, null)
				),
				React.createElement(
					'tbody',
					null,
					rows
				)
			);
		}
	});

	$(function () {
		ReactDOM.render(React.createElement(NoteList, null), $('.content').get(0));
	});
});