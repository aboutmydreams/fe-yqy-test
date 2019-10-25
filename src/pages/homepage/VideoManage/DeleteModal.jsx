import React, { Fragment, useState } from "react";
import { Modal, message, Button } from "antd";
import axios from "axios";

const { confirm } = Modal;
const DelModal = props => {
  const delVideo = () => {
    console.log("delete " + props.idx);
    const token = localStorage.getItem("token");
    axios.delete("http://59.110.237.244/api/video?token=" + token, {
      video_id: props.idx
    });
  };
  const showConfirm = () => {
    confirm({
      title: "确定要删除这个视频项吗？",
      content: "确认删除后不能恢复，请谨慎操作哦",
      onOk() {
        delVideo();
      },
      onCancel() {
        message.success("取消删除");
      }
    });
  };
  return (
    <Fragment>
      <Button
        type='danger'
        onClick={() => {
          showConfirm();
        }}
      >
        删除
      </Button>
    </Fragment>
  );
};
export default DelModal;
