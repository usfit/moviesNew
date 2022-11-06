import React from 'react';

import CardList from '../CardList';

function MovieView({ movieData, totalResults, imageURL, сlickPagination, page, setRatingMovie }) {
  return (
    <CardList
      movieData={movieData}
      totalResults={totalResults}
      imageURL={imageURL}
      сlickPagination={(e) => сlickPagination(e)}
      page={page}
      setRatingMovie={(item) => setRatingMovie(item)}
    />
  );
}

export default MovieView;
