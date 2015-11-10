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
				),
				React.createElement(
					'td',
					{ className: 'NoteRow text-right', style: { width: '100px' } },
					React.createElement('input', { className: 'btn btn-default', title: '查看', type: 'button', value: '>' }),
					React.createElement('input', { className: 'btn btn-default', title: '删除', type: 'button', value: '-' })
				)
			);
		}
	});
	var NoteHead = React.createClass({
		displayName: 'NoteHead',

		addNote: function addNote() {},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'tr',
					null,
					React.createElement(
						'th',
						{ colSpan: '3', className: 'text-center' },
						'备忘录',
						React.createElement(
							'span',
							{ style: { float: "right" } },
							React.createElement('input', { className: 'btn btn-default', title: '添加', type: 'button', value: '+', onclick: this.addNote })
						)
					)
				),
				React.createElement(
					'tr',
					null,
					React.createElement(
						'th',
						null,
						React.createElement(FilterBar, null)
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
				{ className: 'NoteList table table-hover table-striped' },
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

	var FilterBar = React.createClass({
		displayName: 'FilterBar',

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement('input', { className: 'btn_search', type: 'search', placeholder: '搜索...' })
			);
		}
	});
	var StatusBar = React.createClass({
		displayName: 'StatusBar',

		render: function render() {
			return React.createElement('div', null);
		}
	});

	var NoteApp = React.createClass({
		displayName: 'NoteApp',

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(NoteList, null),
				React.createElement(StatusBar, null)
			);
		}
	});

	$(function () {
		ReactDOM.render(React.createElement(NoteApp, null), $('.content').get(0));
	});
});