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

  const { info, onEdit, idx } = props;
  message.config({
    duration: 1.5,
    maxCount: 3
  });
  useEffect(() => {
    const { url, title, summary, cover } = info;
    setTitle(title);
    setUrl(url);
    setSum(summary);
    setImgUrl(cover);
    setImgFileList([
      {
        name: title,
        uid: -1,
        url: cover
      }
    ]);
    setVideoFileList([
      {
        //文字列表这样设置可以实现将视频名称作为超链接
        name: url,
        uid: -1,
        url: url
      }
    ]);
    return () => {};
    //如果出现上传之后又便会原先的图片，注意是不是deps的问题
    //eslint-disable-next-line
  }, []);

  const onOk = () => {
    const { video_id } = props.info;
    const newInfo = {
      video_id: video_id,
      title: title,
      url: url,
      summary: sum,
      cover: imgUrl
    };
    console.log(newInfo);
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
  //在change钩子和beforeUpload钩子都要写一遍逻辑的原因：
  //change钩子阻止改变列表，但会继续上传
  const beforeImgUpload = file => {
    if (file.size / 1024 / 1024 > 20) {
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

  const beforeVideoUpload = file => {
    if (file.size / 1024 / 1024 > 20) {
      return false;
    }
    let videoFile = new FormData();
    videoFile.append("file", file);
    (async () => {
      const res = await post(`/upload?token=${token}`, videoFile, header);
      console.log(res);
      setUrl(res.data.url);
    })();
    return false;
  };

  // FIXME: 如果有必要的话图片、视频的嫦娥逻辑可以改成相同的
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
    if (file.size / 1024 / 1024 > 20) {
      message.error("请上传小于20MB的视频");
      return false;
    }
    setVideoFileList([
      {
        name: file.name,
        uid: -1,
        url: url
      }
    ]);
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
        <br />
        <Row>
          <Col span={24}>
            <Text>视频文件：</Text>
            <Upload
              accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
              {...imgUploadProps}
            >
              <Button>
                <Icon type='upload' />
                上传封面
              </Button>
            </Upload>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Text>视频封面：</Text>
            <Upload
              accept='.avi,.mov,.rmvb,.wmv,.flv,.mp4,.3gp,.mpg,.wma,.mkv,.webm,'
              {...videoUploadProps}
            >
              <Button>
                <Icon type='upload' />
                上传视频
              </Button>
            </Upload>
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
