var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];
var Comment = React.createClass({
	 
	render: function() {
		return (

			<div  className="comment">
	        <h2 dddddd={this.props.key} className="commentAuthor">
	          {this.props.author}  {this.props.tempData}
	        </h2> 
	        {this.props.children}
	      </div>

		);
	}
});
// tutorial10.js
var CommentList = React.createClass({
  render: function() { 
    var commentNodes = this.props.data.map(function (comment,key) { 
      return (
        <Comment key={key} tempData="dsadf" author={comment.author}>
          {comment.text} 
        </Comment>
      );
    }); 
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

 
// tutorial9.js
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});




$(function() {
	ReactDOM.render(
		<CommentBox data={data} />,
		document.getElementById('Tutorial9')
	);

	ReactDOM.render(
		<CommentBox url="http://localhost:818/data/reactdata.json" />,
		document.getElementById('api')
	);
});