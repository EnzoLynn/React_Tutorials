var Comment = React.createClass({
	rawMarkup: function() {

		var rawMarkup = marked(this.props.children.toString(), {
			sanitize: true
		});
		return {
			__html: rawMarkup
		};
	},

	render: function() {
		return (

			<div className="comment">
	        <h2 className="commentAuthor">
	          {this.props.author}
	        </h2>
	        <span dangerouslySetInnerHTML={this.rawMarkup()} />
	      </div>

		);
	}
});

var Tutorial6 = React.createClass({
	render: function() {
		return (<Comment author='author' > ##children
			This is [an example](http://example.com/ "Title") inline link.
			Use the `printf()` function.
		</Comment>);
	}
});

$(function() {
	ReactDOM.render(
		<Tutorial6 />,
		$('#Tutorial6').get(0));
});