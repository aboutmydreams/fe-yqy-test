import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import HomeRouter from "../router";
import "./index.css";

const { Header, Content } = Layout;
const { Item } = Menu;
const menuItem = [
  {
    to: "/home",
    title: "实时数据"
  },
  {
    to: "/home/Admanage/",
    title: "广告管理"
  },
  {
    to: "/home/Content/",
    title: "内容管理"
  },
  {
    to: "/home/ShopManage/",
    title: "商品管理"
  },
  {
    to: "/home/Admission",
    title: "审核"
  },
  {
    to: "/home/MailBox",
    title: "融资管理"
  },
  {
    to: "/home/VideoManage",
    title: "视频管理"
  }
];
const Homepage = () => {
  let currentKey = menuItem.findIndex(item => {
    return item.to === window.location.pathname;
  });
  console.log(currentKey);
  return (
    <Layout>
      <Header className='header'>
        <div className='ncuhome'>
          <img
            className='logo'
            src='https://i.loli.net/2019/07/28/5d3d61ec2f6dd44203.png'
            alt='logo'
          />
          <span>优企云</span>
        </div>
        <Menu
          theme='light'
          mode='horizontal'
          defaultSelectedKeys={`${currentKey}`}
          style={{ lineHeight: "64px", display: "inline-block" }}
        >
          {menuItem.map((item, index) => {
            return (
              <Item key={index}>
                <Link to={item.to}>{item.title}</Link>
              </Item>
            );
          })}
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb separator='>' style={{ margin: "16px 0" }}>
            {window.location.pathname.split("/").map(item => {
              if (item) {
                return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
              }
              return null;
            })}
          </Breadcrumb>

          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 500
            }}
          >
            <HomeRouter />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Homepage;
