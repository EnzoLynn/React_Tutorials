define(function(require, exports, module) {
	var $ = require('jquery.min.js');
	var dbHelper = require('build/WebSqlHelper');
	dbHelper.openDatabase();

	dbHelper.createTable('Notes', {
		id: "integer primary key autoincrement",
		title: "not null",
		content: ""
	}, function(message) {
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


	let NoteRows = React.createClass({
		render: function() {
			return (
				<tr content={this.props.note.content}>
					<td className='NoteRow'>{this.props.note.id}</td>
					<td className='NoteRow'>{this.props.note.title}</td> 
					<td className='NoteRow text-right' style={{width:'100px'}}>
						<input className='btn btn-default' title='查看' type="button" value='>'/>
						<input className='btn btn-default' title='删除' type="button" value='-'/>
					</td> 
				</tr>
			);
		}
	});
	let NoteHead = React.createClass({
		addNote: function() {

		},
		render: function() {
			return (
				<tr>
				<th colSpan='3' className='text-center'>
					备忘录
					<span style={{float:"right"}}>
						<input className='btn btn-default' title='添加'  type="button" value='+' onclick={this.addNote}/>
					</span>
				</th>
				</tr>
			);
		}
	});


	let NoteList = React.createClass({
		getInitialState: function() {
			return {
				notes: []
			};
		},
		loadNoteFromWebsql: function() {
			var me = this;
			dbHelper.select('Notes', '*', false, function(message) {
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
		componentDidMount: function() {
			this.loadNoteFromWebsql();
		},
		render: function() {
			var rows = [];
			console.log(this.state.notes);
			this.state.notes.forEach(function(note, key) {
				rows.push(<NoteRows key={key} note={note}/>);
			});
			return (

				<table className='NoteList table table-hover table-striped'>
						<thead>
						<NoteHead/>
						<FilterBar/>
						</thead>
						<tbody>
						{rows}
						</tbody>
				</table>
			);

		}
	});

	let FilterBar = React.createClass({
		render: function() {
			return (
				<tr>
					<th colSpan='3' >
					<div className="input-group btn_search">  
 						<span className="input-group-addon" id="basic-addon1">Search</span>
  						<input type="search" className=" form-control" placeholder="搜索..." /> 
					</div>
					</th>
				</tr>

			);
		}
	});
	let StatusBar = React.createClass({
		getInitialState: function() {
			return {
				count: 0
			};
		},
		loadCountFromWebsql: function() {
			var me = this;
			dbHelper.select('Notes', 'count(*) as count', false, function(message) { 
				if (message.success) { 
					me.setState({
						count: message.result.rows[0].count
					});
				};
			});
		},
		componentDidMount: function() {
			this.loadCountFromWebsql();
		},
		render: function() {
			return (
				<div>
					{this.state.count}
				</div>
			);
		}
	});


	let NoteApp = React.createClass({
		render: function() {
			return (
				<div>
				<NoteList></NoteList>
				<StatusBar></StatusBar>
				</div>
			);
		}
	});

	$(function() {
		ReactDOM.render(
			<NoteApp />,
			$('.content').get(0)
		);
	});

});