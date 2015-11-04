var data = [{
  author: "Pete Hunt",
  text: "This is one comment"
}, {
  author: "Jordan Walke",
  text: "This is *another* comment"
}];
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
    var commentNodes = this.props.data.map(function(comment, key) {
      return (
        <Comment key={key} tempData="附加信息" author={comment.author}>
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

// tutorial16.js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
   

    // TODO: send request to the server
    this.refs.author.value = '';
    this.refs.text.value = '';
    return;
  },
  render: function() {
    return ( 
      <form className="form" onSubmit={this.handleSubmit}>
        <input type="text" className="form-control"  placeholder="Your name" ref="author" />
        <input type="text" className="form-control" placeholder="Say something..." ref="text" />
        <input type="submit"  className="btn btn-default" value="Post" />
      </form>
    );
  }
});



// tutorial12.js
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
       $.ajax({
      url: this.props.url, 
      dataType: 'json',
      cache: false, 
      success: function(data) { 
        this.setState({
          data: data.data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    console.log(newComments);
    this.setState({data: newComments}); 
    // $.ajax({
    //   url: this.props.url,
    //   dataType: 'json',
    //   type: 'POST',
    //   data: comment,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(this.props.url, status, err.toString());
    //   }.bind(this)
    // });
  },


  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
     this.loadCommentsFromServer();
     setInterval(this.loadCommentsFromServer, this.props.pollInterval);

  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm  onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});



$(function() {
 
  ReactDOM.render(
  	<CommentBox url="/data/reactdata.json"  pollInterval={1112000}/>,
  	document.getElementById('Tutorial12')
  );
 //es5  array indexof
  var arr1= ['a'];
  var arr2 = ['b','c'];
  var arr3 = ['c','d','e',undefined,null];

  var concat = (function(){
    var concat_ = function(arr1,arr2){
      for (var i = arr2.length - 1; i >= 0; i--) {
         arr1.indexOf(arr2[i]) === -1?arr1.push(arr2[i]):0;
      };
    };

    return function(arr){ 

      var result = arr;  
      for (var i = arguments.length - 1; i >= 1; i--) {
        concat_(result,arguments[i]);
      }; 
      return result;
    };
  }()); 

  console.log(concat(arr1,arr2,arr3));

  console.log(arr2.indexOf('ddd'));
});