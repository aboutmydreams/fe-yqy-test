import React, { useState, useEffect, Fragment } from "react";
import {
  Modal,
  Input,
  Icon,
  Button,
  Row,
  Col,
  Typography,
  message,
  Upload
} from "antd";
import { post } from "../../../request/http";
const { TextArea } = Input;
const { Text } = Typography;

const EditModal = props => {
  const token = localStorage.getItem("token");

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

  const { info, onEdit, idx } = props;

  useEffect(() => {
    const { url, title, summary, cover } = info;
    setTitle(title);
    setUrl(url);
    setSum(summary);
    setImgUrl(cover);
    return () => {};
  }, [info]);

  const onOk = () => {
    const { video_id } = props.info;
    const newInfo = {
      video_id: video_id,
      title: title,
      url: url,
      summary: sum,
      cover: imgUrl
    };
    setLoading(true);
    (async () => {
      try {
        await onEdit(newInfo, idx);
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
  const beforeUpload = (file, fileList) => {
    setFileName(file.name);
    let imgFile = new FormData();
    imgFile.append("file", file);
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    (async () => {
      const res = await post(
        `/upload?token=${token}`,
        imgFile,
        header
      );
      setImgUrl(res.data.url);
    })();
    return false;
  };

  const handleChange = info => {
    console.log(info.fileList);
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
            <Text>视频描述：</Text>
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
        编辑
      </Button>
    </Fragment>
  );
};
export default EditModal;
