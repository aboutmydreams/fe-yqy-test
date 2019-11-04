import React, { Fragment, useState, useEffect } from "react";
import ContentItem from "./ContentItem";
import { Spin } from "antd";
import { get } from "../../../request/http";

const Content = () => {
  const [aboutApp, setAboutApp] = useState("");
  const [aboutInfoWeb, setAboutInfoWeb] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const [loadingApp, setLoadingApp] = useState(true);
  const [loadingInfoWeb, setLoadingInfoWeb] = useState(true);
  const [loadingUs, setLoadingUs] = useState(true);

  //这个加载占位符的效果好像并不如预期，因为最好好像是把占位符放在内容区域
  useEffect(() => {
    (async () => {
      const [appRes, infoWebRes, usRes] = await Promise.all([
        get("/system?key=about_app"),
        get("/system?key=about_info_web"),
        get("/system?key=about_us")
      ]);
      setAboutApp(appRes.data.value);
      setLoadingApp(false);
      setAboutInfoWeb(infoWebRes.data.value);
      setLoadingInfoWeb(false);
      setAboutUs(usRes.data.value);
      setLoadingUs(false);
    })();

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
        <Spin />
      ) : (
        <ContentItem
          saveEdition={editContent}
          content={{
            title: "软件介绍",
            key: "about_app",
            content: aboutApp
          }}
        />
      )}
      {loadingInfoWeb ? (
        <Spin />
      ) : (
        <ContentItem
          saveEdition={editContent}
          content={{
            title: "信息联网",
            key: "about_info_web",
            content: aboutInfoWeb
          }}
        />
      )}
      {loadingUs ? (
        <Spin />
      ) : (
        <ContentItem
          saveEdition={editContent}
          content={{
            title: "关于我们",
            key: "about_us",
            content: aboutUs
          }}
        />
      )}
    </Fragment>
  );
};

export default Content;
