import React from "react";
import { Table, Tag, message } from "antd";
import axios from "axios";

import "./style.css";
import EditModleUI from "./EditModle";
import Addbutton from "./AddModle";
import Deletebutton from "./DeleteModle";

class ShopManageUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      inputValue: "",
      inputChange: "",
      columns: [
        {
          title: "商品编号",
          dataIndex: "key",
          key: "key",
          render: text => <p>{text}</p>
        },
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
            if (text.search(";") !== -1) {
              let textList = text.split(";");
              let imgList = [];
              for (let imgSrc of textList) {
                imgList.push(
                  <img
                    className='commodity'
                    key={imgSrc}
                    src={imgSrc}
                    alt='shop'
                  />
                );
              }
              text = imgList;
            } else {
              text = <img className='commodity' src={text} alt='shop' />;
            }
            // console.log(text);
            return <div>{text}</div>;
          }
        },
        {
          title: "价格",
          key: "price",
          dataIndex: "price",
          render: text => {
            let texts = text.split(";");
            return (
              <span>
                {texts.map(tag => {
                  let color = tag.length > 3 ? "geekblue" : "green";
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
          title: "操作",
          key: "action",
          render: (text, record) => {
            return (
              <span>
                <EditModleUI text={text} />
                <Deletebutton text={text} />
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
      .get("http://59.110.237.244/api/shop/edit?token=" + token)
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
        <Addbutton />
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination='bottom'
        />
      </div>
    );
  }
}

export default ShopManageUI;
