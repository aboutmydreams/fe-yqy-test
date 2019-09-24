import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import RealTimeData from "../RealTimeData";
import AdManage from "../AdManage";
import Startimg from "../Startimg";
import ShopManage from "../ShopManage";
import Admission from "../Admission";
import Mailbox from "../Mailbox";

const HomeRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/home/AdManage/" component={AdManage} />
        <Route path="/home/Startimg/" component={Startimg} />
        <Route path="/home/ShopManage/" component={ShopManage} />
        <Route path="/home/Admission/" component={Admission} />
        <Route path="/home/Mailbox/" component={Mailbox} />
        <Route component={RealTimeData} />
      </Switch>
    </Fragment>
  );
};

export default HomeRouter;
