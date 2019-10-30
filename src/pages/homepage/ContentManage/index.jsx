import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ContentItem from "./ContentItem";
import { Spin } from "antd";

const Content = () => {
  const [aboutApp, setAboutApp] = useState("");
  const [aboutInfoWeb, setAboutInfoWeb] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [loadingApp, setLoadingApp] = useState(false);
  const [loadingInfoWeb, setLoadingInfoWeb] = useState(false);
  const [loadingUs, setLoadingUs] = useState(false);
  //这个加载占位符的效果好像并不如预期，因为最好好像是把占位符放在内容区域
  useEffect(() => {
    axios.get("http://59.110.237.244/api/system?key=about_app").then(res => {
      setAboutApp(res.data.value);
      setLoadingApp(true);
    });
    axios
      .get("http://59.110.237.244/api/system?key=about_info_web")
      .then(res => {
        setAboutInfoWeb(res.data.value);
        setLoadingInfoWeb(true);
      });

    axios.get("http://59.110.237.244/api/system?key=about_us").then(res => {
      setAboutUs(res.data.value);
    });
    setLoadingUs(true);

    return () => {};
  }, []);

  const editContent = (key, editedContent) => {
    switch (key) {
      case "about_app":
        setAboutApp(editedContent);
        break;
      case "about_info_web":
        setAboutInfoWeb(editedContent);
        break;
      case "about_us":
        setAboutUs(editedContent);
        break;
      default:
        console.log(233);
    }
  };

  return (
    <Fragment>
      {loadingApp ? (
        <ContentItem
          saveEdition={editContent}
          content={{
            title: "软件介绍",
            key: "about_app",
            content: aboutApp
          }}
        />
      ) : (
        <Spin />
      )}
      {loadingInfoWeb ? (
        <ContentItem
          saveEdition={editContent}
          content={{
            title: "信息联网",
            key: "about_info_web",
            content: aboutInfoWeb
          }}
        />
      ) : (
        <Spin />
      )}
      {loadingUs ? (
        <ContentItem
          saveEdition={editContent}
          content={{
            title: "关于我们",
            key: "about_us",
            content: aboutUs
          }}
        />
      ) : (
        <Spin />
      )}
    </Fragment>
  );
};

export default Content;
