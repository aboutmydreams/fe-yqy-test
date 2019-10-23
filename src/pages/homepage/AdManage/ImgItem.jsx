import React, { useState, useEffect, Fragment } from "react";
import { Typography, Button, Row, Col, message } from "antd";
import ModalCom from "./Modal";
const { Title } = Typography;

const ImgItem = props => {
  // console.log(props);
  let [loading, setLoading] = useState(false);
  let [visible, setVisible] = useState(false);
  //如果在这个页面没有编辑需求，是否没必要用useState
  let [imgUrl, setImgUrl] = useState(props.imgUrl);
  let [title, setTitle] = useState(props.title);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
      message.success("修改图片地址成功");
    }, 1500);
  };
  const handleChangePreview = newImgUrl => {
    setImgUrl(newImgUrl);
    console.log(newImgUrl);
  };
  let modalProps = {
    //需要在模态框或是其上传组件中进行处理的数据逻辑，
    //由这个组件负责处理更改预览、切换状态
    visible: visible,
    loading: loading,
    title: title,
    imgName: props.name,
    imgStatus: props.status,
    imgUrl: imgUrl,
    show: showModal,
    hide: hideModal,
    handleOk: handleOk,
    seriesIdx: props.seriesIdx,
    listIdx: props.listIdx,
    jump: props.jump,
    linkUrl: props.linkUrl,
    changePreview: handleChangePreview
  };

  return (
    <Fragment>
      <div>
        <Row>
          <Col span={6}>
            <Button
              type='primary'
              onClick={() => {
                setVisible(true);
              }}
            >
              编辑广告
            </Button>
          </Col>
        </Row>
        <br />
        <Title level={4}>图片预览</Title>
        <img
          className='startimg'
          style={{ width: "80%", height: "80%" }}
          src={imgUrl}
          alt='img'
        />
        <ModalCom {...modalProps} />
      </div>
    </Fragment>
  );
};
export default ImgItem;
