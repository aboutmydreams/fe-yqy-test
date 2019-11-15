import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Form, Radio, message } from "antd";
import { put } from "../../../request/http";
import PropTypes from "prop-types";

const token = localStorage.getItem("token");

const AuditModal = props => {
  console.log(props);
  const { info, visi, toggle } = props;
  const { username, role } = info;

  const [visible, setVisible] = useState(visi);
  const [loading, setLoading] = useState(false);

  const [currentLevel, setCurrentLevel] = useState("");
  console.log(info);

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };

  const handleOk = () => {
    let newVipInfo = {
      username: username,
      attest_ans: currentLevel
    };
    setLoading(true);
    (async () => {
      try {
        const res = await put(`/attest/attest?token=${token}`, newVipInfo);
        const resCode = res.data.code;
        resCode === 1
          ? message.success("已审核") && setVisible(false)
          : message.error(`操作失败：${res.data["error"]}`);
        setLoading(false);
      } catch (err) {
        message.error(`操作失败：${err}}`);
      }
      window.location.reload();
    })();
  };
  const handleChange = e => {
    setCurrentLevel(e.target.value);
  };
  return (
    <Fragment>
      <Modal
        visible={visible}
        title="审核选项"
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setVisible(false);
              toggle(false);
            }}
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            确认
          </Button>
        ]}
      >
        <Form.Item>
          <Radio.Group onChange={handleChange} defaultValue={role}>
            <Radio style={radioStyle} value={"vip1"}>
              vip1
            </Radio>
            <Radio style={radioStyle} value={"vip2"}>
              vip2
            </Radio>
            <Radio style={radioStyle} value={"vip3"}>
              vip3
            </Radio>
            <Radio style={radioStyle} value={"user0"}>
              不通过
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Modal>
    </Fragment>
  );
};
AuditModal.propTypes = {
  info: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }).isRequired,
  visi: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};
export default AuditModal;
