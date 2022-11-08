/* eslint-disable class-methods-use-this */
import React from 'react';
import { format } from 'date-fns';
import { Card } from 'antd';

import { Consumer } from '../../servises/ServiceContext';
import notFound from '../../images/notFound.png';

import CardItemLarge from './CardItemLarge';
import CardItemSmall from './CardItemSmall';
import GenreList from './GenreList';
import ImageLoading from './ImageLoading';

function shotText(description) {
  if (description.length > 150) {
    description = description.slice(0, 150);
    const lastSymbol = description.lastIndexOf(' ');
    const newDesc = `${description.substr(0, lastSymbol)} ...`;
    return newDesc;
  }
  return description;
}

function formatData(data) {
  try {
    return format(new Date(data), 'PP');
  } catch (err) {
    return 'No data';
  }
}

function CardItem({ title, date, description, image, genre, average, setRatingMovie, movieId }) {
  const imageURL = 'https://image.tmdb.org/t/p/original';
  const imagePath = [image ? `${imageURL}${image}` : notFound];
  const rating = localStorage.getItem(movieId) ? JSON.parse(localStorage.getItem(movieId)) : 0;
  const Genre = (
    <Consumer>
      {(genreList) => {
        return <GenreList genre={genre} genreList={genreList} />;
      }}
    </Consumer>
  );
  let colorRate;
  if (average > 7) {
    colorRate = 'colorRare-four';
  } else if (average > 5) {
    colorRate = 'colorRate-three';
  } else if (average > 3) {
    colorRate = 'colorRate--two';
  } else {
    colorRate = 'colorRate--one';
  }
  const imageLoading = <ImageLoading imagePath={imagePath} />;
  const data = {
    title,
    date,
    description,
    genre: Genre,
    setRatingMovie: (e) => setRatingMovie(e),
    rating,
    shotText,
    formatData,
    imageLoading,
  };
  const cardItem = window.innerWidth > 520 ? <CardItemLarge data={data} /> : <CardItemSmall data={data} />;
  const card = (
    <Card className="CardItem">
      <div className={`iconRating ${colorRate}`}>{average}</div>
      {cardItem}
    </Card>
  );

  return card;
}

export default CardItem;
