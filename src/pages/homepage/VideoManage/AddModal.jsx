import React, { useState, Fragment } from "react";
import {
  Modal,
  Input,
  Icon,
  Button,
  Row,
  Col,
  Typography,
  message,
  Upload,
  Spin
} from "antd";
import { post } from "../../../request/http";
const { TextArea } = Input;
const { Text } = Typography;

const AddModel = props => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const token = localStorage.getItem("token");

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [sum, setSum] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgFileList, setImgFileList] = useState([]);
  const [videoFileList, setVideoFileList] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const { onAdd } = props;
  message.config({
    duration: 1.5,
    maxCount: 3
  });

  const onOk = () => {
    const newInfo = {
      title: title,
      url: url,
      summary: sum,
      cover: imgUrl
    };
    console.log(newInfo);
    setLoading(true);
    (async () => {
      try {
        await onAdd(newInfo);
        setTimeout(() => {
          setVisible(false);
          setLoading(false);
          message.success("修改成功");
          window.location.reload();
        }, 1200);
      } catch {
        setLoading(false);
        message.error("请输入完整信息");
      }
    })();
  };
  const beforeImgUpload = file => {
    if (file.size / 1024 / 1024 > 20) {
      message.error("请上传小于20MB的图片");
      return false;
    }
    let imgFile = new FormData();
    imgFile.append("file", file);
    (async () => {
      const res = await post(`/upload?token=${token}`, imgFile, header);
      setImgUrl(res.data.url);
    })();
    return false;
  };

  const beforeVideoUpload = async file => {
    if (file.size / 1024 / 1024 > 200) {
      message.error("请上传小于200MB的视频");
      return false;
    }
    setSpinning(true);
    let videoFile = new FormData();
    videoFile.append("file", file);
    console.log(file);
    const res = await post(`/upload?token=${token}`, videoFile, header);
    setSpinning(false);
    setUrl(res.data.url);
    setVideoFileList([
      {
        name: file.name,
        uid: -1,
        url: res.data.url
      }
    ]);

    return false;
  };

  const handleImgChange = info => {
    const { file } = info;
    if (file.size / 1024 / 1024 > 20) {
      message.error("请上传小于20MB的图片");
      return false;
    }
    let imgFileList = [...info.fileList];
    imgFileList = imgFileList.slice(-1);
    setImgFileList(imgFileList);
  };

  const handleVideoChange = info => {
    const { file } = info;
    if (file.size / 1024 / 1024 > 200) {
      message.error("请上传小于20MB的视频");
      return false;
    }
  };

  const handleImgRemove = () => {
    if (imgFileList.length === 1) {
      message.error("图片数量必须为1，如果要使用新的图片，请直接上传新的图片");
      return false;
    }
  };

  const handleVideoRemove = () => {
    if (videoFileList.length === 1) {
      message.error("视频数量必须为1，如果要修改视频内容，请直接上传新的视频");
      return false;
    }
  };

  const imgUploadProps = {
    listType: "picture",
    fileList: imgFileList,
    onChange: handleImgChange,
    onRemove: handleImgRemove,
    beforeUpload: beforeImgUpload
  };

  const videoUploadProps = {
    listType: "text",
    fileList: videoFileList,
    onChange: handleVideoChange,
    onRemove: handleVideoRemove,
    beforeUpload: beforeVideoUpload
  };
  return (
    <Fragment>
      <Modal
        visible={visible}
        title={title}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            icon="close"
            key="back"
            onClick={() => {
              setVisible(false);
            }}
          >
            取消
          </Button>,
          <Button
            icon="check"
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              onOk();
            }}
          >
            确认
          </Button>
        ]}
      >
        <Row>
          <Col span={12}>
            <Text>视频描述：</Text>
            <Input
              value={title}
              placeholder="请输入视频名称"
              allowClear
              prefix={<Icon type="pushpin" />}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Text>视频封面：</Text>
            <Upload
              accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp"
              {...imgUploadProps}
            >
              <Button>
                <Icon type="picture" />
                上传封面
              </Button>
            </Upload>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Text>视频内容：</Text>
            <Upload
              accept=".avi,.mov,.rmvb,.wmv,.flv,.mp4,.3gp,.mpg,.wma,.mkv,.webm,"
              {...videoUploadProps}
            >
              <Button>
                <Icon type="play-square" />
                上传视频
              </Button>
              <Spin tip="上传中..." spinning={spinning} />
            </Upload>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Text>视频描述：</Text>
            <TextArea
              defaultValue={sum}
              placeholder="请输入视频描述"
              autoSize
              onChange={e => {
                setSum(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        icon="plus-circle"
      >
        新增
      </Button>
    </Fragment>
  );
};
export default AddModel;
