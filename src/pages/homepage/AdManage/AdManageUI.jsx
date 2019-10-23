import React, { Fragment } from "react";
import ImgItem from "./ImgItem";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

// 关于如何扩展以及复用的问题，图片列表是由 ImgItem 组件渲染出来的，
// 如果后期有 【添加】 功能，只需要在imgList项中多添加一项即可

const AdManageUI = props => {
  let arr = [];
  for (let item in props) {
    arr.push(props[item]);
  }
  return (
    <Fragment>
      {arr.map((item, index) => {
        return (
          <Fragment key={index}>
            <Title level={2}>{item.title}</Title>
            <Row>
              {item.imgList.map((imgItem, index) => {
                const imgProps = {
                  title: item.title,
                  name: imgItem.name,
                  status: imgItem.status,
                  imgUrl: imgItem.imgUrl,
                  jump: imgItem.jumpOnClick,
                  linkUrl: imgItem.linkUrl,
                  seriesIdx: item.idx,
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
      })}
    </Fragment>
  );
};

export default AdManageUI;
