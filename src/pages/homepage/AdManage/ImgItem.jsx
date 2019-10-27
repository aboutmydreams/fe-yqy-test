import React, { useState, useEffect, Fragment } from "react";
import {
  Typography,
  Button,
  Row,
  Col,
  message,
  Upload,
  Modal,
  Icon,
  Tooltip,
  Switch,
  Input
} from "antd";
import axios from "axios";

const ImgItem = props => {
  // console.log(props);
  const { Title } = Typography;
  const [jump, setJump] = useState(props.jump);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(props.imgUrl);
  const [title, setTitle] = useState(props.title);
  const [editLinkUrl, setEditLinkUrl] = useState(jump ? true : false);
  const [linkUrl, setLinkUrl] = useState(editLinkUrl ? props.linkUrl : "");
  const [currentFileList, setCurrentFileList] = useState([
    {
      name: props.name,
      url: props.imgUrl,
      uid: props.listIdx
    }
  ]);
  const [fileName, setFileName] = useState("");
  const handleRemove = () => {
    message.config({
      duration: 1.5,
      maxCount: 3
    });
    if (currentFileList.length === 1) {
      message.error("图片数量必须为1，如果要使用新的图片，请直接上传新的图片");
      return false;
    }
  };

  const handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setCurrentFileList(fileList);
  };

  //由这一部分来处理上传到服务器
  const beforeUpload = file => {
    setFileName(file.name);
    let imgFile = new FormData();
    imgFile.append("file", file);
    const token = localStorage.getItem("token");
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post("http://59.110.237.244/api/upload?token=" + token, imgFile, header)
      .then(res => {
        console.log(res);
        //本地修改预览图
        setImgUrl(res.data.url);
      });

    return false;
  };
  const handleOk = () => {
    const imgInfo = {
      name: fileName,
      jump: jump,
      url: imgUrl,
      linkUrl: jump ? linkUrl : null
    };
    console.log(JSON.stringify(imgInfo));
    if (title === "启动页广告") {
      axios
        .put("http://59.110.237.244/api/system?key=启动页广告", {
          key: "启动页广告",
          value: JSON.stringify(imgInfo)
        })
        .then(res => {
          console.log(res);
        });
    }
    //优化交互
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
      message.success("修改图片信息成功");
    }, 1500);
  };
  const uploadProps = {
    listType: "picture",
    fileList: currentFileList,
    onChange: handleChange,
    onRemove: handleRemove,
    beforeUpload: beforeUpload
  };
  return (
    <Fragment>
      <div>
        <Row>
          <Col span={6}>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              编辑广告
            </Button>
          </Col>
        </Row>
        <br />
        <Title level={4}>图片预览</Title>
        <img
          className="startimg"
          style={{ width: "80%", height: "80%" }}
          src={imgUrl}
          alt="img"
        />
        <Modal
          visible={visible}
          title={title}
          onCancel={() => {
            setVisible(false);
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={() => {
                handleOk();
              }}
            >
              确认
            </Button>
          ]}
        >
          <Upload
            accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp"
            {...uploadProps}
          >
            <Button>
              <Icon type="upload" />
              上传图片
            </Button>
          </Upload>
          <br />
          <div>
            <p>在点击图片时跳转链接</p>
            <Switch
              checkedChildren="开"
              onChange={() => {
                setJump(!jump);
                setEditLinkUrl(!editLinkUrl);
              }}
              unCheckedChildren="关"
              defaultChecked={jump}
            />
            {editLinkUrl ? (
              <Input
                value={linkUrl}
                placeholder="请输入点击图片后跳转的链接"
                onChange={e => {
                  setLinkUrl(e.target.value);
                }}
                allowClear
                prefix={<Icon type="link" />}
                suffix={
                  <Tooltip title="请输入完整链接">
                    <Icon
                      type="info-circle"
                      style={{ color: "rgba(0,0,0,.45)" }}
                    />
                  </Tooltip>
                }
              />
            ) : null}
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};
export default ImgItem;
