import React, { useState, Fragment } from "react";
import {
  Switch,
  Button,
  Modal,
  Upload,
  Icon,
  Tooltip,
  Input,
  message
} from "antd";
const ModalCom = props => {
  // console.log(props);
  //
  let [editLinkUrl, setEditLinkUrl] = useState(props.jump ? true : false);
  let [linkUrl, setLinkUrl] = useState(editLinkUrl ? props.linkUrl : "");
  let [currentFileList, setCurrentFileList] = useState([
    {
      uid: `${props.seriesIdx}-${props.listIdx}`,
      name: props.imgName,
      status: props.imgStatus,
      url: props.imgUrl
    }
  ]);
  const changePreview = props.changePreview;
  //这里的数据实际上也是来自于服务器的，是对在index.jsx中获得数据进行筛选后得到的
  const handleChange = info => {
    //info: file fileList event
    console.log(info);
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setCurrentFileList(fileList);
    if (info.file.status === "done") {
      //把服务器响应的地址回传给对应的<ImgItem />组件
      let newImgUrl = info.file.response.url;
      console.log(newImgUrl);
      changePreview(newImgUrl);
    }
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
  const handleSubmit = () => {
    //在这里执行上传图片到服务器并获取url，但可能是我打开的方式不对（雾），接口传回的是code为0的情况
    // console.log(fileList, linkUrl);
  };
  const uploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    // defaultFileList: currentFileList,
    fileList: currentFileList,
    onChange: handleChange,
    onRemove: handleRemove
  };

  return (
    <Modal
      visible={props.visible}
      title={props.title}
      footer={[
        <Button
          key='back'
          onClick={() => {
            props.hide();
          }}
        >
          取消
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={props.loading}
          onClick={() => {
            props.handleOk();
            handleSubmit();
          }}
        >
          确认
        </Button>
      ]}
    >
      {/* 上传至oss https://ant.design/components/upload-cn/ */}

      <Fragment>
        <Upload
          accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
          // fileList={currentFileList}
          {...uploadProps}
        >
          <Button>
            <Icon type='upload' />
            上传图片
          </Button>
        </Upload>
      </Fragment>
      <br />
      <div>
        <p>在点击图片时跳转链接</p>
        <Switch
          checkedChildren='开'
          onChange={() => {
            setEditLinkUrl(!editLinkUrl);
          }}
          unCheckedChildren='关'
          defaultChecked={props.jump}
        />
        {editLinkUrl ? (
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
                <Icon type='info-circle' style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default ModalCom;
