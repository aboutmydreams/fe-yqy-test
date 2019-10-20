import React from "react";
import AdManageUI from "./AdManageUI";

const mockData = [
  {
    title: "广告系列1",
    imgList: ["http://59.110.237.244/api/startimgget"]
  },
  {
    title: "广告系列2",
    imgList: [
      "http://59.110.237.244/api/startimgget",
      "http://59.110.237.244/api/startimgget"
    ]
  },
  {
    title: "广告系列3",
    imgList: [
      "http://59.110.237.244/api/startimgget",
      "http://59.110.237.244/api/startimgget",
      "http://59.110.237.244/api/startimgget"
    ]
  }
];

const AdManage = () => {
  return <AdManageUI {...mockData}/>;
};

export default AdManage;
