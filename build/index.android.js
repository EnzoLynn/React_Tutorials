/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var AppRegistry = React.AppRegistry;
var Image = React.Image;
var StyleSheet = React.StyleSheet;
var Text = React.Text;
var View = React.View;

//var req_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";//"http://192.168.100.112:818/data/movies.json";
var req_url = "http://192.168.100.112:818/data/movies.json";

var AwesomeProject = React.createClass({
  displayName: 'AwesomeProject',

  getInitialState: function getInitialState() {
    return {
      movies: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.fetchData();
  },
  fetchData: function fetchData() {
    var _this = this;

    fetch(req_url).then(function (response) {
      return response.json();
    }).then(function (responseData) {
      _this.setState({
        movies: responseData.data
      });
    }).done();
  },
  render: function render() {
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    var movie = this.state.movies[0];
    return this.renderMovie(movie);
  },
  renderLoadingView: function renderLoadingView() {
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        Text,
        null,
        'Loading movies...'
      )
    );
  },
  renderMovie: function renderMovie(movie) {
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(Image, {
        source: { uri: movie.posters.thumbnail },
        style: styles.thumbnail
      }),
      React.createElement(
        View,
        { style: styles.rightContainer },
        React.createElement(
          Text,
          { style: styles.title },
          movie.title
        ),
        React.createElement(
          Text,
          { style: styles.year },
          movie.year
        )
      )
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

AppRegistry.registerComponent('AwesomeProject', function () {
  return AwesomeProject;
});