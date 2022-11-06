import React from 'react';

import CardList from '../CardList';

function MovieViewRated({ movieData, totalResults, imageURL, page, сlickPagination }) {
  console.log(movieData);
  console.log(totalResults);
  return (
    <CardList
      movieData={movieData}
      totalResults={totalResults}
      imageURL={imageURL}
      page={page}
      сlickPagination={(e) => сlickPagination(e)}
    />
  );
}

export default MovieViewRated;
