define(function(require, exports, module) {
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
	}, function(message) {});


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


	let NoteRows = React.createClass({

		render: function() {
			return (
				<tr >
					<td className='NoteRow'>{this.props.note.id}</td>
					<td className='NoteRow'>{this.props.note.title}</td> 
					<td className='NoteRow text-right' style={{width:'100px'}} ddd='ddd'>
						<input className='btn btn-default btn-view' data-id={this.props.note.id} title='查看' type="button" value='>'/>
						<input className='btn btn-default btn-delete'   data-id={this.props.note.id} title='删除' type="button" value='-'/>
					</td> 
				</tr>
			);
		}
	});
	let NoteHead = React.createClass({

		render: function() {
			var str = "btn-clear " + this.props.clearStatus;
			return (
				<div className='text-center topBar'>
					<div>
						<div  className='title' ref='title'>备忘录</div>
						<span style={{float:"right"}}>
							<input className='btn btn-default btn-addNote' title='添加'  type="button" value='+'/>
						</span>
					</div>

					<div className="input-group btn_search">  
 						<span className="input-group-addon" >Search</span>
  						<input type="search" className=" form-control txt-search"  placeholder="搜索..." /> 
  						
					</div> 
					<div className={str}  >
						<button type="button" className='clearBtn'>
							<span className='clearBtn' aria-hidden="true">&times;</span>
						</button>
  					</div> 
				</div>
			);
		}
	});


	let NoteList = React.createClass({
		render: function() {
			var rows = [];
			this.props.notes.forEach(function(note, key) {
				rows.push(<NoteRows key={key} note={note}/>);
			});
			return (
				<div>
				<NoteHead addNote={this.props.addNote} clearStatus={this.props.clearStatus}/> 
				<table className='NoteList table table-hover table-striped'> 
						<tbody>
						{rows}
						</tbody>
				</table>
				</div>
			);

		}
	});


	let StatusBar = React.createClass({

		render: function() {
			return (
				<div className='text-center statusBar'>
					{this.props.count} 个备忘录
				</div>
			);
		}
	});

	let Dialog = React.createClass({
		componentDidMount: function() {
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
		render: function() {
			return (
				<div>
					 <div className="modal fade" ref='dialogDiv' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
				        <div className="modal-dialog" role="document">
				            <div className="modal-content">
				                <div className="modal-header">
				                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				                    <h4 className="modal-title">备忘信息</h4>
				                </div>
				                <div className="modal-body">
				                    <form ref='form'  className="form-horizontal">
				                    	 <div className="form-group">
										    <label className="col-sm-2 control-label">标题</label>
										    <div className="col-sm-10">
										      <input type="text" className="form-control" name="title"  ref='title' placeholder="标题"/>
										    </div>
										  </div>
										   <div className="form-group">
										    <label  className="col-sm-2 control-label">内容</label>
										    <div className="col-sm-10">
										      <textarea className="form-control" name="content" ref='content' rows="3" placeholder="内容"></textarea>
										    </div>
										  </div>
				                    </form>
				                </div>
				                <div className="modal-footer">
				                    <button type="button" className="btn btn-default" ref='close' data-dismiss="modal">关闭</button>
				                    <button type="button" className="btn btn-primary btn-saveNote">保存</button>
				                </div>
				            </div>
				        </div>
				    </div>
				</div>
			);
		}
	});


	let NoteApp = React.createClass({
		appClick: function(e) {
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
		clearFilter: function() {
			$('.txt-search').val('');
			this.setState({
				clearStatus: 'hide'
			});
			this.loadCountFromWebsql();
			this.loadNoteFromWebsql();
		},
		runFilter: function(serKey) {

			this.setState({
				clearStatus: 'show'
			});
			this.loadCountFromWebsql({
				title: `%${serKey}%`
			});
			this.loadNoteFromWebsql({
				title: `%${serKey}%`
			});
		},
		appKeyUp: function(e) {
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
		showError: function(errMsg) {
			$(this.refs.errorContent).html(errMsg);
			$(this.refs.error).show();
		},
		hideError: function() {
			$(this.refs.errorContent).html('');
			$(this.refs.error).hide();
		},
		showDialog: function() {
			$(this.refs.dialog.refs.form).data('bootstrapValidator').resetForm();
			$(this.refs.dialog.refs.dialogDiv).modal('show');
		},
		addNote: function() {
			var me = this;

			var form = $(this.refs.dialog.refs.form).data('bootstrapValidator');
			form.validate();
			if (form.isValid()) {
				var title = this.refs.dialog.refs.title.value;
				var content = this.refs.dialog.refs.content.value;
				dbHelper.insert('Notes', {
					title: title,
					content: `${content} <br> ${(new Date()).getTime()}`
				}, function(message) {
					if (message.success) {
						$(me.refs.dialog.refs.dialogDiv).modal('hide');
						me.loadCountFromWebsql();
						me.loadNoteFromWebsql();
					} else {
						me.showError(message);
					}
				});
			}
		},
		viewNote: function(noteid) {
			var me = this;

			$(this.refs.dialog.refs.form).data('bootstrapValidator').resetForm();
			dbHelper.select('Notes', '*', {
				id: noteid
			}, function(message) {

				if (message.success) {
					me.refs.dialog.refs.title.value = message.result.rows[0].title;
					me.refs.dialog.refs.content.value = message.result.rows[0].content;
					$(me.refs.dialog.refs.dialogDiv).modal('show');

				} else {
					me.showError(message);
				}
			});

		},
		deleteNote: function(noteid) {
			var me = this;
			dbHelper.delete('Notes', {
				"id": noteid
			}, function(message) {
				if (message.success) {
					me.loadCountFromWebsql();
					me.loadNoteFromWebsql();
				} else {
					me.showError(message);
				}
			});
		},
		loadNoteFromWebsql: function(opts) {
			var me = this;
			let def = {};
			def = $.extend(def, opts);
			dbHelper.select('Notes', '*', def, function(message) { 
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

		loadCountFromWebsql: function(opts) {
			var me = this;
			let def = {};
			def = $.extend(def, opts);
			dbHelper.select('Notes', 'count(*) as count', def, function(message) {
				if (message.success) {
					me.setState({
						count: message.result.rows[0].count
					});
				} else {
					me.showError(message);
				}
			});
		},
		getInitialState: function() {
			return {
				count: 0,
				notes: [],
				clearStatus: 'hide'
			};
		},
		componentDidMount: function() {
			this.loadCountFromWebsql();
			this.loadNoteFromWebsql();
		},
		render: function() {
			//console.log('app render');
			return (
				<div onClick={this.appClick} onKeyDown={this.appKeyDown} onKeyUp={this.appKeyUp}>
				<div className="alert alert-danger" ref='error' role="alert" style={{display:'none'}}>
					<button type="button" className="close">
						<span className="alert-danger">&times;</span>
					</button>
					<div className="alert-danger" ref='errorContent'></div>
				</div>
				<NoteList notes={this.state.notes} clearStatus={this.state.clearStatus}></NoteList>
				<StatusBar count={this.state.count} ></StatusBar>
				<Dialog ref='dialog'/>
				</div>
			);
		}
	});

	$(function() {
		ReactDOM.render(
			<NoteApp/>,
			$('.content').get(0)
		);

	});

});