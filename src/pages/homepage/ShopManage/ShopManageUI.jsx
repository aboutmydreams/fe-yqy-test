import React, { Fragment, useState, useEffect } from "react";
import { Table, Tag, Button, Row, Col, Input, Icon, message } from "antd";
import { get, put } from "../../../request/http";

import "./style.css";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const token = localStorage.getItem("token");

const ShopManageUI = props => {
  const [editRecommand, setEditRecommand] = useState(false);
  const [data, setData] = useState([]);
  const [recoIdxStr, setRecoIdxStr] = useState([]);
  let columns = [
    {
      title: "商品编号",
      dataIndex: "key",
      key: "key",
      align: "center",
      render: text => <p>{text}</p>
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: text => <p>{text}</p>
    },
    {
      title: "图片链接地址",
      dataIndex: "img_link",
      key: "img_link",
      align: "center",
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
            <EditModal productInfo={text} />
            <DeleteModal text={text} />
          </span>
        );
      }
    }
  ];

  useEffect(() => {
    (async () => {
      const res = await get(`/shop/edit?token=${token}`);
      const recomProd = await get("/system?key=recommand");
      const productList = res.data.data;
      let recoIdxArr = recomProd.data.value;

      if (recomProd.data.value.search(",") === -1) {
        recoIdxArr = recomProd.data.value.split(",");
      } else {
        recoIdxArr = recomProd.data.value;
      }
      setRecoIdxStr(String(recoIdxArr));
      setData(productList);
    })();
    return () => {};
  }, []);

  const formatInput = e => {
    let initValue = e.target.value;
    let formattedValue = initValue.replace("，", ",");
    setRecoIdxStr(formattedValue);
  };
  const submitRecoIdx = async () => {
    try {
      const res = await put("/system", {
        key: "recommand",
        value: recoIdxStr
      });
      if (res.data.code === 1) {
        message.success("推荐商品保存成功");
      }
    } catch (err) {
      message.err(`出错了：${err}`);
    }
  };

  return (
    <Fragment>
      <Row style={{ paddingRight: "5%" }}>
        <Col span={2}>
          <AddModal />
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
            icon="like"
            type="primary"
            onClick={() => {
              setEditRecommand(!editRecommand);
              if (editRecommand) {
                submitRecoIdx();
              }
            }}
          >
            {editRecommand ? "保存设置" : "修改推荐商品"}
          </Button>
        </Col>
      </Row>
      <br />
      <Table columns={columns} dataSource={data} pagination="bottom" />
    </Fragment>
  );
};

export default ShopManageUI;
