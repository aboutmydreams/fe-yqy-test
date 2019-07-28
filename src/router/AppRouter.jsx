import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from '../pages/homepage/layout'
import Login from '../pages/login'

function AppRouter() {
  return (
    <Router>
      {/* Login page */}
      <Route exact path="/login/" component={Login} />
      {/* Basic home page */}
      <Route path="/home/" component={Homepage} />
      <Route exact path="/" render={() => (
        true ?
          <Redirect to="/home"/>
        :
          <Redirect to="/login/"/>)}
      />
    </Router>
  )
}

export default AppRouter

