import React, { useState, Fragment, useEffect } from "react";
import { get } from "../../../request/http";
import { Table, Button, Tag } from "antd";
import EditShopModal from "./EditShopModal";
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
        text.split(";").map((item, idx) => {
          return priceTag.push(
            <Tag key={idx} color={"blue"}>
              {item}
            </Tag>
          );
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
            <EditShopModal productInfo={text} />
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
