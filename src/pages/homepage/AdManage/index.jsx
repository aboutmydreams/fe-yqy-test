import React from "react";
import AdManageUI from "./AdManageUI";

const mockData = [
  {
    title: "广告系列1",
    idx: 1,
    imgList: [
      {
        name: "1-0.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        status: "done",
        jumpOnClick: true,
        linkUrl: "https://cn.bing.com/"
      }
    ]
  },
  {
    title: "广告系列2",
    idx: 2,
    imgList: [
      {
        name: "2-0.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        status: "done",
        jumpOnClick: true,
        linkUrl: "https://cn.bing.com/"
      },
      {
        status: "done",
        name: "2-1.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        jumpOnClick: false
      },
      {
        status: "done",
        name: "2-2.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        jumpOnClick: false
      }
    ]
  },
  {
    title: "广告系列3",
    idx: 3,
    imgList: [
      {
        name: "3-0.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        status: "done",
        jumpOnClick: true,
        linkUrl: "https://cn.bing.com/"
      },
      {
        name: "3-1.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        jumpOnClick: true,
        status: "done",
        linkUrl: "https://cn.bing.com/"
      },
      {
        name: "3-2.png",
        imgUrl: "http://59.110.237.244/api/startimgget",
        status: "done",
        jumpOnClick: true,
        linkUrl: "https://cn.bing.com/"
      }
    ]
  }
];

const AdManage = () => {
  return <AdManageUI {...mockData} />;
};

export default AdManage;
