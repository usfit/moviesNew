import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tabs } from 'antd';

import MovieServise from '../../servises/MovieServise';
import MovieView from '../MovieView';
import { Provider } from '../../servises/ServiceContext';
import SearchPanel from '../SearchPanel';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

import './Movie.css';

class Movie extends Component {
  movieServise = new MovieServise();

  state = {
    movieData: null,
    totalResults: 1,
    loading: false,
    error: false,
    errorNetwork: false,
    query: null,
    page: 1,
    genreList: null,
    guestSessionId: null,
    ratedMovieData: null,
    ratedTotalResults: 1,
    ratedPage: 1,
  };

  componentDidMount() {
    this.movieServise.openGuestSession().then(this.newGuestSession).catch(this.onError);
    this.loadGenreList();
    this.getTopMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page, ratedPage } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.updateSearchMovies();
    }
    if (ratedPage !== prevState.ratedPage) {
      this.getRatedMovies();
    }
  }

  onLoadMovies = (result) => {
    const { query } = this.state;
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
    if (!query) {
      this.setState(() => {
        return {
          totalResults: 20,
        };
      });
    }
  };

  getTopMovies = () => {
    this.movieServise.getTopMovies().then(this.onLoadMovies).catch(this.onError);
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

  updateSearchMovies = () => {
    const { query, page } = this.state;
    if (!query) {
      return;
    }
    this.setState(() => {
      return { loading: true };
    });
    this.movieServise.getSearchMovies(query, page).then(this.onLoadMovies).catch(this.onError);
  };

  getGenreList = (result) => {
    const genreList = Array.from(result.genres);
    this.setState(() => {
      return {
        genreList,
      };
    });
  };

  loadGenreList = () => {
    this.movieServise.loadGenreList().then(this.getGenreList).catch(this.onError);
  };

  сlickPagination = (e) => {
    this.setState(() => {
      return {
        page: e,
      };
    });
  };

  queryValue = (e) => {
    const newQuery = e.target.value;
    this.setState(() => {
      return {
        query: newQuery,
      };
    });
  };

  newGuestSession = (result) => {
    const guesSession = result.guest_session_id;
    this.setState(() => {
      return { guestSessionId: guesSession };
    });
  };

  setRatingMovie = (item) => {
    const { guestSessionId } = this.state;
    const rate = item.rating;
    const movieId = item.id;
    this.movieServise.postMovieRating(rate, movieId, guestSessionId).catch(this.onError);
  };

  onLoadRatedMovies = (result) => {
    const movies = result.results;
    const ratedTotalResults = result.total_results;
    if (movies.length !== 0) {
      this.setState(() => {
        return {
          ratedMovieData: movies,
          ratedTotalResults,
        };
      });
    }
  };

  getRatedMovies = () => {
    const { guestSessionId, ratedPage } = this.state;
    if (guestSessionId) {
      this.movieServise.loadRatedMovies(guestSessionId, ratedPage).then(this.onLoadRatedMovies).catch(this.onError);
    }
  };

  changeSearchStatus = () => {
    this.getRatedMovies();
  };

  ratedClickPagination = (e) => {
    this.setState(() => {
      return {
        ratedPage: e,
      };
    });
  };

  render() {
    const {
      movieData,
      totalResults,
      error,
      errorNetwork,
      loading,
      genreList,
      page,
      ratedMovieData,
      ratedTotalResults,
      ratedPage,
      query,
    } = this.state;
    const hasData = !error && !loading;
    const errorMessage = [error ? <ErrorMessage key={uuidv4()} errorNetwork={errorNetwork} /> : null];
    const spin = [loading ? <Spinner key={uuidv4()} /> : null];
    const noneContent = [hasData && !movieData ? <h1 key={uuidv4()}>По вашему запросу ничего не найдено</h1> : null];
    const content = [
      hasData && movieData && genreList ? (
        <MovieView
          movieData={movieData}
          key={uuidv4()}
          totalResults={totalResults}
          сlickPagination={(e) => this.сlickPagination(e)}
          page={page}
          setRatingMovie={(item) => this.setRatingMovie(item)}
        />
      ) : null,
    ];

    const noneRatedContent = [!ratedMovieData ? <h1 key={uuidv4()}>Вы еще не оценили ни один фильм</h1> : null];
    const ratedContent = [
      ratedMovieData ? (
        <MovieView
          movieData={ratedMovieData}
          key={uuidv4()}
          totalResults={ratedTotalResults}
          page={ratedPage}
          сlickPagination={(e) => this.ratedClickPagination(e)}
        />
      ) : null,
    ];

    const tabsItems = [
      {
        label: 'Search',
        key: 'item-1',
        children: (
          <div className="MovieView">
            <SearchPanel query={query} queryValue={(e) => this.queryValue(e)} />
            {errorMessage}
            {spin}
            {noneContent}
            {content}
          </div>
        ),
      },
      {
        label: 'Rated',
        key: 'item-2',
        children: (
          <>
            {noneRatedContent}
            {ratedContent}
          </>
        ),
      },
    ];

    return (
      <Provider value={genreList}>
        <div className="Movies">
          <Tabs centered defaultActiveKey="1" items={tabsItems} onChange={this.changeSearchStatus} />
        </div>
      </Provider>
    );
  }
}

export default Movie;
