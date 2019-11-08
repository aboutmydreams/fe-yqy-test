import React, { useState, Fragment } from "react";
import UserInfo from "./UserInfo";
import ShopInfo from "./ShopInfo";
import { Menu, Icon } from "antd";
const { Item } = Menu;
const EditInterface = props => {
  const [currentInfo, setCurrentUserInfo] = useState("userInfo");
  const { type, companyKey: key } = props;
  console.log(type);
  const handleEdit = userInfo => {
    console.log(userInfo);
  };
  const handleChangeForm = ({ key }) => {
    console.log(key);
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
        />
      ) : (
        <ShopInfo companyKey={type === "edit" ? key : ""} 
          type={type}
        />
      )}
    </Fragment>
  );
};
export default EditInterface;
