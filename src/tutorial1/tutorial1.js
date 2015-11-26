var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
		);
	}
});
var MyComponent = React.createClass({
	handleClick: function() {
		// Explicitly focus the text input using the raw DOM API. 
		this.refs['myTextInput'].focus();
	},
	render: function() {
		// The ref attribute adds a reference to the component to
		// this.refs when the component is mounted.
		return (
			<div>
        <input type="text" ref="myTextInput" />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
		);
	}
});



$(function() {
	ReactDOM.render(
		<CommentBox />,
		$('#content')[0]
	);

	ReactDOM.render(
		<MyComponent />,
		document.getElementById('example')
	);

	(() => {
		console.log('Welcome to the Internet.');
	})();

	const a = 'foobar';
	const b = `foo${a}bar`;
	const c = 'foobar';

	console.log(b);

	const arr = [1, 2, 3, 4];


	// good
	const [first, second] = arr;
	console.log(first);

	const user = {
		firstName: 'aaa',
		lastName: 'bbb'
	};
	// best
	function getFullName({
		firstName, lastName
	}) {
		console.log(firstName);
	}
	getFullName(user);

	var input = {
		left: 1,
		right: 2,
		top: 3,
		bottom: 4
	};
	// good
	function processInput({
		left, right, top, bottom
	}) {
		//const { left, right, top, bottom} = input;
		return {
			left, right, top, bottom
		};
	}

	const {
		left, right, bottom
	} = processInput(input);

	console.log(left + '=' + bottom);

	// good
	var dd = [1, 2, 3].map((x) => {
		console.log(x);
		return x * x;
	});

	var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
		tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
		tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
	});

	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM LOGS', [], function(tx, results) {
			var len = results.rows.length,
				i;
			var msg = "<p>Found rows: " + len + "</p>";
			console.log(msg);

			for (i = 0; i < len; i++) {
				console.log(results.rows.item(i).log);
			}

		}, null);
	});


	function a1() {
		var funcs = [];
		for (let i = 0; i < 10; i++) {  			
			funcs[i] =  function(){
					return i;
				};
		}
		return funcs;
	}
	console.log(a1());
});