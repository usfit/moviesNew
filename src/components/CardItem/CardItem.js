import React from 'react';

import { Consumer } from '../ServiceContext/ServiceContext';

import CardItemLarge from './CardItemLarge';
import CardItemSmall from './CardItemSmall';
import GenreList from './GenreList';

function CardItem({ title, date, description, image, genre, average, setRatingMovie, movieId }) {
  const rating = localStorage.getItem(movieId) ? JSON.parse(localStorage.getItem(movieId)) : 0;
  const Genre = (
    <Consumer>
      {(genreList) => {
        return <GenreList genre={genre} genreList={genreList} />;
      }}
    </Consumer>
  );
  const cardItem =
    window.innerWidth > 520 ? (
      <CardItemLarge
        title={title}
        date={date}
        description={description}
        image={image}
        genre={Genre}
        average={average}
        setRatingMovie={(e) => setRatingMovie(e)}
        rating={rating}
      />
    ) : (
      <CardItemSmall
        title={title}
        date={date}
        description={description}
        image={image}
        genre={Genre}
        average={average}
        setRatingMovie={(e) => setRatingMovie(e)}
        rating={rating}
      />
    );
  return cardItem;
}

export default CardItem;
