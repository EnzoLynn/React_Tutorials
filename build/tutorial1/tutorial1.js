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

$(function () {
	ReactDOM.render(React.createElement(CommentBox, null), $('#content')[0]);
});