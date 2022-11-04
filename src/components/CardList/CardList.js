import React from 'react';
import { Row, Col, Pagination } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import CardItem from '../CardItem';

import notFound from './notFound.png';

import './CardList.css';

function CardList({ movieData, totalResults, imageURL }) {
  let components = null;
  components = movieData.map((item) => {
    const image = [item.poster_path ? `${imageURL}${item.poster_path}` : notFound];
    return (
      <Col key={uuidv4()}>
        <CardItem
          key={uuidv4()}
          title={item.title}
          date={item.release_date}
          description={item.overview}
          image={image}
        />
      </Col>
    );
  });

  return (
    <div className="CardList">
      <Row gutter={[36, 35]} justify="center">
        {components}
      </Row>
      <Pagination total={totalResults} pageSize={20} showSizeChanger={false} defaultCurrent={1} current={1} />
    </div>
  );
}

export default CardList;
