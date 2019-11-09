import React, { useState, Fragment, useEffect } from "react";
import { get } from "../../../request/http";
import { Table, Button, Icon, message, Row, Col, Tag } from "antd";
import EditShopPage from "./EditShopModal";
const token = localStorage.getItem("token");
const ShopInfo = props => {
  const { companyKey: key, type } = props;
  const [listData, setListData] = useState([]);
  const columns = [
    {
      title: "商品编号",
      dataIndex: "key",
      key: "key",
      render: text => <p>{text}</p>
    },
    {
      title: "商品名称",
      key: "name",
      dataIndex: "name",
      render: text => <p>{text}</p>
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: text => {
        const priceTag = [];
        text.split(";").map(item => {
          return priceTag.push(<Tag color={"blue"}>{item}</Tag>);
        });
        return priceTag;
      }
    },
    {
      title: "操作",
      key: "action",
      render: text => {
        return (
          <Fragment>
          {/* TODO:分离 */}
            <EditShopPage companyKey={key} />
            <Button type='warning'>删除</Button>
          </Fragment>
        );
      }
    }
  ];
  useEffect(() => {
    if (key.length !== 0) {
      (async () => {
        const res = await get(`/user/shop?token=${token}&key=${key}`);
        console.log(res);
        setListData(res.data.shops);
      })();
    }
    return () => {};
    //eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={listData}
        pagination='bottom'
      ></Table>
    </Fragment>
  );
};
export default ShopInfo;
