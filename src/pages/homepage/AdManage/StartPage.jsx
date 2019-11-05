import React, { useState, Fragment, useEffect } from "react";
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
import { get, post, put } from "../../../request/http";

const { Title } = Typography;
const StartPage = props => {
  const { title, keyWord } = props;
  const [startImgInfo, setStartImgInfo] = useState({
    title: title,
    idx: ""
  });
  //页面信息相关变量
  const [imgUrl, setImgUrl] = useState("");
  const [jump, setJump] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [currentFileList, setCurrentFileList] = useState([
    {
      name: fileName,
      url: imgUrl,
      uid: -1
    }
  ]);
  //交互相关变量
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await get(`/system?key=${keyWord}`);
      console.log(res);
      setImgLoading(false);
      const startInfo = JSON.parse(res.data.value);
      const copy = Object.assign({}, startImgInfo, startInfo);
      //copy包含的属性：title id（这两个来自于父组件）
      // name url jump linkUrl 这四个来自于服务器上的图片信息
      setStartImgInfo(copy);
      setImgUrl(copy.url);
      setJump(copy.jump);
      setLinkUrl(copy.linkUrl);
      //在广告管理板块中，所有模态框中的上传组件有且只有一张照片，所以可以写死uid
      setCurrentFileList([
        {
          uid: -1,
          name: copy.name,
          url: copy.url
        }
      ]);
    })();
    async function timeout(ms) {
      await new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
    async function asyncPrint(value, ms) {
      console.time("total");
      await timeout(ms);
      console.log("step1");
      await timeout(1000);
      console.log("step2");
      await timeout(2000);
      console.log("step3");
      console.log(value);
      console.timeEnd("total");
    }
    asyncPrint("111", 5000);
    return () => {};
    // eslint-disable-next-line
  }, []);

  //禁止移除
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
  //限制文件数量及改变列表预览
  const handleChange = info => {
    console.log(startImgInfo);
    const { file, fileList } = info;
    if (file.size / 1024 / 1024 > 1) {
      message.error("请上传小于1MB的图片");
      return false;
    }
    let newFileList = [...fileList];
    newFileList = fileList.slice(-1);
    setCurrentFileList(newFileList);
  };
  //由这一部分来处理上传到服务器
  const beforeUpload = file => {
    //检测文件大小不得超过1MB
    //还是如果超过1MB了我们再给他转一下
    if (file.size / 1024 / 1024 > 1) {
      return false;
    }
    setFileName(file.name);
    let imgFile = new FormData();
    imgFile.append("file", file);
    const token = localStorage.getItem("token");
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    (async () => {
      const res = await post(`/upload?token= ${token}`, imgFile, header);
      setImgUrl(res.data.url);
    })();
    return false;
  };
  //将新的文件信息上传到服务器
  const handleOk = () => {
    setSubmitLoading(true);
    const imgInfo = {
      name: fileName,
      jump: jump,
      url: imgUrl,
      linkUrl: jump ? linkUrl : null
    };
    (async () => {
      const res = await put(`/system?key=${keyWord}"`, {
        key: keyWord,
        value: JSON.stringify(imgInfo)
      });
      setTimeout(() => {
        setSubmitLoading(false);
        setVisible(false);
        message.success("修改图片信息成功");
      }, 1500);
      console.log(res);
    })();
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
              type='primary'
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
            className='startimg'
            style={{ width: "200px", height: "200px" }}
            src={imgUrl}
            alt='img'
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
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            {...uploadProps}
          >
            <Button>
              <Icon type='upload' />
              上传图片(图片大小不能超过1MB)
            </Button>
          </Upload>
          <br />
          <div>
            <p>在点击图片时跳转链接</p>
            <Switch
              checkedChildren='开'
              onChange={() => {
                setJump(!jump);
              }}
              unCheckedChildren='关'
              defaultChecked={jump}
            />
            {jump ? (
              <Input
                value={linkUrl}
                placeholder='请输入点击图片后跳转的链接'
                onChange={e => {
                  setLinkUrl(e.target.value);
                }}
                allowClear
                prefix={<Icon type='link' />}
                suffix={
                  <Tooltip title='请输入完整链接'>
                    <Icon
                      type='info-circle'
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
export default StartPage;
