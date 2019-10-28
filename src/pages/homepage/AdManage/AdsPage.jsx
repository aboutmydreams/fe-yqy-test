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
    const imgInfo = [
      {
        name: "3-1",
        jump: true,
        url: "https://avatars3.githubusercontent.com/u/48507806?s=460&v=4",
        linkUrl: "111"
      },
      {
        name: "3-2",
        jump: true,
        url: "https://avatars3.githubusercontent.com/u/48507806?s=460&v=4",
        linkUrl: "222"
      },
      {
        name: "3-3",
        jump: true,
        url: "https://avatars3.githubusercontent.com/u/48507806?s=460&v=4",
        linkUrl: "333"
      }
    ];
    // axios
    //   .put("http://59.110.237.244/api/system?key=secondAD", {
    //     key: "secondAD",
    //     value: JSON.stringify(imgInfo)
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
    axios
      .get(`http://59.110.237.244/api/system?key=${props.keyWord}`)
      .then(res => {
        console.log(pageInfo.title, JSON.parse(res.data.value));
        setImgInfoList(JSON.parse(res.data.value));
      });
    return () => {};
  }, [pageInfo.title, props.keyWord]);

  const handleSubmitList = (idxInList, key, info) => {
    console.log(idxInList, key, info);
    //这个逻辑不同于起始页
    imgInfoList.splice(idxInList, 1, info);
    console.log(imgInfoList);
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
