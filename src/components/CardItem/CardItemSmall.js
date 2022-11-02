import React from "react";

import { Typography, Card, Tag, Layout, Rate, Image } from "antd";

import "./CardItem.css";

import poster from "./RectangleSmall.png";

function CardItemSmall() {
  const { Title, Paragraph } = Typography;
  const { Sider, Content } = Layout;
  return (
    <Card className="CardItem">
      <div className="iconRating">{6.6}</div>
      <Layout>
        <Layout className="CardItem__main-content">
          <Sider className="CardItem__image" width={60}>
            <Image src={poster} />
          </Sider>
          <div className="CardItem__header">
            <Title level={4}>The way back</Title>
            <Paragraph className="CardItem__data">March 5, 2020</Paragraph>
            <Tag color="default">Action</Tag>
            <Tag color="default">Drama</Tag>
          </div>
        </Layout>
        <Layout>
          <Content>
            A former basketball all-star, who has lost his wife and family
            foundation in a struggle with addiction attempts to regain his soul
            and salvation by becoming the coach of a disparate ethnically mixed
            high ...
          </Content>
          <Rate className="stars" allowHalf count={10} />
        </Layout>
      </Layout>
    </Card>
  );
}

export default CardItemSmall;
