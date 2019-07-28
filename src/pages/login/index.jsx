import React, { useState } from 'react';
import LoginUI from './loginUI'
import { message } from "antd";

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = ({username, password}) => {
    console.log(username, password)
  }

  const onInputChange = (e, type) => {
    let newValue = e.target.value
    if (type === 'username') {
      setUsername(newValue)
    } else if (type === 'password') {
      setPassword(newValue)
    } else {
      message.error('Input configuration error')
    }
  }

  return (
    <LoginUI
      onLogin={onLogin}
      onInputChange={onInputChange}
      usernameValue={username}
      passwordValue={password}
    />
  )
}

export default Login;
