"use strict";

var CommentBox = React.createClass({
	displayName: "CommentBox",

	render: function render() {
		return React.createElement(
			"div", {
				className: "commentBox"
			},
			"Hello, world! I am a CommentBox."
		);
	}
});
var MyComponent = React.createClass({
	displayName: "MyComponent",

	handleClick: function handleClick() {
		// Explicitly focus the text input using the raw DOM API.
		this.refs['myTextInput'].focus();
	},
	render: function render() {
		// The ref attribute adds a reference to the component to
		// this.refs when the component is mounted.
		return React.createElement(
			"div",
			null,
			React.createElement("input", {
				type: "text",
				ref: "myTextInput"
			}),
			React.createElement("input", {
				type: "button",
				value: "Focus the text input",
				onClick: this.handleClick
			})
		);
	}
});

$(function() {
	ReactDOM.render(React.createElement(CommentBox, null), $('#content')[0]);

	ReactDOM.render(React.createElement(MyComponent, null), document.getElementById('example'));

	(function() {
		console.log('Welcome to the Internet.');
	})();

	var a = 'foobar';
	var b = "foo" + a + "bar";
	var c = 'foobar';

	console.log(b);

	var arr = [1, 2, 3, 4];

	// good
	var first = arr[0];
	var second = arr[1];

	console.log(first);

	var user = {
		firstName: 'aaa',
		lastName: 'bbb'
	};
	// best
	function getFullName(_ref) {
		var firstName = _ref.firstName;
		var lastName = _ref.lastName;

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
	function processInput(_ref2) {
		var left = _ref2.left;
		var right = _ref2.right;
		var top = _ref2.top;
		var bottom = _ref2.bottom;

		//const { left, right, top, bottom} = input;
		return {
			left: left,
			right: right,
			top: top,
			bottom: bottom
		};
	}

	var _processInput = processInput(input);

	var left = _processInput.left;
	var right = _processInput.right;
	var bottom = _processInput.bottom;

	console.log(left + '=' + bottom);

	// good
	var dd = [1, 2, 3].map(function(x) {
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
				alert(results.rows.item(i).log);
			}

		}, null);
	});
});