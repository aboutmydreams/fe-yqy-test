import React, { useState, useEffect } from "react";
import VideoManageUI from "./VideoManageUI.jsx";
import axios from "axios";
import { message } from "antd";
import _ from "lodash";

const VideoManage = () => {
  const token = localStorage.getItem("token");
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    axios.get("http://59.110.237.244/api/video?token=" + token).then(res => {
      setVideoList(res.data.data);
    });
  }, [token]);

  const handleEdit = (newInfo, idx) => {
    const { title, url, summary } = newInfo;
    if (title === "" || url === "" || summary === "") {
      return Promise.reject("error");
    } else {
      axios
        .put("http://59.110.237.244/api/video?token=" + token, newInfo)
        .then(res => {
          if (res.data.code === 1) {
            const newList = _.cloneDeep(videoList);
            Object.assign(newList[idx], newInfo);
            setVideoList(newList);
            message.success("修改成功,如果信息没有更新，请刷新列表");
          }
        });
      return Promise.resolve();
    }
  };
  const handleAdd = newInfo => {
    const { title, url, summary } = newInfo;
    if (title === "" || url === "" || summary === "") {
      return Promise.reject("error");
    } else {
      axios
        .post("http://59.110.237.244/api/video?token=" + token, newInfo)
        .then(res => {
          if (res.data.code === 1) {
            const newList = _.cloneDeep(videoList);
            newList.push(newInfo);
            setVideoList(newList);
            message.success("视频信息添加成功");
          }
        });
      return Promise.resolve();
    }
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
        message.success("删除成功");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
