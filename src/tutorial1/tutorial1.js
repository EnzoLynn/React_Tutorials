var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
		);
	}
});


$(function() { 
	ReactDOM.render(
		<CommentBox />,
		$('#content')[0]
	);
});