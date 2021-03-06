/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;
//var req_url = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json";//"http://192.168.100.112:818/data/movies.json";
 var req_url = "http://192.168.100.112:818/data/movies.json";
 
var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      movies: null,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(req_url)
      .then((response) => response.json())
      .then((responseData) => { 
        this.setState({
          movies: responseData.data,
        });
      })
      .done();
  },
  render: function() {     
    if (!this.state.movies) {
      return this.renderLoadingView();
    }
    var movie = this.state.movies[0];
    return this.renderMovie(movie);
   
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail:{
    width:53,
    height:81
  }
});



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
