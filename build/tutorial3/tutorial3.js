// tutorial3.js
"use strict";

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
      React.createElement(CommentList, null),
      React.createElement(CommentForm, null)
    );
  }
});

// tutorial4.js
var Comment = React.createClass({
  displayName: "Comment",

  render: function render() {
    return React.createElement(
      "div",
      { className: "comment" },
      React.createElement(
        "h2",
        { className: "commentAuthor" },
        this.props.author
      ),
      this.props.children
    );
  }
});
// tutorial5.js
var CommentList5 = React.createClass({
  displayName: "CommentList5",

  render: function render() {
    return React.createElement(
      "div",
      { className: "commentList" },
      React.createElement(
        Comment,
        { author: "Pete Hunt" },
        "This is one comment"
      ),
      React.createElement(
        Comment,
        { author: "Jordan Walke" },
        "This is *another* comment"
      )
    );
  }
});

$(function () {
  ReactDOM.render(React.createElement(CommentBox, null), $('#CommentBox')[0]);
  ReactDOM.render(React.createElement(CommentList5, null), $('#CommentList5')[0]);
});