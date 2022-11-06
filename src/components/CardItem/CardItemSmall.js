import React from 'react';
import { Typography, Card, Layout, Rate, Image } from 'antd';
import { format } from 'date-fns';

import './CardItem.css';

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

function CardItemSmall({ title, date, description, image, genre, average, setRatingMovie, rating }) {
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
  const { Title, Paragraph } = Typography;
  const { Sider, Content } = Layout;
  return (
    <Card className="CardItem">
      <div className={`iconRating ${colorRate}`}>{average}</div>
      <Layout>
        <Layout className="CardItem__main-content">
          <Sider className="CardItem__image" width={60}>
            <Image src={image} />
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
    </Card>
  );
}

export default CardItemSmall;
