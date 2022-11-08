import React from 'react';

import CardList from '../CardList';

function MovieView({ movieData, totalResults, сlickPagination, page, setRatingMovie }) {
  return (
    <CardList
      movieData={movieData}
      totalResults={totalResults}
      сlickPagination={(e) => сlickPagination(e)}
      page={page}
      setRatingMovie={(item) => setRatingMovie(item)}
    />
  );
}

export default MovieView;
