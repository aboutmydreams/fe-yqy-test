import React, { useState, useEffect } from "react";
import VideoManageUI from "./VideoManageUI.jsx";
import axios from "axios";
import { message } from "antd";

const VideoManage = () => {
  const token = localStorage.getItem("token");

  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    axios.get("http://59.110.237.244/api/video?token=" + token).then(res => {
      setVideoList(res.data.data);
    });
  }, [token]);

  const handleEdit = newInfo => {
    const { video_id, summary, title, url } = newInfo;
    console.log(newInfo);
    axios
      .put("http://59.110.237.244/api/video?token=" + token, {
        video_id: video_id,
        summary: summary,
        url: url,
        title: title
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 1) {
          let newList = JSON.parse(JSON.stringify(videoList));
          Object.assign(newList[video_id - 1], { ...newInfo });
          setVideoList(newList);
          message.success("修改成功~");
        }
      });
  };
  const handleAdd = newInfo => {
    const { video_id, summary, title, url } = newInfo;

    axios
      .post("http://59.110.237.244/api/video?token=" + token, {
        video_id: video_id,
        summary: summary,
        url: url,
        title: title
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 1) {
          let newList = JSON.parse(JSON.stringify(videoList));
          newList.push(newInfo);
          setVideoList(newList);
          message.success("添加成功~");
        }
      });
  };

  return (
    <VideoManageUI
      videoList={videoList}
      onEdit={handleEdit}
      onAdd={handleAdd}
    />
  );
};

export default VideoManage;
