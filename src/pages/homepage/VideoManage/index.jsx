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
      console.log(res);
    });
  }, [token]);

  const handleEdit = newInfo => {
    const { video_id } = newInfo;
    console.log(newInfo);
    axios
      .put("http://59.110.237.244/api/video?token=" + token, newInfo)
      .then(res => {
        if (res.data.code === 1) {
          let newList = JSON.parse(JSON.stringify(videoList));
          Object.assign(newList[video_id], newInfo);
          setVideoList(newList);
          message.success("修改成功,如果信息没有更新，请刷新列表");
        }
      });
  };
  const handleAdd = newInfo => {
    const { video_id, summary, title, url } = newInfo;
    console.log(newInfo);
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
          message.success("视频信息添加成功");
        } else {
          message.error("请输入完整的视频信息！");
        }
      });
  };

  const handleDelete = idx => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://59.110.237.244/api/video?token=" + token, {
        data: {
          video_id: idx
        }
      })
      .then(() => {
        window.location.reload();
      });
  };
  return (
    <VideoManageUI
      videoList={videoList}
      onEdit={handleEdit}
      onAdd={handleAdd}
      onDelete={handleDelete}
    />
  );
};

export default VideoManage;
