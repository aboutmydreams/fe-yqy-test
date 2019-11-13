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
    to: "/home/Admanage",
    title: "广告管理"
  },
  {
    to: "/home/Content",
    title: "内容管理"
  },
  {
    to: "/home/ShopManage",
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

  //url与面包屑导航名称映射
  const breadcrumbNameMap = {
    "/home": "首页",
    "/home/Admanage": "广告管理",
    "/home/Content": "内容管理",
    "/home/ShopManage": "商品管理",
    "/home/Admission": "审核",
    "/home/MailBox": "融资管理",
    "/home/VideoManage": "视频管理"
  };

  //创建一个将当前pathname切片的数组 如['home','Admission']
  const pathSnippets = window.location.pathname.split("/").filter(i => i);

  //生成面包屑导航项
  const breadcrumbItems = pathSnippets.map((item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Layout>
      <Sider className="sider">
        <div>
          <img
            className="logo"
            src="https://i.loli.net/2019/07/28/5d3d61ec2f6dd44203.png"
            alt="logo"
          />
          <span>优企云</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
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
      <Layout
        style={{ marginLeft: "240px", minHeight: "700px", marginRight: "20px" }}
      >
        <Layout style={{ paddingBottom: "80px" }}>
          <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
            {breadcrumbItems}
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
