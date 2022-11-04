import React from 'react';

import CardItemLarge from './CardItemLarge';
import CardItemSmall from './CardItemSmall';

function CardItem({ title, date, description, image }) {
  const cardItem =
    window.innerWidth > 520 ? (
      <CardItemLarge title={title} date={date} description={description} image={image} />
    ) : (
      <CardItemSmall title={title} date={date} description={description} image={image} />
    );
  return cardItem;
}

export default CardItem;
