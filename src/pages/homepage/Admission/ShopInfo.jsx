import React, { useState, Fragment, useEffect } from "react";
import { get } from "../../../request/http";
import { Table, Button, Tag, message, Modal } from "antd";
import EditShopModal from "./EditShopModal";
import { put, deleteItem } from "../../../request/http.js";
import _ from "lodash";
const { confirm } = Modal;
const token = localStorage.getItem("token");

const ShopInfo = props => {
  console.log(props);
  const { companyKey: key, type, onDeleteShop } = props;
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
      render: (text, record, idx) => {
        const id = text.key;
        return (
          <Fragment>
            <EditShopModal
              productInfo={text}
              onSave={handleSaveProductInfo}
              idx={idx}
            />
            <Button
              onClick={() => {
                confirmDel(id);
              }}
            >
              删除
            </Button>
          </Fragment>
        );
      }
    }
  ];

  //FIXME: 这里实在太乱了  一边想着抽离一边发现信息和商品处理逻辑 层级不同
  //如果强行都抽离会很麻烦  props传来传去这种  更别说还要依据返回值做处理了
  //我会再考虑一下

  const handleDeleteShop = productKey => {
    console.log(productKey);
    const delParams = {
      key: productKey
    };
    return (async () => {
      const res = await deleteItem(`shop/edit?token=${token}`, delParams);
      const resCode = res.data.code;
      if (resCode !== 1) {
        return Promise.reject("error");
      } else {
        (async () => {
          const res = await get(`/user/shop?token=${token}&key=${key}`);
          console.log(res);
          setListData(res.data.shops);
        })();
      }
    })();
  };
  const confirmDel = id => {
    confirm({
      title: "确定要删除这个商品吗？",
      content: "删除后不能恢复，请谨慎操作",
      okText: "确认删除",
      cancelText: "取消",
      onOk() {
        handleDeleteShop(id);
      },
      onCancel() {
        message.success("取消删除");
      }
    });
  };

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
  //TODO: 抽离到上层
  const handleSaveProductInfo = (productInfo, idx) => {
    return (async () => {
      const res = await put(`shop/edit?token=${token}`, productInfo);
      const resCode = res.data.code;
      if (resCode === 0) {
        return Promise.reject(res.data.error);
      } else {
        //实现实时预览
        let newList = _.cloneDeep(listData);
        newList.splice(idx, 1, productInfo);
        setListData(newList);
        return Promise.resolve();
      }
    })();
  };
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
