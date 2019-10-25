import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "../pages/homepage/layout";
import Login from "../pages/login";
import { get } from "../request/http";
function AppRouter() {
  let me = false;
  let token = localStorage.getItem("token");
  get(`/me?token=${token}`, null, {}).then(res => {
    console.log(res);
    //应该让它返回一个布尔值？
    res.data.ans ? (me = true) : (me = false);
  });
  return (
    <Router>
      {/* Login page */}
      <Route exact path="/login" component={Login} />
      {/* Basic home page */}
      <Route path="/home" component={Homepage} />
      <Route
        exact
        path="/"
        render={() =>
          me ? <Redirect to="/home" /> : <Redirect to="/login/" />
        }
      />
    </Router>
  );
}

export default AppRouter;
