var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
		);
	}
});
var MyComponent = React.createClass({
	handleClick: function() {
		// Explicitly focus the text input using the raw DOM API. 
		this.refs['myTextInput'].focus();
	},
	render: function() {
		// The ref attribute adds a reference to the component to
		// this.refs when the component is mounted.
		return (
			<div>
        <input type="text" ref="myTextInput" />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleClick}
        />
      </div>
		);
	}
});



$(function() {
	ReactDOM.render(
		<CommentBox />,
		$('#content')[0]
	);

	ReactDOM.render(
		<MyComponent />,
		document.getElementById('example')
	);

	(() => {
		console.log('Welcome to the Internet.');
	})();
 
	const a  = 'foobar';
	const b = `foo${a}bar`;
	const c = 'foobar';

	console.log(b);

	const arr = [1, 2, 3, 4];
 

	// good
	const [first, second] = arr;
	console.log(first);
 


});