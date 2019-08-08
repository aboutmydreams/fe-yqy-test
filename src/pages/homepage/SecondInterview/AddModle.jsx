import React, { Component } from "react";

import { Typography, message, Input, Button, Form, Modal } from "antd";
import axios from "axios";

import "./style.css";
const { TextArea } = Input;
const { Text } = Typography;

// 增加

class Addbutton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAdd: false,
      visibleAdd: false,
      inputValueAddName: "",
      inputValueAddLink: "",
      inputValueAddPrice: "",
      inputValueAddDetail: "",
      inputChangeAddName: "",
      inputChangeAddLink: "",
      inputChangeAddPrice: "",
      inputChangeAddDetail: ""
    };
  }
  windowsOpen = () => {
    window.open("https://sm.ms/");
  };
  handleOkAdd = () => {
    console.log("4444444");
    console.log(this.state.inputValueAddName);
    let jsonData = {
      name: this.state.inputValueAddName,
      price: this.state.inputValueAddPrice,
      img_link: this.state.inputValueAddLink,
      shop_detail: this.state.inputValueAddDetail
    };
    let token = localStorage.getItem("token");
    this.setState({ loadingAdd: true });
    axios
      .post("http://127.0.0.1:5000/shop/edit?token=" + token, jsonData)
      .then(res => {
        if (res.data["code"] === 1) {
          message.success("商品添加成功");
        } else if (res.data["code"] === 0) {
          message.error("操作失败" + res.data["error"]);
        }
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

  inputChangeAddName(e) {
    this.setState({
      inputValueAddName: e.target.value
    });
  }
  inputChangeAddPrice(e) {
    this.setState({
      inputValueAddPrice: e.target.value
    });
  }
  inputChangeAddLink(e) {
    this.setState({
      inputValueAddLink: e.target.value
    });
  }
  inputChangeAddDetail(e) {
    this.setState({
      inputValueAddDetail: e.target.value
    });
  }

  showModalAdd = () => {
    this.setState({
      visibleAdd: true
    });
  };
  render() {
    return (
      <div>
        <Modal
          visible={this.state.visibleAdd}
          title="编辑"
          onOk={this.handleOk}
          onCancel={this.handleCancelAdd}
          footer={[
            <Button key="back" onClick={this.handleCancelAdd}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loadingAdd}
              onClick={this.handleOkAdd}
            >
              确认
            </Button>
          ]}
        >
          <Form.Item>
            <Text strong>商品名称（不可重复）</Text>
            <Input
              placeholder="名称"
              className="input"
              value={this.state.inputValueAddName}
              onChange={this.inputChangeAddName.bind(this)}
              autoComplete="current-password"
            />
            <Text strong underline mark onClick={this.windowsOpen}>
              图片链接地址（;相隔）
            </Text>
            <Input
              placeholder="链接地址"
              className="input"
              value={this.state.inputValueAddLink}
              onChange={this.inputChangeAddLink.bind(this)}
              autoComplete="current-password"
            />
            <Text strong>价格设置（;相隔）</Text>
            <Input
              placeholder="价格设置（分号相隔）"
              className="input"
              value={this.state.inputValueAddPrice}
              onChange={this.inputChangeAddPrice.bind(this)}
              autoComplete="current-password"
            />
            <Text strong>详细内容</Text>
            <TextArea
              rows={5}
              placeholder="详细内容"
              className="input-long"
              value={this.state.inputValueAddDetail}
              onChange={this.inputChangeAddDetail.bind(this)}
              autoComplete="current-password"
            />
          </Form.Item>
        </Modal>
        <Button
          className="addButton"
          type="primary"
          onClick={this.showModalAdd}
        >
          添加商品
        </Button>
      </div>
    );
  }
}

export default Addbutton;
