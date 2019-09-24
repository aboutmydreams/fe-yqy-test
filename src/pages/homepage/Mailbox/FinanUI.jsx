import React from "react";
import { Table, Tag, message } from "antd";
import axios from "axios";

import "./style.css";
import EditModleUI from "./EditModle";
import Deletebutton from "./DeleteModle";
// import Addbutton from "./AddModle";
// import Deletebutton from "./DeleteModle";

class FinanUI extends React.Component {
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
          dataIndex: "name",
          key: "name",
          render: text => <p>{text}</p>
        },
        {
          title: "公司名",
          dataIndex: "company_name",
          key: "company_name",
          render: text => (
            <Tag color={text.length > 4 ? "green" : "red"}>{text}</Tag>
          )
        },
        {
          title: "手机号",
          dataIndex: "phone",
          key: "phone",
          render: text => <p>{text}</p>
        },
        {
          title: "公司地址",
          dataIndex: "company_address",
          key: "company_address",
          render: text => <p>{text}</p>
        },
        {
          title: "融资金额",
          dataIndex: "finance_num",
          key: "finance_num",
          render: text => {
            // console.log(text);
            return <div>{text}</div>;
          }
        },
        {
          title: "用途",
          dataIndex: "how_use",
          key: "how_use",
          render: text => <p>{text}</p>
        },
        {
          title: "备注",
          dataIndex: "other_things",
          key: "other_things",
          render: text => <p>{text}</p>
        },
        {
          title: "操作",
          key: "action",
          render: (text, record) => {
            return (
              <span>
                <Deletebutton text={text} />
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
      .get("http://59.110.237.244/api/finance?token=" + token)
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

export default FinanUI;
