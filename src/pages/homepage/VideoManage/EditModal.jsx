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
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [sum, setSum] = useState("");
  useEffect(() => {
    const { info } = props;
    const { url, title, summary } = info;
    setTitle(title);
    setUrl(url);
    setSum(summary);
    return () => {};
  }, [props]);

  const onOk = () => {
    const { video_id } = props.info;
    const newInfo = {
      video_id: video_id,
      title: title,
      url: url,
      summary: sum
    };
    props.onEdit(newInfo);
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
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
