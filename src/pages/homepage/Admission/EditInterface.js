import React, { useState, Fragment } from "react";
import UserInfo from "./UserInfo";
import ShopInfo from "./ShopInfo";
import { Menu, Icon } from "antd";
import { put, post, deleteItem } from "../../../request/http";
const { Item } = Menu;
const token = localStorage.getItem("token");
const EditInterface = props => {
  const [currentInfo, setCurrentUserInfo] = useState("userInfo");
  const { type, companyKey: key } = props;
  const handleEdit = userInfo => {
    console.log(userInfo);
    (async () => {
      const res = await put(`/user/manage?token=${token}`, userInfo);
      //FIXME: 先用刷新替代一下 后面上实时
      // window.location.reload();
      console.log(res);
    })();
  };
  const handleAdd = userInfo => {
    console.log(userInfo);
    (async () => {
      const res = await post(`/user/manage?token=${token}`, userInfo);
      console.log(res);
    })();
  };
  const handleChangeForm = ({ key }) => {
    setCurrentUserInfo(key);
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
      {currentInfo === "userInfo" ? (
        <UserInfo
          companyKey={type === "edit" ? key : ""}
          type={type}
          onSaveEdition={handleEdit}
          onAddUser={handleAdd}
        />
      ) : (
        <ShopInfo companyKey={type === "edit" ? key : ""} type={type} />
      )}
    </Fragment>
  );
};
export default EditInterface;
