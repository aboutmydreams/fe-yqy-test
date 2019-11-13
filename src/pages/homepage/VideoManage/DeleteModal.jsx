import React from "react";
import { Modal, message, Button } from "antd";

const { confirm } = Modal;
const DelModal = props => {
  const { idx, onDelete } = props;

  const showConfirm = () => {
    confirm({
      title: "确定要删除这个视频吗？",
      content: "确认删除后不能恢复，请谨慎操作哦",
      onOk() {
        onDelete(idx);
      },
      okText: "确认删除",
      cancelText: "取消",
      onCancel() {
        message.success("取消删除");
      }
    });
  };
  return (
    <Button
      icon="delete"
      type="danger"
      onClick={() => {
        showConfirm();
      }}
    >
      删除
    </Button>
  );
};
export default DelModal;
