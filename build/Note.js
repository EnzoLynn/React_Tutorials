'use strict';

define(function (require, exports, module) {
	var $ = require('jquery.min');
	require('bootstrap.sea')($);
	//validator
	var bsValidator = require('bootstrapValidator.sea')($);

	var dbHelper = require('build/WebSqlHelper');

	dbHelper.openDatabase();

	// dbHelper.createTable('Notes', {
	// 	id: "integer primary key autoincrement",
	// 	title: "not null",
	// 	content: ""
	// }, function(message) {
	// });

	// dbHelper.select('LOGS', '*', {
	// 	"id": 2
	// }, function(message) {
	// 	if (message.success) {
	// 		for (var i = 0; i < message.result.rows.length; i++) {
	// 		};
	// 	};
	// });

	// dbHelper.dropTable('test', function(message) {
	// });
	// dbHelper.update('LOGS',{log:'update'},{
	// 	id:2
	// }, function(message) {
	// });
	// dbHelper.delete('LOGS',{"id": 1});
	// dbHelper.createTable('test',{id:"integer primary key autoincrement",name:"not null"},function(message){

	// });

	// dbHelper.insert('Notes',{	

	// 	title:(new Date()).getTime(),
	// 	content:'tes1t'
	// },function(message){
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
					React.createElement('input', { className: 'btn btn-default btn-view', 'data-id': this.props.note.id, title: '查看', type: 'button', value: '>' }),
					React.createElement('input', { className: 'btn btn-default btn-delete', 'data-id': this.props.note.id, title: '删除', type: 'button', value: '-' })
				)
			);
		}
	});
	var NoteHead = React.createClass({
		displayName: 'NoteHead',

		render: function render() {
			var str = "btn-clear " + this.props.clearStatus;
			return React.createElement(
				'div',
				{ className: 'text-center topBar' },
				React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'title', ref: 'title' },
						'备忘录'
					),
					React.createElement(
						'span',
						{ style: { float: "right" } },
						React.createElement('input', { className: 'btn btn-default btn-addNote', title: '添加', type: 'button', value: '+' })
					)
				),
				React.createElement(
					'div',
					{ className: 'input-group btn_search' },
					React.createElement(
						'span',
						{ className: 'input-group-addon' },
						'Search'
					),
					React.createElement('input', { type: 'search', className: ' form-control txt-search', placeholder: '搜索...' })
				),
				React.createElement(
					'div',
					{ className: str },
					React.createElement(
						'button',
						{ type: 'button', className: 'clearBtn' },
						React.createElement(
							'span',
							{ className: 'clearBtn', 'aria-hidden': 'true' },
							'×'
						)
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
				'div',
				null,
				React.createElement(NoteHead, { addNote: this.props.addNote, clearStatus: this.props.clearStatus }),
				React.createElement(
					'table',
					{ className: 'NoteList table table-hover table-striped' },
					React.createElement(
						'tbody',
						null,
						rows
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
				{ className: 'text-center statusBar' },
				this.props.count,
				' 个备忘录'
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
									'备忘信息'
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

			//console.log(target.tagName + '--' + target.type + '--' + $(target).attr('class'));
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
					if ($(target).hasClass('btn-view')) {
						me.viewNote($(target).attr('data-id'));
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
					if ($(target).hasClass('clearBtn')) {
						me.clearFilter();
						return;
					}
				}
			};
			if (target.tagName.toLowerCase() == "div") {

				if ($(target).hasClass('alert-danger')) {
					me.hideError();
					return;
				}
			};
			if (target.tagName.toLowerCase() == "span") {

				if ($(target).hasClass('alert-danger')) {
					me.hideError();
					return;
				}
				if ($(target).hasClass('clearBtn')) {
					me.clearFilter();
					return;
				}
			};
		},
		clearFilter: function clearFilter() {
			$('.txt-search').val('');
			this.setState({
				clearStatus: 'hide'
			});
			this.loadCountFromWebsql();
			this.loadNoteFromWebsql();
		},
		runFilter: function runFilter(serKey) {

			this.setState({
				clearStatus: 'show'
			});
			this.loadCountFromWebsql({
				title: '%' + serKey + '%'
			});
			this.loadNoteFromWebsql({
				title: '%' + serKey + '%'
			});
		},
		appKeyUp: function appKeyUp(e) {
			var me = this;
			e.stopPropagation();
			var target = e.target;

			//console.log(target.tagName + '--' + target.type + '--' + $(target).attr('class'));
			if (target.tagName.toLowerCase() == "input") {
				if (target.type.toLowerCase() == "search") {
					if ($(target).hasClass('txt-search')) {
						var serKey = $(target).val();
						if (serKey != "") {
							me.runFilter(serKey);
						} else {
							me.clearFilter();
						}

						return;
					};
				};
			};
		},
		showError: function showError(errMsg) {
			$(this.refs.errorContent).html(errMsg);
			$(this.refs.error).show();
		},
		hideError: function hideError() {
			$(this.refs.errorContent).html('');
			$(this.refs.error).hide();
		},
		showDialog: function showDialog() {
			$(this.refs.dialog.refs.form).data('bootstrapValidator').resetForm();
			$(this.refs.dialog.refs.dialogDiv).modal('show');
		},
		addNote: function addNote() {
			var me = this;

			var form = $(this.refs.dialog.refs.form).data('bootstrapValidator');
			form.validate();
			//if (form.isValid()) {
			var title = this.refs.dialog.refs.title.value;
			var content = this.refs.dialog.refs.content.value;
			dbHelper.insert('Notes', {
				title: title,
				content: content + ' <br> ' + new Date().getTime()
			}, function (message) {
				if (message.success) {
					$(me.refs.dialog.refs.dialogDiv).modal('hide');
					me.loadCountFromWebsql();
					me.loadNoteFromWebsql();
				} else {
					me.showError(message);
				}
			});
			//}
		},
		viewNote: function viewNote(noteid) {
			var me = this;

			$(this.refs.dialog.refs.form).data('bootstrapValidator').resetForm();
			dbHelper.select('Notes', '*', {
				id: noteid
			}, function (message) {

				if (message.success) {
					me.refs.dialog.refs.title.value = message.result.rows[0].title;
					me.refs.dialog.refs.content.value = message.result.rows[0].content;
					$(me.refs.dialog.refs.dialogDiv).modal('show');
				} else {
					me.showError(message);
				}
			});
		},
		deleteNote: function deleteNote(noteid) {
			var me = this;
			dbHelper['delete']('Notes', {
				"id": noteid
			}, function (message) {
				if (message.success) {
					me.loadCountFromWebsql();
					me.loadNoteFromWebsql();
				} else {
					me.showError(message);
				}
			});
		},
		loadNoteFromWebsql: function loadNoteFromWebsql(opts) {
			var me = this;
			var def = {};
			def = $.extend(def, opts);
			dbHelper.select('Notes', '*', def, function (message) {
				if (message.success) {
					var arr = [];

					for (var i = 0; i < message.result.rows.length; i++) {
						arr.push(message.result.rows[i]);
					};
					me.setState({
						notes: arr
					});
				} else {
					me.showError(message);
				}
			});
		},

		loadCountFromWebsql: function loadCountFromWebsql(opts) {
			var me = this;
			var def = {};
			def = $.extend(def, opts);
			dbHelper.select('Notes', 'count(*) as count', def, function (message) {
				if (message.success) {
					me.setState({
						count: message.result.rows[0].count
					});
				} else {
					me.showError(message);
				}
			});
		},
		getInitialState: function getInitialState() {
			return {
				count: 0,
				notes: [],
				clearStatus: 'hide'
			};
		},
		componentDidMount: function componentDidMount() {
			this.loadCountFromWebsql();
			this.loadNoteFromWebsql();
		},
		render: function render() {
			//console.log('app render');
			return React.createElement(
				'div',
				{ onClick: this.appClick, onKeyDown: this.appKeyDown, onKeyUp: this.appKeyUp },
				React.createElement(
					'div',
					{ className: 'alert alert-danger', ref: 'error', role: 'alert', style: { display: 'none' } },
					React.createElement(
						'button',
						{ type: 'button', className: 'close' },
						React.createElement(
							'span',
							{ className: 'alert-danger' },
							'×'
						)
					),
					React.createElement('div', { className: 'alert-danger', ref: 'errorContent' })
				),
				React.createElement(NoteList, { notes: this.state.notes, clearStatus: this.state.clearStatus }),
				React.createElement(StatusBar, { count: this.state.count }),
				React.createElement(Dialog, { ref: 'dialog' })
			);
		}
	});

	$(function () {
		ReactDOM.render(React.createElement(NoteApp, null), $('.content').get(0));
	});
});