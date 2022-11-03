import React from "react";

import {Row, Col, Pagination} from 'antd';

import { CardItem } from "../CardItem";

// if (window.innerWidth > 520) {
//   return <CardItem />;
// } else {
//   return <CardItemSmall />;
// }

function CardList() {
  return (
    <>
      <Row gutter={[36, 35]} justify='center'>
        <Col><CardItem /></Col>
        <Col><CardItem /></Col>
        <Col><CardItem /></Col>
        <Col><CardItem /></Col>
        <Col><CardItem /></Col>
      </Row>
      <Pagination total={20} />
      
    </>
  );
}

export default CardList;
