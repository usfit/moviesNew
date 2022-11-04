import React from 'react';

import CardList from '../CardList';
import SearchPanel from '../SearchPanel';

import './MovieView.css';

function MovieView({ movieData, totalResults, imageURL }) {
  return (
    <div className="MovieView">
      <SearchPanel />
      <CardList movieData={movieData} totalResults={totalResults} imageURL={imageURL} />
    </div>
  );
}

export default MovieView;
