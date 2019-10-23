import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import RealTimeData from "../RealTimeData";
import AdManage from "../AdManage";
import ShopManage from "../ShopManage";
import Admission from "../Admission";
import Mailbox from "../Mailbox";
import Content from "../ContentManage";
import VideoManage from "../VideoManage";

const HomeRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route path='/home/AdManage/' component={AdManage} />
        <Route path='/home/Content' component={Content} />
        <Route path='/home/ShopManage/' component={ShopManage} />
        <Route path='/home/Admission/' component={Admission} />
        <Route path='/home/Mailbox/' component={Mailbox} />
        <Route path='/home/VideoManage/' component={VideoManage} />
        <Route component={RealTimeData} />
      </Switch>
    </Fragment>
  );
};

export default HomeRouter;
