import React, { useState, useEffect, Fragment } from "react";
import {
  Modal,
  Input,
  Icon,
  Button,
  Row,
  Col,
  Typography,
  message
} from "antd";
const { TextArea } = Input;
const { Text } = Typography;

const AddModal = props => {
  const { lastVideo } = props;
  let lastIdx;
  if (lastVideo) {
    lastIdx = lastVideo.video_id;
    console.log(lastIdx);
  }
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [sum, setSum] = useState("");

  const onOk = () => {
    const newInfo = {
      video_id: lastIdx + 1,
      title: title,
      url: link,
      summary: sum
    };
    props.onAdd(newInfo);
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
      message.success("修改成功~");
    }, 1200);
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
        <br />
        <Row>
          <Col span={24}>
            <Text>视频链接：</Text>
            <Input
              value={link}
              placeholder='请输入完整的视频链接'
              allowClear
              prefix={<Icon type='play-square' />}
              onChange={e => {
                setLink(e.target.value);
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
