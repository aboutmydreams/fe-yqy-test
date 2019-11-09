import React, { Fragment, useState, useEffect } from "react";
import AdsItem from "./AdsItem";
import { get, put } from "../../../request/http";
import { Row, Col } from "antd";

const AdsPage = props => {
  const { keyWord, title, idx } = props;
  const [imgInfoList, setImgInfoList] = useState([]);

  const pageInfo = {
    keyWord: keyWord,
    title: title,
    idx: idx
  };
  useEffect(() => {
    (async () => {
      const res = await get(`/system?key=${keyWord}`);
      setImgInfoList(JSON.parse(res.data.value));
    })();
    return () => {};
    // eslint-disable-next-line
  }, []);

  //负责这一广告系列所有变更的提交
  const handleSubmitList = (idxInList, key, info) => {
    //这个逻辑不同于起始页
    imgInfoList.splice(idxInList, 1, info);
    (async () => {
      await put(`/system?key=${key}`, {
        key: key,
        value: JSON.stringify(imgInfoList)
      });
    })();
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
