import React, { Fragment, useState, useEffect } from "react";
import { Table, Tag, Button, Row, Col, Input, Icon } from "antd";
import axios from "axios";

import "./style.css";
import EditModle from "./EditModle";
import Deletebutton from "./DeleteModle";

const ShopManageUI = props => {
  const [editRecommand, setEditRecommand] = useState(false);
  const [data, setData] = useState([]);
  const [recoIdxArr, setRecoIdxArr] = useState([]);
  const [recoIdxStr, setRecoIdxStr] = useState([]);
  let columns = [
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
              <img className="commodity" key={imgSrc} src={imgSrc} alt="shop" />
            );
          }
          text = imgList;
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
            <EditModle type="edit" text={text} />
            <Deletebutton text={text} />
          </span>
        );
      }
    }
  ];
  useEffect(() => {
    let token = localStorage.getItem("token");
    //获取商品列表
    axios
      .get("http://59.110.237.244/api/shop/edit?token=" + token)
      .then(res => {
        setData(res.data.data);
        console.log(res);
      });
    //获取推荐商品
    axios.get("http://59.110.237.244/api/system?key=recommand").then(res => {
      var recoIdxArr = res.data.value;
      if (res.data.value.search(",") === -1) {
        recoIdxArr = res.data.value.split(",");
      } else {
        recoIdxArr = res.data.value;
      }

      console.log(recoIdxArr, Array.isArray(recoIdxArr), String(recoIdxArr));
      setRecoIdxStr(String(recoIdxArr));
    });
    return () => {};
  }, [recoIdxArr]);

  const formatInput = e => {
    let initValue = e.target.value;
    let formattedValue = initValue.replace("，", ",");
    setRecoIdxStr(formattedValue);
  };
  const submitRecoIdx = () => {
    axios
      .put("http://59.110.237.244/api/system", {
        key: "recommand",
        value: recoIdxStr
      })
      .then(res => {
        console.log(res);
      });
  };
  return (
    <Fragment>
      <Row>
        <Col span={2}>
          <EditModle type="add" lastIdx={data.length} text={null} />
        </Col>
        <Col span={10}></Col>
        <Col span={10}>
          <Input
            value={recoIdxStr}
            disabled={!editRecommand}
            placeholder="请输入要展示在推荐位上的商品编号，以‘，’分隔"
            prefix={<Icon type="star" />}
            onChange={formatInput}
          />
        </Col>

        <Col span={2}>
          <Button
            type="primary"
            onClick={() => {
              setEditRecommand(!editRecommand);
              if (editRecommand) {
                submitRecoIdx();
              }
            }}
          >
            {editRecommand ? "保存设置" : "推荐"}
          </Button>
        </Col>
      </Row>

      <br />
      <Table columns={columns} dataSource={data} pagination="bottom" />
    </Fragment>
  );
};

export default ShopManageUI;
