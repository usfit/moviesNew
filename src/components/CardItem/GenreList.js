import React from 'react';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';

function GenreList({ genre, genreList }) {
  const names = genre.map((ind) => {
    const name = genreList[genreList.findIndex((item) => item.id === ind)].name;
    return name;
  });
  const components = names.map((name) => {
    return (
      <Tag color="default" key={uuidv4()}>
        {name}
      </Tag>
    );
  });
  return <div>{components}</div>;
}

export default GenreList;
