"use strict";

var data = [{ author: "Pete Hunt", text: "This is one comment" }, { author: "Jordan Walke", text: "This is *another* comment" }];
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
        { key: key, tempData: "dsadf", author: comment.author },
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

var CommentForm = React.createClass({
  displayName: "CommentForm",

  render: function render() {
    return React.createElement(
      "div",
      { className: "commentForm" },
      "Hello, world! I am a CommentForm."
    );
  }
});

// tutorial9.js
var CommentBox = React.createClass({
  displayName: "CommentBox",

  render: function render() {
    return React.createElement(
      "div",
      { className: "commentBox" },
      React.createElement(
        "h1",
        null,
        "Comments"
      ),
      React.createElement(CommentList, { data: this.props.data }),
      React.createElement(CommentForm, null)
    );
  }
});

$(function () {
  ReactDOM.render(React.createElement(CommentBox, { data: data }), document.getElementById('Tutorial9'));

  ReactDOM.render(React.createElement(CommentBox, { url: "http://localhost:818/data/reactdata.json" }), document.getElementById('api'));
});