import React, { Fragment } from "react";

import { message, Button, Modal } from "antd";
import axios from "axios";
import "./style.css";
const { confirm } = Modal;

const DeleteModal = props => {
  const delIdx = props.text.key;
  const token = localStorage.getItem("token");
  const deleProduct = () => {
    const delParams = {
      key: delIdx
    };
    axios
      .delete(`http://59.110.237.244/api/shop/edit?token=${token}`, {
        data: delParams
      })
      .then(res => {
        const resCode = res.data.code;
        //TODO:考虑在拦截器中进行统一的错误处理
        if (resCode === 1) {
          message.success("删除成功");
        } else if (resCode === 0) {
          message.error(`删除失败：${res.data.error}`);
        } else {
          message.error("删除失败，网络异常");
        }
      })
      .catch(error => {
        message.error(`操作失败： ${error}`);
      });
  };
  const confirmDel = () => {
    confirm({
      title: "确定要删除这个商品吗？",
      content: "删除后不能恢复，请谨慎操作",
      okText: "确认删除",
      cancelText: "取消",
      onOk() {
        deleProduct();
      },
      onCancel() {
        message.success("取消删除");
      }
    });
  };
  return (
    <Fragment>
      <Button onClick={confirmDel}>删除</Button>
    </Fragment>
  );
};
export default DeleteModal;
