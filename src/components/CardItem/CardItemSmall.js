import React from 'react';
import { Typography, Layout, Rate } from 'antd';

import './CardItem.css';

function CardItemSmall({ data }) {
  const { title, date, description, genre, setRatingMovie, rating, imageLoading, shotText, formatData } = data;
  const { Title, Paragraph } = Typography;
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Layout className="CardItem__main-content">
        <Sider className="CardItem__image" width={60}>
          {imageLoading}
        </Sider>
        <div className="CardItem__header">
          <Title level={4}>{title}</Title>
          <Paragraph className="CardItem__data">{formatData(date)}</Paragraph>
          {genre}
        </div>
      </Layout>
      <Layout>
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

export default CardItemSmall;
