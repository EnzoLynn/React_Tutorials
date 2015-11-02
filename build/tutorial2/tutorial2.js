// tutorial2.js
"use strict";

var CommentList = React.createClass({
  displayName: "CommentList",

  render: function render() {
    return React.createElement(
      "div",
      { className: "commentList" },
      "Hello, world! I am a CommentList."
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

$(function () {
  ReactDOM.render(React.createElement(CommentList, null), $('#CommentList')[0]);
  ReactDOM.render(React.createElement(CommentForm, null), $('#CommentForm')[0]);
});