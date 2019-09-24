import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import HomeRouter from "../router";
import "./index.css";

const { Header, Content } = Layout;

const Homepage = props => {
  return (
    <Layout>
      <Header className="header">
        <div className="ncuhome">
          <img
            className="logo"
            src="https://i.loli.net/2019/07/28/5d3d61ec2f6dd44203.png"
            alt="logo"
          />
          <span>优企云</span>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{ lineHeight: "64px", display: "inline-block" }}
        >
          <Menu.Item key="0">
            <Link to="/home/">实时数据</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/home/AdManage/">广告管理</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/Startimg/">启动页管理</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/ShopManage/">商品管理</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/Admission/">审核</Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to="/home/Mailbox/">融资管理</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        {/* <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["0"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="0">全部</Menu.Item>
            <Menu.Item key="1">1组</Menu.Item>
            <Menu.Item key="2">2组</Menu.Item>
            <Menu.Item key="3">3组</Menu.Item>
            <Menu.Item key="4">4组</Menu.Item>
            <Menu.Item key="5">5组</Menu.Item>
          </Menu>
        </Sider> */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
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
              minHeight: 400
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
