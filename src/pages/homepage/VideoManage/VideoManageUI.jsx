import React, { Fragment } from "react";
import { Table, Icon, Typography } from "antd";
import EditModal from "./EditModal";
import DelModal from "./DeleteModal";
import AddModal from "./AddModal";
const { Text } = Typography;

const VideoManageUI = ({ onAdd, onEdit, onDelete, videoList }) => {
  const columns = [
    {
      title: "视频编号",
      dataIndex: "video_id",
      key: "video_id",
      align: "center",
      render: text => <p>{text}</p>
    },
    {
      title: "视频名称",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: text => <p>{text}</p>
    },
    {
      title: "视频图片",
      dataIndex: "cover",
      key: "cover",
      align: "center",
      render: imgUrl =>
        imgUrl ? (
          <img
            alt='img'
            src={imgUrl}
            style={{ width: "100px", height: "100px" }}
          />
        ) : (
          <Fragment>
            <Icon
              type='file-image'
              style={{ width: "50px", height: "50px", fontSize: "38px" }}
            ></Icon>
            <Text>未上传图片</Text>
          </Fragment>
        )
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
      align: "center",
      render: text => {
        return <p>{text}</p>;
      }
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (text, record, index) => {
        return (
          <span>
            <EditModal info={text} onEdit={onEdit} idx={index} />
            {/* idx为该删除按钮对应的视频编号 */}
            <DelModal idx={text.video_id} onDelete={onDelete} />
          </span>
        );
      }
    }
  ];

  return (
    <Fragment>
      <AddModal onAdd={onAdd} />
      <Table columns={columns} dataSource={videoList} pagination='bottom' />
    </Fragment>
  );
};
export default VideoManageUI;
