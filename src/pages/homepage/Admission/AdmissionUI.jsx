import React from "react";
import { Table, Tag, message } from "antd";
import axios from "axios";

import "./style.css";
import EditModleUI from "./EditModle";
// import Addbutton from "./AddModle";
// import Deletebutton from "./DeleteModle";

class AdmissionUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      inputValue: "",
      inputChange: "",
      columns: [
        {
          title: "姓名",
          dataIndex: "true_name",
          key: "true_name",
          render: text => <p>{text}</p>
        },
        {
          title: "角色",
          dataIndex: "role",
          key: "role",
          render: text => (
            <Tag color={text.length > 4 ? "green" : "red"}>{text}</Tag>
          )
        },
        {
          title: "手机号",
          dataIndex: "username",
          key: "username",
          render: text => <p>{text}</p>
        },
        {
          title: "个人地址",
          dataIndex: "my_address",
          key: "my_address",
          render: text => <p>{text}</p>
        },
        {
          title: "图片",
          dataIndex: "img_links",
          key: "img_links",
          render: text => {
            if (text.search(";") !== -1) {
              let textList = text.split(";");
              let imgList = [];
              for (let imgSrc of textList) {
                imgList.push(
                  <img className="commodity" src={imgSrc} alt="shop" />
                );
              }
              text = imgList;
            } else {
              text = <img className="commodity" src={text} alt="shop" />;
            }
            // console.log(text);
            return <div>{text}</div>;
          }
        },
        {
          title: "企业名",
          key: "company",
          dataIndex: "company",
          render: text => {
            let texts = text.split(";");
            return (
              <span>
                {texts.map(tag => {
                  let color = tag.length > 3 ? "blue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </span>
            );
          }
        },
        {
          title: "企业地址",
          dataIndex: "company_address",
          key: "company_address",
          render: text => <p>{text}</p>
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => {
            return (
              <span>
                <EditModleUI text={text} />
                {/* <Deletebutton text={text} /> */}
              </span>
            );
          }
        }
      ],

      data: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    axios
      .get("http://59.110.237.244/api/attest/attest?token=" + token)
      .then(res => this.setState({ data: res.data["data"] }));
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
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
        {/* <Addbutton /> */}
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination="bottom"
        />
      </div>
    );
  }
}

export default AdmissionUI;
