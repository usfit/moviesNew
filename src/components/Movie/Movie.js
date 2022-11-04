import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tabs } from 'antd';

import MovieServise from '../../servises/MovieServise';
import MovieView from '../MovieView';

import './Movie.css';

class Movie extends Component {
  movieServise = new MovieServise();

  state = {
    movieData: null,
    totalResults: 0,
    imageURL: 'https://image.tmdb.org/t/p/original',
    loading: true,
    error: false,
    query: 'return',
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
          totalResults,
          loading: false,
        };
      });
    } else {
      this.setState(() => {
        return {
          movieData: null,
          totalResults: 0,
          loading: false,
        };
      });
    }
  };

  updateSearchMovies = () => {
    const { query, page } = this.state;
    if (!query) {
      return;
    }
    this.movieServise.getSearchMovies(query, page).then(this.onLoadMovies).catch(this.onError);
  };

  onError = (e) => {
    if (e.message === 'Failed to fetch') {
      this.setState(() => {
        return {
          errorNetwork: true,
        };
      });
    }
    this.setState(() => {
      return {
        loading: false,
        error: true,
      };
    });
  };

  render() {
    const { movieData, totalResults, imageURL, error, loading } = this.state;
    const hasData = !error && !loading;
    const content = [
      hasData && movieData ? (
        <MovieView imageURL={imageURL} movieData={movieData} key={uuidv4()} totalResults={totalResults} />
      ) : null,
    ];

    const tabsItems = [
      {
        label: 'Search',
        key: 'item-1',
        children: <>{content}</>,
      },
      {
        label: 'Rated',
        key: 'item-2',
        children: <h1>Заглушка</h1>,
      },
    ];

    return (
      <div className="Movies">
        <Tabs centered defaultActiveKey="1" items={tabsItems} />
      </div>
    );
  }
}

export default Movie;
