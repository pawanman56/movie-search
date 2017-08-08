import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      movieName: null,
      searchResult: [],
      error: false
    };
    this.setMovieName = this.setMovieName.bind(this);
    this.movieSearch = this.movieSearch.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }

  setMovieName = (e) => {
      this.setState({ movieName: e.target.value })
  }

  movieSearch = () => {
    this.callAPI(this.state.movieName);
  }

  callAPI = (searchQuery) => {
    const APIKEY = 'fbb46a6ea27d8b56f354d97a6704acb9';
    const URL = 'https://api.themoviedb.org/3/search/movie?';

    let self = this;

    axios.get(`${URL}&api_key=${APIKEY}&query=${searchQuery}`)
    .then(function (response) {
      self.setState({ searchResult: response.data.results, error: false });
      if(response.data.results.length === 0) {
        self.setState({ error: true });
      }
    })
    .catch(function (error) {
      self.setState({ error: true });
    });
  }

  errorMessage = () => {
    if(this.state.error) {
      return (
        <div className='error-message'>
          <span>Oops! Something went wrong</span>
        </div>
      )
    }
  }

  render() {
    let displayMovieResults = this.state.searchResult.map((movie) => {
      return (
        <div key={movie.id} className="movie-list">
          <span>Movie: {movie.title}</span>
          <img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} alt={movie.title}/>
        </div>
      )
    });

    return (
      <div className='root'>
        <div className='website-header'>
          <h1>Movie Search</h1>
        </div>
        <div className='input-form'>
          <input type='text' placeholder='Search Movie...' onChange={this.setMovieName}/>
          <input type='button' value='Search' onClick={this.movieSearch}/>
        </div>
        { this.errorMessage() }

        <div className="movie-results">
          { displayMovieResults }
        </div>
      </div>
    );
  }
}

export default App;
