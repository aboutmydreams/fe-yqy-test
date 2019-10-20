import React, { Component } from "react";
import { Typography, Button, Row, Col, message } from "antd";
import ModalCom from "./Modal";
const { Title } = Typography;
class ImgItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      imgUrl: props.imgUrl,
      inputValue: "",
      title: props.title
    };
  }

  componentDidMount() {
    // axios
    //   .get("http://59.110.237.244/api/startimgurl")
    //   .then(res => this.setState({ imgurl: res.data["url"] }));
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      message.success("修改图片地址成功");
    }, 1500);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  changePreview = () => {};
  render() {
    const { visible, loading } = this.state;
    const modalProps = {
      visible: visible,
      onOk: this.handleOk,
      onCancel: this.handleCancel,
      onClick: this.handleOk,
      loading: loading,
      title: this.state.title,
      imgUrl: this.state.imgUrl,
      changePreview: this.changePreview
    };
    const { title, imgUrl } = modalProps;
    return (
      <div>
        <div>
          <Row>
            <Col span={6}>
              <Button type='primary' onClick={this.showModal}>
                编辑广告
              </Button>
            </Col>
          </Row>
          <br />
          <Title level={4}>图片预览</Title>
          <img
            className='startimg'
            style={{ width: "80%", height: "80%" }}
            title={title}
            src={imgUrl}
            alt='img'
          />
        </div>
        <ModalCom {...modalProps} />
      </div>
    );
  }
}

export default ImgItem;
