import React, { useState, Fragment } from "react";
import UserInfo from "./UserInfo";
import ShopInfo from "./ShopInfo";
import { Menu, Icon } from "antd";
import { put, post } from "../../../request/http";
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

  const handleChangeForm = ({ key }) => {
    setCurrentPage(key);
  };

  return (
    <Fragment>
      {key.length !== 0 ? (
        <Fragment>
          <Menu
            onClick={handleChangeForm}
            defaultSelectedKeys={["userInfo"]}
            mode="horizontal"
          >
            <Item key="userInfo">
              <Icon type="hdd" />
              信息管理
            </Item>
            <Item key="shopInfo">
              <Icon type="shopping" />
              商品管理
            </Item>
          </Menu>
          {currentPage === "userInfo" ? (
            <UserInfo
              companyKey={key}
              type={type}
              onEditUser={handleEditUser}
              onAddUser={handleAddUser}
            />
          ) : (
            <ShopInfo companyKey={key} type={type} />
          )}
        </Fragment>
      ) : (
        //新增页面只能够新增用户
        <UserInfo companyKey="" type="add" onAddUser={handleAddUser} />
      )}
    </Fragment>
  );
};
export default EditInterface;
