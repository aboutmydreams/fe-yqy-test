import React, { Fragment, useState } from "react";
import { Modal, message, Button } from "antd";
import axios from "axios";

const { confirm } = Modal;
const DelModal = props => {
  const { idx } = props;

  const showConfirm = () => {
    confirm({
      title: "确定要删除这个视频项吗？",
      content: "确认删除后不能恢复，请谨慎操作哦",
      onOk() {
        props.onDelete(idx);
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
