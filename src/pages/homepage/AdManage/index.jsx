import React from "react";
import SignUpForExamUI from "./SignUpForExamUI";
import { message } from "antd";

const SignUpForExam = () => {
  const onButtonClick = () => {
    message.success("login");
  };

  return <SignUpForExamUI onButtonClick={onButtonClick} />;
};

export default SignUpForExam;
