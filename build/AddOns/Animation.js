'use strict';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var TodoList = React.createClass({
  displayName: 'TodoList',

  getInitialState: function getInitialState() {
    return { items: ['hello', 'world', 'click', 'me'] };
  },
  handleAdd: function handleAdd() {
    var newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({ items: newItems });
  },
  handleRemove: function handleRemove(i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  },
  render: function render() {
    var items = this.state.items.map((function (item, i) {
      return React.createElement(
        'div',
        { key: item, onClick: this.handleRemove.bind(this, i) },
        item
      );
    }).bind(this));
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: this.handleAdd },
        'Add Item'
      ),
      React.createElement(
        ReactCSSTransitionGroup,
        { transitionName: 'example', transitionEnterTimeout: 500, transitionLeaveTimeout: 300 },
        items
      )
    );
  }
});

$(function () {
  ReactDOM.render(React.createElement(TodoList, null), $('#Animation').get(0));
});