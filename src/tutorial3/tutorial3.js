// tutorial3.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

// tutorial4.js
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}  
        </h2>
        {this.props.children}  
      </div>
    );
  }
});
// tutorial5.js
var CommentList5 = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment 1</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});

$(function() { 
	ReactDOM.render(
		<CommentBox />,
		$('#CommentBox')[0]
	);
	ReactDOM.render(
		<CommentList5 />,
		$('#CommentList5')[0]
	);
});
