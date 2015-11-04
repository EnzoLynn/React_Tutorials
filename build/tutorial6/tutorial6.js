"use strict";

var Comment = React.createClass({
	displayName: "Comment",

	rawMarkup: function rawMarkup() {

		var rawMarkup = marked(this.props.children.toString(), {
			sanitize: true
		});
		return {
			__html: rawMarkup
		};
	},

	render: function render() {
		return React.createElement(
			"div",
			{ className: "comment" },
			React.createElement(
				"h2",
				{ className: "commentAuthor" },
				this.props.author
			),
			React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
		);
	}
});

var Tutorial6 = React.createClass({
	displayName: "Tutorial6",

	render: function render() {
		return React.createElement(
			Comment,
			{ author: "author" },
			" ##children This is [an example](http://example.com/ \"Title\") inline link. Use the `printf()` function."
		);
	}
});

$(function () {
	ReactDOM.render(React.createElement(Tutorial6, null), $('#Tutorial6').get(0));
});