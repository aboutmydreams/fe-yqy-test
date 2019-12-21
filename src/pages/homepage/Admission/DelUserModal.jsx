import React, { Fragment } from "react";
import { deleteItem } from "../../../request/http";
import { message, Button, Modal } from "antd";
import PropTypes from "prop-types";

const token = localStorage.getItem("token");
const { confirm } = Modal;

const DelUserModal = props => {
  const { phone } = props;
  console.log(props);
  const deleProduct = () => {
    const delParams = {
      phone: phone
    };
    (async () => {
      try {
        const res = await deleteItem(`/user/manage?token=${token}`, delParams);
        const resCode = res.data.code;
        resCode === 1
          ? //这里用刷新影响不大
          message.success("删除成功") && window.location.reload()
          : message.error(`删除失败：${res.data.error}`);
      } catch (err) {
        message.err(`删除失败：${err}`);
      }
    })();
  };

  const confirmDel = () => {
    confirm({
      title: "确定要删除这个用户吗？",
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

DelUserModal.propTypes = {
  phone: PropTypes.string.isRequired
};
export default DelUserModal;
