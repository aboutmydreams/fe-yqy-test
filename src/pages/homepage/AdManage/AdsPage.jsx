import React, { Fragment, useState, useEffect } from "react";
import AdsItem from "./AdsItem";
import axios from "axios";
import { Row, Col } from "antd";
import _ from "lodash";
const AdsPage = props => {
  const pageInfo = {
    keyWord: props.keyWord,
    title: props.title,
    idx: props.idx
  };
  const [imgInfoList, setImgInfoList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://59.110.237.244/api/system?key=${props.keyWord}`)
      .then(res => {
        setImgInfoList(JSON.parse(res.data.value));
      });
    return () => {};
  }, [pageInfo.title, props.keyWord]);

  const handleSubmitList = (idxInList, key, info) => {
    //这个逻辑不同于起始页
    imgInfoList.splice(idxInList, 1, info);
    axios
      .put(`http://59.110.237.244/api/system?key=${key}`, {
        key: key,
        value: JSON.stringify(imgInfoList)
      })
      .then(res => {
        console.log(res);
      });
  };
  return (
    <Fragment>
      <Row>
        {imgInfoList.map((item, idx) => {
          const imgInfo = Object.assign({}, pageInfo, item);
          return (
            <Col span={6} key={idx}>
              <AdsItem
                {...imgInfo}
                idxInList={idx}
                onSubmit={handleSubmitList}
              />
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};
export default AdsPage;
