import React, { Component } from "react";

import MovieServise from "../../servises/MovieServise";
import CardList from "../CardList";

import "./Movie.css";

class Movie extends Component {
  movieServise = new MovieServise();

  state = {
    movieData: null,
    query: "return",
    page: 1,
  };

  componentDidMount() {
    this.updateSearchMovies();
  }

  onLoadMovies = (result) => {
    const movies = result.results;
    const totalResults = result.total_results;
    if (movies.length !== 0) {
      this.setState(() => {
        return {
          movieData: movies,
        };
      });
    } else {
      this.setState(() => {
        return {
          movieData: null,
        };
      });
    }
  };

  updateSearchMovies = () => {
    const { query, page } = this.state;
    if (!query) {
      return;
    }
    this.movieServise
      .getSearchMovies(query, page)
      .then(this.onLoadMovies)
      .catch(this.onError);
  };

  render() {
    const { movieData } = this.state;
    console.log(movieData);
    return <CardList />;
  }
}

export default Movie;
