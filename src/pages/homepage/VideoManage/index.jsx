import React, { useState, useEffect } from "react";
import VideoManageUI from "./VideoManageUI.jsx";
import { message } from "antd";
import _ from "lodash";
import { get, post, deleteItem, put } from "../../../request/http";
const token = localStorage.getItem("token");

const VideoManage = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await get(`/video?token=${token}`);
      console.log(res);
      setVideoList(res.data.data);
    })();
    //eslint-disable-next-line
  }, []);

  const handleEdit = (newInfo, idx) => {
    const { title, url, summary } = newInfo;
    if (title === "" || url === "" || summary === "") {
      return Promise.reject("error");
    } else {
      (async () => {
        const res = await put(`/video?token=${token}`, newInfo);
        if (res.data.data === 1) {
          const newList = _.cloneDeep(videoList);
          Object.assign(newList[idx], newInfo);
          setVideoList(newList);
        }
      })();
      return Promise.resolve();
    }
  };

  const handleAdd = newInfo => {
    const { title, url, summary } = newInfo;
    if (title === "" || url === "" || summary === "") {
      return Promise.reject("error");
    } else {
      (async () => {
        const res = await post(`/video?token=${token}`, newInfo);
        if (res.data.data === 1) {
          const newList = _.cloneDeep(videoList);
          newList.push(newInfo);
          setVideoList(newList);
          message.success("视频信息添加成功");
        }
      })();
      return Promise.resolve();
    }
  };

  const handleDelete = idx => {
    const token = localStorage.getItem("token");
    (async () => {
      await deleteItem(`/video?token=${token}`, {
        video_id: idx
      });
      await message.success({
        content: "删除成功",
        duration: 0.8
      });
      window.location.reload();
    })();
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
