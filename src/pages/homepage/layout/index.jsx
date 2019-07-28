import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import HomeRouter from '../router'
import './index.css'

const { Header, Content, Sider } = Layout;

const Homepage = (props) => {

  return(
    <Layout>
      <Header className="header">
        <div className='ncuhome'>
          <img className='logo' src='https://ncustatic.ncuos.com/index/1563348714576.77b140f5-296c-44a5-93ba-6faec366347b.png' alt='logo' />
          <span>NCUHOME</span>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          style={{ lineHeight: '64px', display: 'inline-block'}}
        >
          <Menu.Item key="0">
            <Link to='/home/'>实时数据</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to='/home/SignUpForExam/'>报名考试</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/home/FirstInterview/'>一面名单</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/home/SecondInterview/'>二面名单</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to='/home/Admission/'>录取</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to='/home/Mailbox/'>HR邮箱</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="0">全部</Menu.Item>
            <Menu.Item key="1">行政组</Menu.Item>
            <Menu.Item key="2">设计组</Menu.Item>
            <Menu.Item key="3">产品组</Menu.Item>
            <Menu.Item key="4">运营组</Menu.Item>
            <Menu.Item key="5">研发组</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>

          <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            {
              window.location.pathname.split('/').map(item => {
                if (item) {
                  return (
                    <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                  )
                }
                return null
              })
            }
          </Breadcrumb>

          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 400,
            }}
          >
            <HomeRouter />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Homepage
