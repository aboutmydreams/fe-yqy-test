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

const EditModal = props => {
  let { info } = props;
  let [visible, setVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let [title, setTitle] = useState("");
  let [link, setLink] = useState("");
  let [sum, setSum] = useState("");
  useEffect(() => {
    let { info } = props;
    setTitle(info.title);
    setLink(info.video_link);
    setSum(info.summary);
    return () => {};
  }, [props, setLink, setSum, setTitle]);
  const onOk = () => {
    let newInfo = {
      key: info.key,
      title: title,
      video_link: link,
      summary: sum
    };
    props.onEdit(newInfo);
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
            // loading={props.loading}
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
              placeholder='请输入视频描述'
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
        编辑
      </Button>
    </Fragment>
  );
};
export default EditModal;
