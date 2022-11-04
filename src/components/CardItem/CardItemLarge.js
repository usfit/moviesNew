import React from 'react';
import { Typography, Card, Tag, Layout, Rate, Image } from 'antd';
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

function CardItemLarge({ title, date, description, image }) {
  const { Title, Paragraph } = Typography;
  const { Sider, Content } = Layout;
  return (
    <Card className="CardItem">
      <div className="iconRating">{6.6}</div>
      <Layout>
        <Sider className="CardItem__image" width={183}>
          <Image src={image} />
        </Sider>
        <Layout className="CardItem__main-content">
          <div className="CardItem__header">
            <Title level={4}>{`${title}`}</Title>
            <Paragraph className="CardItem__data">{formatData(date)}</Paragraph>
            <Tag color="default">Action</Tag>
            <Tag color="default">Drama</Tag>
          </div>
          <Content>{shotText(description)}</Content>
          <Rate className="stars" allowHalf count={10} />
        </Layout>
      </Layout>
    </Card>
  );
}

export default CardItemLarge;
