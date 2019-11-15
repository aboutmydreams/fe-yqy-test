import React, { Fragment } from "react";
import StartPage from "./StartPage";
import AdsPage from "./AdsPage";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

const AdManageUI = () => {
  return (
    <Fragment>
      <Title level={2} style={{ marginTop: "20px" }}>
        启动页
      </Title>
      <Row>
        <Col span={6}>
          <StartPage title={"启动页1"} idx={1} keyWord={"firstAD"} />
        </Col>
        <Col span={6}>
          <StartPage title={"启动页2"} idx={1} keyWord={"secondAD"} />
        </Col>
      </Row>
      <Title level={2} style={{ marginTop: "40px" }}>
        寻找客户广告
      </Title>
      <Row>
        <Col>
          <AdsPage title={"寻找客户广告"} idx={2} keyWord={"findUserAD"} />
        </Col>
      </Row>
      <Title level={2} style={{ marginTop: "40px" }}>
        优企中心广告
      </Title>
      <Row>
        <Col>
          <AdsPage title={"优企中心广告"} idx={3} keyWord={"airMainAD"} />
        </Col>
      </Row>
      <Title level={2} style={{ marginTop: "40px" }}>
        营销助手广告
      </Title>
      <Row>
        <Col>
          <AdsPage title={"营销助手广告"} idx={4} keyWord={"buyMainAD"} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdManageUI;
