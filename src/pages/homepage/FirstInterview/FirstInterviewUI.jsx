import React from "react";
import {
  Typography,
  Input,
  Button,
  Modal,
  Row,
  Col,
  Form,
  message
} from "antd";
import "./style1.css";
import axios from "axios";
const { Title } = Typography;

class FirstInterviewUI extends React.Component {
  state = {
    loading: false,
    visible: false,
    imgurl: "http://127.0.0.1:5000/startimg/url",
    inputValue: ""
  };

  inputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
    // return "a";
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/startimgurl")
      .then(res => this.setState({ imgurl: res.data["url"] }));
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  windowsOpen = () => {
    window.open("https://sm.ms/");
  };

  handleOk = () => {
    let token = localStorage.getItem("token");
    // console.log("-----" + token);
    let url = this.state.inputValue;
    this.setState({ loading: true, imgurl: url });

    setTimeout(() => {
      axios
        .get(
          "http://127.0.0.1:5000/startimg/change?token=" + token + "&url=" + url
        )
        .then(res => this.setState({ imgurl: res.data["url"] }));
      this.setState({ loading: false, visible: false });
      message.success("修改图片地址成功");
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  error() {
    Modal.error({
      title: "This is an error message",
      content: "some messages...some messages..."
    });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <div>
          <div>
            <Row>
              <Col span={11}>
                <Title level={4}>APP 启动页面 图片链接地址</Title>
              </Col>
              <Col span={1} />
              <Col span={6}>
                <Button type="primary" onClick={this.windowsOpen}>
                  生成图片链接
                </Button>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Input disabled placeholder={this.state.imgurl} />
              </Col>

              <Col span={6}>
                <Button type="primary" onClick={this.showModal}>
                  编辑启动页图
                </Button>
              </Col>
            </Row>
            <br />
            <Title level={4}>图片预览</Title>
            <img
              className="startimg"
              src={"http://127.0.0.1:5000/startimgget"}
              alt="start"
            />
          </div>
        </div>
        <Modal
          visible={visible}
          title="编辑启动页链接"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
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
      </div>
    );
  }
}

export default FirstInterviewUI;
