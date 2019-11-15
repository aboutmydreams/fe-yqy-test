import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { message, Button, Modal } from "antd";
import { deleteItem } from "../../../request/http";
import "./style.css";
const { confirm } = Modal;

const DeleteModal = props => {
  const { idx: delIdx } = props;
  const token = localStorage.getItem("token");

  const deleProduct = () => {
    const delParams = {
      key: delIdx
    };
    (async () => {
      try {
        const res = await deleteItem(`/shop/edit?token=${token}`, delParams);
        const resCode = res.data.code;
        resCode === 1
          ? message.success("删除成功") && window.location.reload()
          : message.error(`删除失败：${res.data.error}`);
      } catch (err) {
        message.err(`删除失败：${err}`);
      }
    })();
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
      <Button type="danger" icon="delete" onClick={confirmDel}>
        删除
      </Button>
    </Fragment>
  );
};
DeleteModal.propTypes = {
  idx: PropTypes.number.isRequired
};
export default DeleteModal;
