import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Form, Radio, message } from "antd";
import { put } from "../../../request/http";
const AuditModal = props => {
  const { info } = props;
  const { username } = info;
  const token = localStorage.getItem("token");
  const [visible, setVisible] = useState(false);
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
    console.log(newVipInfo);
    setLoading(true);
    (async () => {
      try {
        const res = await put(`/attest/attest?token=${token}`, newVipInfo);
        console.log(res);
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
    setCurrentLevel  (e.target.value);
  };
  return (
    <Fragment>
      <Modal
        visible={visible}
        title='审核选项'
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            key='back'
            onClick={() => {
              setVisible(false);
            }}
          >
            取消
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            确认
          </Button>
        ]}
      >
        <Form.Item>
          <Radio.Group onChange={handleChange}>
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

      <Button
        icon='check'
        type='primary'
        onClick={() => {
          setVisible(true);
        }}
      >
        审核
      </Button>
    </Fragment>
  );
};
export default AuditModal;
