import React from "react";

import { Table, Divider, message, Input, Button, Form, Modal } from "antd";

const EditModleUI = () => {
  return (
    <Modal
      visible={this.state.visible}
      title="编辑"
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" onClick={this.handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={this.state.loading}
          onClick={this.handleOk}
        >
          确认
        </Button>
      ]}
    >
      <Form.Item>
        <Input
          placeholder="链接地址"
          className="input"
          value={this.state.inputValue}
          onChange={this.inputChange.bind(this)}
          autoComplete="current-password"
        />
      </Form.Item>
    </Modal>
  );
};

export default EditModleUI;
