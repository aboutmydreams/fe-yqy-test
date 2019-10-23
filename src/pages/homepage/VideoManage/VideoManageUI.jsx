import React, { useState } from "react";
import { Table } from "antd";
import EditModal from "./EditModal";
import DelModal from "./DeleteModal";

const VideoManageUI = () => {
  let data = [
    {
      key: 0,
      title: "视频1",
      video_link:
        "https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl",
      summary: "一段描述罢了"
    }
  ];
  let columns = [
    {
      title: "视频编号",
      dataIndex: "key",
      key: "key",
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
      dataIndex: "video_link",
      key: "video_link",
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
            <EditModal info={text} onEdit={handleEdit} />
            <DelModal idx={text.key} />
          </span>
        );
      }
    }
  ];
  let [tableData, setTableData] = useState(data);

  const handleEdit = newInfo => {
    const { key } = newInfo;
    Object.assign(data[key], newInfo);
    console.log(data);
    //我啷个晓得为嘛又不更新咯...
    setTableData(data);
  };

  return <Table columns={columns} dataSource={tableData} pagination='bottom' />;
};
export default VideoManageUI;
