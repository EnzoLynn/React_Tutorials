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
				</tr>
			);
		}
	});
	let NoteHead = React.createClass({
		addNote: function() {

		},
		render: function() {
			return (
				<tr className=''>
				<th colSpan='2' className='text-center'>
					备忘录
					<span style={{float:"right"}}>
					<input className='btn btn-default' type="button" value='+' onclick={this.addNote}/>
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
						notes:arr
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
				<table className='NoteList table table-hover'>
						<thead><NoteHead/></thead>
						<tbody>
						{rows}
						</tbody>
				</table>
			);

		}
	});
	 
	$(function() {
		ReactDOM.render(
			<NoteList />,
			$('.content').get(0)
		);
	});

});