import React from "react";
import "antd/dist/antd.css";
import { Input, Button, Typography, Icon, Form } from "antd";
import "./style.css";

const { Title, Text } = Typography;

const LoginUI = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        props.onLogin(values);
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div className="wrapper">
      <div className="container">
        <div className="content">
          <img
            className="logo-img"
            src={"https://i.loli.net/2019/07/28/5d3d61ec2f6dd44203.png"}
            alt="logo"
          />
          <Title level={2} style={{ color: "#262626" }}>
            优企云
          </Title>
          <Text style={{ fontSize: "18px", marginBottom: "30px" }}>
            选择优企云，业务天下寻
          </Text>
          <Form onSubmit={handleSubmit}>
            <div className="inputBox">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="user"
                        style={{ color: "rgb(140, 140, 140)" }}
                      />
                    }
                    placeholder="账号"
                    className="input"
                    autoComplete="current-password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="lock"
                        style={{ color: "rgb(140, 140, 140)" }}
                      />
                    }
                    placeholder="密码"
                    className="input"
                    type="password"
                    autoComplete="current-password"
                  />
                )}
              </Form.Item>
            </div>
            <Button type="primary" className="btn" htmlType="submit" block>
              登录
            </Button>
            {/* <Button block type="default" className="btn">
              <a href="http://www.baidu.com">忘记密码</a>
            </Button> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

const WrappedLoginUI = Form.create({ name: "login" })(LoginUI);

export default WrappedLoginUI;
