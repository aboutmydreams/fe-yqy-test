import React, { Component, useState } from "react";
import { Switch, Button, Modal, Upload, Icon, Tooltip, Input } from "antd";

class UpLoadCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url: props.currentImgUrl
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = info => {
    console.log(info);
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    this.setState({
      fileList
    });
    console.log(fileList);

    //上传到服务器后，接受回应，并使用返回的外链替换预览
    // this.props.changePreview(fileList[0].url)
  };
  render() {
    const uploadProps = {
      //地址是固定的还是带上title？
      //同一title共享一个编辑按钮？
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      listType: "picture",
      defaultFileList: this.state.fileList,
      onChange: this.handleChange
    };

    return (
      <Upload
        accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
        {...uploadProps}
      >
        <Button>
          <Icon type='upload' />
          请上传图片（一张）
        </Button>
      </Upload>
    );
  }
}

const ModalCom = props => {
  let [editLinkUrl, setEditLinkUrl] = useState(true);
  let [linkUrl, setLinkUrl] = useState("");
  return (
    <Modal
      visible={props.visible}
      title='编辑链接'
      onOk={props.onOk}
      onCancel={props.onCancel}
      footer={[
        <Button key='back' onClick={props.onCancel}>
          取消
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={props.loading}
          onClick={props.onOk}
        >
          确认
        </Button>
      ]}
    >
      {/* 上传至oss https://ant.design/components/upload-cn/ */}
      <UpLoadCom
        currentImgUrl={props.imgUrl}
        changePreview={props.changePreview}
      />
      <br />
      <div>
        <p>在点击图片时跳转链接</p>
        <Switch
          checkedChildren='开'
          onChange={() => {
            setEditLinkUrl(!editLinkUrl);
          }}
          unCheckedChildren='关'
          defaultChecked
        />
        {editLinkUrl ? (
          <Input
            placeholder='请输入点击图片后跳转的链接'
            onChange={e => {
              setLinkUrl(e.target.value);
            }}
            prefix={
              <Icon type='desktop' style={{ color: "rgba(0,0,0,.25)" }} />
            }
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
