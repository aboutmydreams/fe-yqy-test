import React, { Fragment } from "react";
import { Table } from "antd";
import EditModal from "./EditModal";
import DelModal from "./DeleteModal";
import AddModal from "./AddModal";

const VideoManageUI = ({ onAdd, onEdit, onDelete, videoList }) => {
  const columns = [
    {
      title: "视频编号",
      dataIndex: "video_id",
      key: "video_id",
      render: text => <p>{text}</p>
    },
    {
      title: "视频名称",
      dataIndex: "title",
      key: "title",
      render: text => <p>{text}</p>
    },
    {
      title: "视频链接地址",
      dataIndex: "url",
      key: "url",
      render: text => {
        return (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a href={text} target='_blank'>
            {text}
          </a>
        );
      }
    },
    {
      title: "视频描述",
      dataIndex: "summary",
      key: "summary",
      render: text => {
        return (
          <p>{text}</p>
          // eslint-disable-next-line react/jsx-no-target-blank
        );
      }
    },
    {
      title: "操作",
      key: "action",
      render: text => {
        return (
          <span>
            <EditModal info={text} onEdit={onEdit} />
            {/* idx为该删除按钮对应的视频编号 */}
            <DelModal idx={text.video_id} onDelete={onDelete} />
          </span>
        );
      }
    }
  ];

  return (
    <Fragment>
      <AddModal lastVideo={videoList[videoList.length - 1]} onAdd={onAdd} />
      <Table columns={columns} dataSource={videoList} pagination='bottom' />
    </Fragment>
  );
};
export default VideoManageUI;
