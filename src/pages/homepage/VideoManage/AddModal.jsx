import React, { useState, Fragment } from "react";
import {
  Modal,
  Input,
  Icon,
  Upload,
  Button,
  Row,
  Col,
  Typography,
  message
} from "antd";
import axios from "axios";
const { TextArea } = Input;
const { Text } = Typography;

const AddModal = props => {
  const { lastVideo, onAdd } = props;
  let lastIdx;
  if (lastVideo) {
    lastIdx = lastVideo.video_id;
    console.log(lastIdx);
  }
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [sum, setSum] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([
    {
      name: fileName,
      uid: -1,
      url: imgUrl
    }
  ]);

  const onOk = () => {
    const newInfo = {
      video_id: lastIdx + 1,
      title: title,
      url: url,
      summary: sum,
      cover: imgUrl
    };
    setLoading(true);

    onAdd(newInfo)
      .then(() => {
        setTimeout(() => {
          setVisible(false);
          setLoading(false);
        }, 1200);
      })
      .catch(() => {
        setLoading(false);
        message.error("请输入完整信息");
      });
  };
  const beforeUpload = file => {
    setFileName(file.name);
    let imgFile = new FormData();
    imgFile.append("file", file);
    const token = localStorage.getItem("token");
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post("http://59.110.237.244/api/upload?token=" + token, imgFile, header)
      .then(res => {
        setImgUrl(res.data.url);
      });
    return false;
  };

  const handleChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };
  const handleRemove = () => {
    message.config({
      duration: 1.5,
      maxCount: 3
    });
    if (fileList.length === 1) {
      message.error("图片数量必须为1，如果要使用新的图片，请直接上传新的图片");
      return false;
    }
  };
  const uploadProps = {
    listType: "picture",
    fileList: fileList,
    onChange: handleChange,
    onRemove: handleRemove,
    beforeUpload: beforeUpload
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
            key='back'
            onClick={() => {
              setVisible(false);
            }}
          >
            取消
          </Button>,
          <Button
            key='submit'
            type='primary'
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
            <Text>视频名称：</Text>
            <Input
              value={title}
              placeholder='请输入视频名称'
              allowClear
              prefix={<Icon type='pushpin' />}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Text>视频图片：</Text>
            <Upload {...uploadProps}>
              <Button>
                <Icon type='upload' />
                上传视频图片
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Text>视频链接：</Text>
            <Input
              value={url}
              placeholder='请输入完整的视频链接'
              allowClear
              prefix={<Icon type='play-square' />}
              onChange={e => {
                setUrl(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Text>视频描述：</Text>
            <TextArea
              defaultValue={sum}
              placeholder='请输入视频描述'
              autoSize
              onChange={e => {
                setSum(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Modal>
      <Button
        type='primary'
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </Button>
    </Fragment>
  );
};
export default AddModal;
