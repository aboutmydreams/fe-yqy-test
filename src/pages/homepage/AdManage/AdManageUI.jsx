import React, { Fragment } from "react";
import StartPage from "./StartPage";
import AdsPage from "./AdsPage";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

const AdManageUI = props => {
  return (
    <Fragment>
      <Fragment>
        <Title level={2}>管理启动页</Title>
        <Row>
          <Col>
            <StartPage title={"启动页"} idx={1} />
          </Col>
        </Row>
        <Title level={2}>广告页2</Title>
        <Row>
          <Col>
            <AdsPage title={"广告页2"} idx={2} keyWord={"secondAD"} />
          </Col>
        </Row>
        <Title level={2}>广告页3</Title>
        <Row>
          <Col>
            <AdsPage title={"广告页3"} idx={3} keyWord={"thirdAD"} />
          </Col>
        </Row>
      </Fragment>
    </Fragment>
  );
};

export default AdManageUI;
