import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "../pages/homepage/layout";
import Login from "../pages/login";
import { get } from "../request/http";

const AppRouter = () => {
  const [logined, setLogined] = useState(false);
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    (async () => {
      const res = await get(`/me?token=${token}`, null, {});
      if (res.data.ans) {
        setLogined(true);
      }
    })();
    return () => {};
  }, [token]);
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
          logined ? <Redirect to="/home" /> : <Redirect to="/login/" />
        }
      />
    </Router>
  );
};

export default AppRouter;
