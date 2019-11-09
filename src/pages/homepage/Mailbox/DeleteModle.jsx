import React, { Component } from "react";

import { message, Button, Modal } from "antd";
import axios from "axios";
import "./style.css";
const { confirm } = Modal;

// 增加

class Deletebutton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key_id: props.text.key
    };
    this.showConfirm = this.showConfirm.bind(this);
    this.deleteShop = this.deleteShop.bind(this);
  }

  deleteShop = () => {
    let token = localStorage.getItem("token");
    let jsonData = {
      key: this.state.key_id
    };
    console.log(jsonData);

    axios
      .delete("http://www.youqiyun.net/api/finance?token=" + token, {
        data: jsonData
      })
      .then(res => {
        console.log(res.data);
        return res;
      })
      .then(res => {
        if (res.data["code"] === 1) {
          message.success("删除成功");
        } else if (res.data["code"] === 0) {
          message.error("删除成功" + res.data["error"]);
        } else {
          message.error("操作失败，网络异常");
        }
      })
      .catch(Error => {
        message.error("操作失败，" + Error);
      });
  };

  showConfirm = () => {
    const _that = this;
    confirm({
      title: "你确定要删除这个商品吗?",
      content: "确认删除后不能恢复，请谨慎操作哦",
      onOk() {
        _that.deleteShop();
      },
      onCancel() {
        message.success("取消删除");
      }
    });
  };

  render() {
    return (
      <div>
        <Button
          className="Deletebutton"
          type="primary"
          onClick={this.showConfirm}
        >
          删除
        </Button>
      </div>
    );
  }
}

export default Deletebutton;
