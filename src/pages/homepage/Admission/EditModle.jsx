import React, { Component } from "react";

import { Radio, message, Button, Form, Modal } from "antd";
import axios from "axios";

import "./style.css";

// 增加

class EditModleUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAdd: false,
      visibleAdd: false,
      value: "user0",
      username: ""
    };
  }

  componentDidMount() {
    let shop = this.props.text;
    console.log(shop.username);
    this.setState({
      username: shop.username,
      value: "user0"
    });
  }

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  handleOkAdd = () => {
    let jsonData = {
      username: this.state.username,
      attest_ans: this.state.value
    };
    console.log(this.props.text.key);
    let token = localStorage.getItem("token");
    this.setState({ loadingAdd: true });
    axios
      .put("http://59.110.237.244/api/attest/attest?token=" + token, jsonData)
      .then(res => {
        if (res.data["code"] === 1) {
          message.success("已审核");
        } else if (res.data["code"] === 0) {
          message.error("操作失败" + res.data["error"]);
        }
        console.log(res.data);
      })
      .catch(Error => {
        message.error("操作失败，" + Error);
      })
      .then(() => {
        this.setState({ loadingAdd: false, visibleAdd: false });
      });
  };

  handleCancelAdd = () => {
    this.setState({ visibleAdd: false });
  };

  showModalAdd = () => {
    this.setState({
      visibleAdd: true
    });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <div>
        <Modal
          visible={this.state.visibleAdd}
          title='审核选项'
          onOk={this.handleOk}
          onCancel={this.handleCancelAdd}
          footer={[
            <Button key='back' onClick={this.handleCancelAdd}>
              取消
            </Button>,
            <Button
              key='submit'
              type='primary'
              loading={this.state.loadingAdd}
              onClick={this.handleOkAdd}
            >
              确认
            </Button>
          ]}
        >
          <Form.Item>
            <Radio.Group onChange={this.onChange} value={this.state.value}>
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
          className='EditModleUI'
          type='primary'
          onClick={this.showModalAdd}
        >
          审核
        </Button>
      </div>
    );
  }
}

export default EditModleUI;
