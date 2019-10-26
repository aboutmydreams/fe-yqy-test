import React, { Fragment } from "react";
import ImgItem from "./ImgItem";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

const AdManageUI = props => {
  const { startPage } = props;
  console.log(props);
  return (
    <Fragment>
      <Fragment>
        <Title level={2}>{startPage.title}</Title>
        <Row>
          <Col span={6}>
            <ImgItem {...startPage} />
          </Col>
        </Row>
      </Fragment>
      {/* {props.otherPages.map((item, index) => {
        return (
          <Fragment key={index}>
            <Title level={2}>{item.title}</Title>
            <Row>
              {item.imgList.map((imgItem, index) => {
                const imgProps = {
                  title: item.title,
                  name: imgItem.name,
                  imgUrl: imgItem.imgUrl,
                  jump: imgItem.jumpOnClick,
                  linkUrl: imgItem.linkUrl,
                  listIdx: index
                };
                return (
                  <Col key={index} span={6}>
                    <ImgItem {...imgProps} />
                  </Col>
                );
              })}
            </Row>
          </Fragment>
        );
      })} */}
    </Fragment>
  );
};

export default AdManageUI;
