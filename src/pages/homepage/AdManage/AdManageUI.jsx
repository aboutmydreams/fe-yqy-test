import React, { Fragment } from "react";
import ImgItem from "./ImgItem";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

const AdManageUI = props => {
  let arr = [];
  for (let item in props) {
    arr.push(props[item]);
  }
  // {/*需要上响应式吗？ */}
  return (
    <Fragment>
      {arr.map((item, index) => {
        return (
          <Fragment key={index}>
            <Title level={2}>{item.title}</Title>
            <Row>
              {item.imgList.map((imgUrl, index) => {
                return (
                  <Col key={index} span={6}>
                    <ImgItem title={item.title} imgUrl={imgUrl} />
                  </Col>
                );
              })}
            </Row>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default AdManageUI;
