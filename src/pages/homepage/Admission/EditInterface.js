import React, { useState, Fragment } from "react";
import UserInfo from "./UserInfo";
import ShopInfo from "./ShopInfo";
import { Menu, Icon, Modal, message } from "antd";
import { put, post, deleteItem } from "../../../request/http";
const { confirm } = Modal;
const { Item } = Menu;
const token = localStorage.getItem("token");

const EditInterface = props => {
  //从这里就开始分为编辑用界面和新增用界面了
  const [currentPage, setCurrentPage] = useState("userInfo");
  const { type, companyKey: key } = props;

  const handleEditUser = userInfo => {
    return (async () => {
      const res = await put(`/user/manage?token=${token}`, userInfo);
      if (res.data.code === 0) {
        return Promise.reject("error");
      }
    })();
  };

  const handleAddUser = userInfo => {
    console.log(userInfo);
    return (async () => {
      const res = await post(`/user/manage?token=${token}`, userInfo);
      if (res.data.code === 0) {
        return Promise.reject("error");
      }
    })();
  };
  
  //预留的处理函数
  const handleEditShop = shopInfo => {
    console.log(shopInfo);
  };
  const handleAddShop = shopInfo => {
    console.log(shopInfo);
  };

  const handleChangeForm = ({ key }) => {
    setCurrentPage(key);
  };

  return (
    <Fragment>
      <Menu
        onClick={handleChangeForm}
        defaultSelectedKeys={["userInfo"]}
        mode='horizontal'
      >
        <Item key='userInfo'>
          <Icon type='mail' />
          信息管理
        </Item>
        <Item key='shopInfo'>
          <Icon type='mail' />
          商品管理
        </Item>
      </Menu>
      {currentPage === "userInfo" ? (
        <UserInfo
          companyKey={type === "edit" ? key : ""}
          type={type}
          onEditUser={handleEditUser}
          onAddUser={handleAddUser}
        />
      ) : (
        <ShopInfo
          companyKey={type === "edit" ? key : ""}
          type={type}
          // onEditShop={handleEditShop}
          // onAddShop={handleAddShop}
        />
      )}
    </Fragment>
  );
};
export default EditInterface;
