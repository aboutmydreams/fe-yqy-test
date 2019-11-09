import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import HomeRouter from "../router";
import "./index.css";
import Sider from "antd/lib/layout/Sider";

const { Content } = Layout;
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
    console.log(window.location.pathname);
    return item.to === window.location.pathname;
  });
  console.log(currentKey);
  return (
    <Layout>
      <Sider
        //想着等最后确定没问题了再写成样式表
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: "20px",
            lineHeight: "20px",
            backgroundColor: "white",
            paddingLeft: "34px",
            height: "5vh",
            paddingBottom: "10vh",
            paddingTop: "3vh"
          }}
        >
          <img
            className='logo'
            src='https://i.loli.net/2019/07/28/5d3d61ec2f6dd44203.png'
            alt='logo'
            style={{ height: "50px" }}
          />
          <span>优企云</span>
        </div>
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={`${currentKey}`}
          style={{ height: "87vh" }}
        >
          {menuItem.map((item, index) => {
            return (
              <Item key={index}>
                <Link style={{ paddingLeft: "24px" }} to={item.to}>
                  {item.title}
                </Link>
              </Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: "240px", minHeight: "700px" }}>
        <Layout style={{ paddingBottom: "80px" }}>
          <Breadcrumb separator='>' style={{ margin: "16px 0" }}>
            {window.location.pathname.split("/").map(item => {
              if (item) {
                return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
              }
              return null;
            })}
          </Breadcrumb>

          <Content>
            <HomeRouter />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Homepage;
