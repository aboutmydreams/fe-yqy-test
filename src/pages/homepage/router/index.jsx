import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import RealTimeData from "../RealTimeData";
import SignUpForExam from "../SignUpForExam";
import FirstInterview from "../FirstInterview";
import SecondInterview from "../SecondInterview";
import Admission from "../Admission";
import Mailbox from "../Mailbox";

const HomeRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/home/SignUpForExam/" component={SignUpForExam} />
        <Route path="/home/FirstInterview/" component={FirstInterview} />
        <Route path="/home/SecondInterview/" component={SecondInterview} />
        <Route path="/home/Admission/" component={Admission} />
        <Route path="/home/Mailbox/" component={Mailbox} />
        <Route component={RealTimeData} />
      </Switch>
    </Fragment>
  );
};

export default HomeRouter;
