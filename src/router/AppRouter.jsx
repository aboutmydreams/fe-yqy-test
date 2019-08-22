import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "../pages/homepage/layout";
import Login from "../pages/login";
import Axios from "axios";

function AppRouter() {
  let me = false;
  let token = localStorage.getItem("token");
  Axios.get("http://59.110.237.244/api/me?token=" + token)
    .then(res => {
      // console.log(res.data);
      if (res.data !== "Flase") {
        me = true;
      } else {
        me = false;
      }
    })
    .catch(error => {
      console.log(error);
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
