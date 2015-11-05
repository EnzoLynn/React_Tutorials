"use strict";

var CommentBox = React.createClass({
	displayName: "CommentBox",

	render: function render() {
		return React.createElement(
			"div",
			{ className: "commentBox" },
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
			React.createElement("input", { type: "text", ref: "myTextInput" }),
			React.createElement("input", {
				type: "button",
				value: "Focus the text input",
				onClick: this.handleClick
			})
		);
	}
});

$(function () {
	ReactDOM.render(React.createElement(CommentBox, null), $('#content')[0]);

	ReactDOM.render(React.createElement(MyComponent, null), document.getElementById('example'));

	(function () {
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
});