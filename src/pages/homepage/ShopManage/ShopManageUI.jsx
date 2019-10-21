import React, { Fragment } from "react";
import { Table, Tag, Button, Row, Col, Input, Icon } from "antd";
import axios from "axios";

import "./style.css";
import EditModle from "./EditModle";
import Deletebutton from "./DeleteModle";

class ShopManageUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      editRecommand: false,
      recoProduct: [1, 2, 3],
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
              //如果有多张图片则转为数组
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
            //价格描述
            let texts = text.split(";");
            return (
              <span>
                {texts.map(tag => {
                  //配色还可以调整
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
                <EditModle type='edit' text={text} />
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
      .then(res => {
        this.setState({ data: res.data["data"] });
        console.log(res);
      });
  }
  formatInput = e => {
    let initValue = e.target.value;
    let formattedValue = initValue.replace("，", ",");
    //要不再加个正则确定只有数字？
    //还是换成仅供选择的方式？
    console.log(formattedValue);
    this.setState({
      recoProduct: formattedValue
    });
  };
  recommandIdx = () => {
    //to be finished
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Col span={2}>
            <EditModle
              type='add'
              lastIdx={this.state.data.length}
              text={null}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={6}>
            <Input
              value={this.state.recoProduct.toString()}
              disabled={!this.state.editRecommand}
              placeholder='请输入要展示在推荐位上的商品编号，以‘，’分隔'
              prefix={<Icon type='star' />}
              onChange={this.formatInput.bind(this)}
            />
          </Col>
          {/* <Col span={1}></Col> */}
          <Col span={4}>
            <Button
              type='primary'
              onClick={() => {
                this.setState({ editRecommand: !this.state.editRecommand });
              }}
            >
              {this.state.editRecommand ? "保存设置" : "修改推荐商品"}
            </Button>
          </Col>
        </Row>
        <br />
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination='bottom'
        />
      </Fragment>
    );
  }
}

export default ShopManageUI;
