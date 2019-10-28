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

const { Title } = Typography;
const StartPage = () => {
  const [startImgInfo, setStartImgInfo] = useState({
    title: "启动页广告",
    idx: 1,
    url:
      "https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E7%91%9E%E5%85%B9&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=1397122558,2205839460&os=3448920624,2312190822&simid=3555761087,588185393&pn=0&rn=1&di=111650&ln=1107&fr=&fmq=1572222510843_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fimg4.18183.duoku.com%2Fuploads%2Fallimg%2F160724%2F28-160H4100111.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined",
    jump: true,
    linkUrl:
      "https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E7%91%9E%E5%85%B9&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=1397122558,2205839460&os=3448920624,2312190822&simid=3555761087,588185393&pn=0&rn=1&di=111650&ln=1107&fr=&fmq=1572222510843_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&hs=2&objurl=http%3A%2F%2Fimg4.18183.duoku.com%2Fuploads%2Fallimg%2F160724%2F28-160H4100111.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined"
  });
  // useEffect(() => {
  //   axios.get("http://59.110.237.244/api/system?key=firstAD").then(res => {
  //     let startCopy = JSON.parse(JSON.stringify(startImgInfo));
  //     const startInfo = JSON.parse(res.data.value);
  //     Object.assign(startCopy, startInfo);
  //     setStartImgInfo(startCopy);
  //   });
  //   return () => {};
  // }, [startImgInfo]);
  const { title } = startImgInfo;
  // const [title, setTitle] = useState(startImgInfo.title);
  const [jump, setJump] = useState(startImgInfo.jump ? true : false);
  const [imgUrl, setImgUrl] = useState(startImgInfo.url);
  console.log(startImgInfo);

  const [linkUrl, setLinkUrl] = useState(jump ? startImgInfo.linkUrl : null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentFileList, setCurrentFileList] = useState([
    {
      name: startImgInfo.name,
      url: startImgInfo.url,
      uid: startImgInfo.idx
    }
  ]);
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
  // //由这一部分来处理上传到服务器
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
        //本地修改预览图,并获取回传的url
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
    axios
      .put("http://59.110.237.244/api/system?key=firstAD", {
        key: "firstAD",
        value: JSON.stringify(imgInfo)
      })
      .then(res => {
        console.log(res);
      });
    //优化交互
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
      message.success("修改图片信息成功");
    }, 1500);
    window.location.reload();
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
        <img
          className='startimg'
          style={{ width: "80%", height: "80%" }}
          src={startImgInfo.url}
          alt='img'
        />
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
                setVisible(false);
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
              上传图片
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
            {startImgInfo.jump ? (
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
