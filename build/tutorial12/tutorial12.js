"use strict";

var data = [{
  author: "Pete Hunt",
  text: "This is one comment"
}, {
  author: "Jordan Walke",
  text: "This is *another* comment"
}];
var Comment = React.createClass({
  displayName: "Comment",

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "h2",
        { dddddd: this.props.key, className: "commentAuthor" },
        this.props.author,
        "  ",
        this.props.tempData
      ),
      this.props.children
    );
  }
});
// tutorial10.js
var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    var commentNodes = this.props.data.map(function (comment, key) {
      return React.createElement(
        Comment,
        { key: key, tempData: "附加信息", author: comment.author },
        comment.text
      );
    });
    return React.createElement(
      "div",
      { className: "commentList" },
      commentNodes
    );
  }
});

// tutorial16.js
var CommentForm = React.createClass({
  displayName: "CommentForm",

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var author = this.refs.author.value.trim();
    var text = this.refs.text.value.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });

    // TODO: send request to the server
    this.refs.author.value = '';
    this.refs.text.value = '';
    return;
  },
  render: function render() {
    return React.createElement(
      "form",
      { className: "form", onSubmit: this.handleSubmit },
      React.createElement("input", { type: "text", className: "form-control", placeholder: "Your name", ref: "author" }),
      React.createElement("input", { type: "text", className: "form-control", placeholder: "Say something...", ref: "text" }),
      React.createElement("input", { type: "submit", className: "btn btn-default", value: "Post" })
    );
  }
});

// tutorial12.js
var CommentBox = React.createClass({
  displayName: "CommentBox",

  loadCommentsFromServer: function loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (function (data) {
        this.setState({
          data: data.data
        });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  handleCommentSubmit: function handleCommentSubmit(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    console.log(newComments);
    this.setState({ data: newComments });
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

  getInitialState: function getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "commentBox" },
      React.createElement(
        "h1",
        null,
        "Comments"
      ),
      React.createElement(CommentList, { data: this.state.data }),
      React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
    );
  }
});

$(function () {

  ReactDOM.render(React.createElement(CommentBox, { url: "/data/reactdata.json", pollInterval: 1112000 }), document.getElementById('Tutorial12'));
  //es5  array indexof
  var arr1 = ['a'];
  var arr2 = ['b', 'c'];
  var arr3 = ['c', 'd', 'e', undefined, null];

  var concat = (function () {
    var concat_ = function concat_(arr1, arr2) {
      for (var i = arr2.length - 1; i >= 0; i--) {
        arr1.indexOf(arr2[i]) === -1 ? arr1.push(arr2[i]) : 0;
      };
    };

    return function (arr) {

      var result = arr;
      for (var i = arguments.length - 1; i >= 1; i--) {
        concat_(result, arguments[i]);
      };
      return result;
    };
  })();

  console.log(concat(arr1, arr2, arr3));

  console.log(arr2.indexOf('ddd'));
});