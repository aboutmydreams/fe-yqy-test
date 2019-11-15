import React, { useState, Fragment, useEffect } from "react";
import { get, post, put, deleteItem } from "../../../request/http";
import { Table, Button, Tag, message, Modal } from "antd";
import EditShopModal from "./EditShopModal";
import AddShopModal from "./AddShopModal";
import PropTypes from "prop-types";
import _ from "lodash";
const { confirm } = Modal;
const token = localStorage.getItem("token");

const ShopInfo = props => {
  console.log(props);
  const { companyKey: key } = props;
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
        //传入这件商品相对于列表的idx
        // 在修改成功后直接操作商品列表来实现无刷新更新
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
              type="danger"
              icon="delete"
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

  const handleAddProductInfo = productInfo => {
    return (async () => {
      const res = await post(`shop/edit?token=${token}`, productInfo);
      const resCode = res.data.code;
      if (resCode === 0) {
        return Promise.reject(res.data.error);
      } else {
        let newList = _.cloneDeep(listData);
        newList.push(productInfo);
        setListData(newList);
        return Promise.resolve();
      }
    })();
  };

  return (
    <Fragment>
      <AddShopModal
        onAdd={handleAddProductInfo}
        companyKey={key}
        len={listData.length}
      />
      <Table
        columns={columns}
        dataSource={listData}
        pagination="bottom"
      ></Table>
    </Fragment>
  );
};
ShopInfo.propTypes = {
  companyKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  type: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired
};
export default ShopInfo;
