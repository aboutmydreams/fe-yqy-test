import React, { useState } from "react";
import LoginUI from "./loginUI";
import { message } from "antd";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = ({ username, password }) => {
    console.log(username, password);
    axios
      .post("/api/admin/login", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data["code"]);
        if (res.data["code"] === 1) {
          localStorage.setItem("token", res.data["token"]);
          window.location.replace("/home");
        } else {
          message.error("用户名或密码错误");
        }
      });
  };

  const onInputChange = (e, type) => {
    let newValue = e.target.value;
    if (type === "username") {
      setUsername(newValue);
    } else if (type === "password") {
      setPassword(newValue);
    } else {
      message.error("Input configuration error");
    }
  };

  return (
    <LoginUI
      onLogin={onLogin}
      onInputChange={onInputChange}
      usernameValue={username}
      passwordValue={password}
    />
  );
};

export default Login;
