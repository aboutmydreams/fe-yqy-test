import React, { Fragment, useState, useEffect } from "react";
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
  Input,
  Spin
} from "antd";
import { post } from "../../../request/http";
import PropTypes from "prop-types";
const { Title } = Typography;
const token = localStorage.getItem("token");
const header = { headers: { "Content-Type": "multipart/form-data" } };

const AdsItem = props => {
  const { title, onSubmit, idxInList, keyWord } = props;
  const [imgUrl, setImgUrl] = useState("");
  const [jump, setJump] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [currentFileList, setCurrentFileList] = useState([
    {
      name: props.name,
      url: props.url,
      uid: -1
    }
  ]);
  //页面交互相关
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setJump(props.jump);
    setLinkUrl(props.linkUrl);
    setImgUrl(props.url);
    setFileName(props.name);
    setImgLoading(false);
    return () => { };
    //eslint-disable-next-line
  }, []);

  const handleChange = info => {
    const { file, fileList } = info;
    if (file.size / 1024 / 1024 > 10) {
      message.error("请上传小于10MB的图片");
      return false;
    }
    let newFileList = [...fileList];
    newFileList = fileList.slice(-1);
    setCurrentFileList(newFileList);
  };

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

  const beforeUpload = file => {
    if (file.size / 1024 / 1024 > 200) {
      return false;
    }
    setFileName(file.name);
    let imgFile = new FormData();
    imgFile.append("file", file);
    (async () => {
      const res = await post(`/upload?token=${token}`, imgFile, header);
      setImgUrl(res.data.url);
    })();
    return false;
  };

  const handleOk = () => {
    setSubmitLoading(true);
    const imgInfo = {
      name: fileName,
      jump: jump,
      url: imgUrl,
      linkUrl: jump ? linkUrl : null
    };
    onSubmit(idxInList, keyWord, imgInfo);
    setTimeout(() => {
      setSubmitLoading(false);
      setVisible(false);
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
              icon="edit"
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
        {imgLoading ? (
          <Spin />
        ) : (
            <img
              className="startimg"
              style={{ width: "180px", height: "320px" }}
              src={imgUrl}
              alt="img"
            />
          )}
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
              loading={submitLoading}
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
              请上传比例为16：9的图片，图片大小不能超过20MB
            </Button>
          </Upload>
          <br />
          <div>
            <p>在点击图片时跳转链接</p>
            <Switch
              checkedChildren="开"
              onChange={() => {
                setJump(!jump);
              }}
              unCheckedChildren="关"
              defaultChecked={jump}
            />
            {jump ? (
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

AdsItem.propTypes = {
  idx: PropTypes.number.isRequired,
  idxInList: PropTypes.number.isRequired,
  jump: PropTypes.bool.isRequired,
  keyWord: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string,
  url: PropTypes.string.isRequired
};
export default AdsItem;
