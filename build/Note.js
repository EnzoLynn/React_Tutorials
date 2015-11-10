'use strict';

define(function (require, exports, module) {
	var $ = require('jquery.min');
	require('bootstrap.sea')($);
	//validator
	var bsValidator = require('bootstrapValidator.sea')($);

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
				null,
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
					{ className: 'NoteRow text-right', style: { width: '100px' }, ddd: 'ddd' },
					React.createElement('input', { className: 'btn btn-default btn-view', 'data-id': this.props.note.id, 'data-content': this.props.note.content, title: '查看', type: 'button', value: '>' }),
					React.createElement('input', { className: 'btn btn-default btn-delete', 'data-id': this.props.note.id, title: '删除', type: 'button', value: '-' })
				)
			);
		}
	});
	var NoteHead = React.createClass({
		displayName: 'NoteHead',

		render: function render() {
			return React.createElement(
				'tr',
				null,
				React.createElement(
					'th',
					{ colSpan: '3', className: 'text-center' },
					'备忘录',
					React.createElement(
						'span',
						{ style: { float: "right" } },
						React.createElement('input', { className: 'btn btn-default btn-addNote', title: '添加', type: 'button', value: '+' })
					)
				)
			);
		}
	});

	var NoteList = React.createClass({
		displayName: 'NoteList',

		render: function render() {
			var rows = [];
			this.props.notes.forEach(function (note, key) {
				rows.push(React.createElement(NoteRows, { key: key, note: note }));
			});
			return React.createElement(
				'table',
				{ className: 'NoteList table table-hover table-striped' },
				React.createElement(
					'thead',
					null,
					React.createElement(NoteHead, { addNote: this.props.addNote }),
					React.createElement(FilterBar, null)
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
				'tr',
				null,
				React.createElement(
					'th',
					{ colSpan: '3' },
					React.createElement(
						'div',
						{ className: 'input-group btn_search' },
						React.createElement(
							'span',
							{ className: 'input-group-addon' },
							'Search'
						),
						React.createElement('input', { type: 'search', className: ' form-control', placeholder: '搜索...' })
					)
				)
			);
		}
	});
	var StatusBar = React.createClass({
		displayName: 'StatusBar',

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'text-center' },
				this.props.count
			);
		}
	});

	var Dialog = React.createClass({
		displayName: 'Dialog',

		componentDidMount: function componentDidMount() {
			$(this.refs.form).bootstrapValidator({
				message: '验证失败',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					title: {
						message: 'The title is not valid',
						validators: {
							notEmpty: {
								message: '不能为空'
							},
							stringLength: {
								min: 6,
								max: 30,
								message: '长度6~30'
							}
						}
					},
					content: {
						validators: {
							notEmpty: {
								message: '不能为空'
							},
							stringLength: {
								min: 6,
								max: 130,
								message: '长度6~130'
							}
						}
					}
				}
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'modal fade', ref: 'dialogDiv', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel' },
					React.createElement(
						'div',
						{ className: 'modal-dialog', role: 'document' },
						React.createElement(
							'div',
							{ className: 'modal-content' },
							React.createElement(
								'div',
								{ className: 'modal-header' },
								React.createElement(
									'button',
									{ type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
									React.createElement(
										'span',
										{ 'aria-hidden': 'true' },
										'×'
									)
								),
								React.createElement(
									'h4',
									{ className: 'modal-title' },
									'添加备忘信息'
								)
							),
							React.createElement(
								'div',
								{ className: 'modal-body' },
								React.createElement(
									'form',
									{ ref: 'form', className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-2 control-label' },
											'标题'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-10' },
											React.createElement('input', { type: 'text', className: 'form-control', name: 'title', ref: 'title', placeholder: '标题' })
										)
									),
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-2 control-label' },
											'内容'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-10' },
											React.createElement('textarea', { className: 'form-control', name: 'content', ref: 'content', rows: '3', placeholder: '内容' })
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'modal-footer' },
								React.createElement(
									'button',
									{ type: 'button', className: 'btn btn-default', ref: 'close', 'data-dismiss': 'modal' },
									'关闭'
								),
								React.createElement(
									'button',
									{ type: 'button', className: 'btn btn-primary btn-saveNote' },
									'保存'
								)
							)
						)
					)
				)
			);
		}
	});

	var NoteApp = React.createClass({
		displayName: 'NoteApp',

		appClick: function appClick(e) {
			var me = this;
			e.stopPropagation();
			var target = e.target;
			$(this.refs.error).hide();
			console.log(target.tagName + '--' + target.type + '--' + $(target).attr('class'));
			if (target.tagName.toLowerCase() == "input") {
				if (target.type.toLowerCase() == "button") {
					if ($(target).hasClass('btn-addNote')) {
						me.showDialog();
						return;
					}
					if ($(target).hasClass('btn-delete')) {
						me.deleteNote($(target).attr('data-id'));
						return;
					}
				};
			}
			if (target.tagName.toLowerCase() == "button") {
				if (target.type.toLowerCase() == "button") {
					if ($(target).hasClass('btn-saveNote')) {
						me.addNote();
						return;
					}
				}
			};
		},
		showDialog: function showDialog() {
			$(this.refs.dialog.refs.dialogDiv).modal('show');
			$(this.refs.error).html('dd');
			$(this.refs.error).show();
		},
		addNote: function addNote() {
			var me = this;
			var title = this.refs.dialog.refs.title.value;
			var content = this.refs.dialog.refs.title.content;
			var form = $(this.refs.dialog.refs.form).data('bootstrapValidator');
			form.validate();
			alert(form.isValid());
			return;
			dbHelper.insert('Notes', {
				title: title,
				content: content + ' <br> ' + new Date().getTime()
			}, function (message) {
				if (message.success) {
					$(me.refs.dialog.refs.dialogDiv).modal('hide');
					me.loadCountFromWebsql();
					me.loadNoteFromWebsql();
				} else {}
			});
		},
		deleteNote: function deleteNote(noteid) {
			var me = this;
			console.log(noteid);
			dbHelper['delete']('Notes', {
				"id": noteid
			}, function (message) {
				if (message.success) {
					me.loadCountFromWebsql();
					me.loadNoteFromWebsql();
				} else {
					console.log(message);
				}
			});
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

		loadCountFromWebsql: function loadCountFromWebsql() {
			var me = this;
			dbHelper.select('Notes', 'count(*) as count', false, function (message) {
				if (message.success) {
					me.setState({
						count: message.result.rows[0].count
					});
				};
			});
		},
		getInitialState: function getInitialState() {
			return {
				count: 0,
				notes: []
			};
		},
		componentDidMount: function componentDidMount() {
			this.loadCountFromWebsql();
			this.loadNoteFromWebsql();
		},
		render: function render() {
			return React.createElement(
				'div',
				{ onClick: this.appClick },
				React.createElement('div', { className: 'alert alert-danger', ref: 'error', role: 'alert', style: { display: 'none' } }),
				React.createElement(NoteList, { notes: this.state.notes }),
				React.createElement(StatusBar, { count: this.state.count }),
				React.createElement(Dialog, { ref: 'dialog' })
			);
		}
	});

	$(function () {
		ReactDOM.render(React.createElement(NoteApp, null), $('.content').get(0));
	});
});