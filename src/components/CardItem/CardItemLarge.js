import React from 'react';
import { Typography, Layout, Rate } from 'antd';

import './CardItem.css';

function CardItemLarge({ data }) {
  const { title, date, description, genre, setRatingMovie, rating, imageLoading, shotText, formatData } = data;
  const { Title, Paragraph } = Typography;
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Sider className="CardItem__image" width={183}>
        {imageLoading}
      </Sider>
      <Layout className="CardItem__main-content">
        <div className="CardItem__header">
          <Title level={4}>{`${title}`}</Title>
          <Paragraph className="CardItem__data">{formatData(date)}</Paragraph>
          {genre}
        </div>
        <Content>{shotText(description)}</Content>
        <Rate
          className="stars"
          allowHalf
          count={10}
          onChange={(e) => setRatingMovie(e)}
          defaultValue={rating}
          allowClear={false}
        />
      </Layout>
    </Layout>
  );
}

export default CardItemLarge;
