import React from "react";
import { Table, Divider, message, Input, Button, Form, Modal } from "antd";
import axios from "axios";

import "./style.css";
import { string } from "postcss-selector-parser";
import EditModleUI from "./EditModle";

class SecondInterviewUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      inputValue: "",
      inputChange: "",
      columns: [
        {
          title: "商品名称",
          dataIndex: "name",
          key: "name",
          render: text => <p>{text}</p>
        },
        {
          title: "图片链接地址",
          dataIndex: "img_link",
          key: "img_link",
          render: text => {
            let textlist = text.split("a");
            console.log(textlist);
            if (text.search(";") !== -1) {
              let textList = text.split(";");
              var i;
              var myText = "";
              for (i = 0; i < textList.length; i++) {
                myText += (
                  <img className="commodity" src={textList[i]} alt="shop" />
                );
              }
              text = myText;
            } else {
              text = <img className="commodity" src={text} alt="shop" />;
            }
            return <div>{text}</div>;
          }
        },
        {
          title: "价格",
          key: "price",
          dataIndex: "price",
          render: text => (
            <span>
              {text}
              {/* {tags.map(tag => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })} */}
            </span>
          )
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => (
            <span>
              <a href="javascript:;">设为推荐 {record.key}</a>
              <Divider type="vertical" />
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
              <button onClick={this.showModal}>编辑</button>
              <Divider type="vertical" />
              <a href="javascript:;">删除</a>
            </span>
          )
        }
      ],

      data: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    // console.log(token);
    axios
      .get("http://127.0.0.1:5000/shop/edit?token=" + token)
      .then(res => this.setState({ data: res.data["data"] }));
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    // let token = localStorage.getItem("token");
    // // console.log("-----" + token);
    // let url = this.state.inputValue;
    // this.setState({ loading: true, imgurl: url });

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      message.success("修改图片地址成功");
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  inputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination="bottom"
        />
      </div>
    );
  }
}

export default SecondInterviewUI;
