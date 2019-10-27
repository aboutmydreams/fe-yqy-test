import React, { useState, Fragment } from "react";
import { Typography, Input, Button, Row, Col, message } from "antd";
import "./style.css";
import axios from "axios";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContentItem = props => {
  let { title, key, content } = props.content;
  const [edit, setEdit] = useState(true);
  const [editedContent, setEditedContent] = useState(content);

  const handleChange = e => {
    let result = e.target.value;
    setEditedContent(result);
  };

  const uploadInfo = (key, content) => {
    console.log(key);
    axios
      .put(`http://59.110.237.244/api/system?key=${key}`, {
        key: key,
        value: editedContent
      })
      .then(res => {
        console.log(res);
        if (res.data["code"] === 1) {
          message.success("修改成功");
          props.saveEdition(key, editedContent);
        } else if (res.data["code"] === 0) {
          message.error("操作失败" + res.data["error"]);
        }
        console.log(res.data);
      })
      .catch(Error => {
        message.error("操作失败，" + Error);
      });
  };
  return (
    <Fragment>
      <Row>
        <Col span={3}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={6}>
          {edit ? (
            <Button
              type="primary"
              onClick={() => {
                setEdit(!edit);
              }}
              icon="edit"
            >
              编辑内容
            </Button>
          ) : (
            <Button
              type="default"
              onClick={() => {
                setEdit(!edit);
                uploadInfo(key, content);
              }}
              icon="check"
            >
              保存修改
            </Button>
          )}
        </Col>
      </Row>
      {edit ? (
        <Row>
          <Col span={18} style={{ lineHeightL: "6px" }}>
            <Text>{content}</Text>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={18}>
            <TextArea
              rows={6}
              size="large"
              prefix="snippets"
              className="input-long"
              defaultValue={content}
              autoSize
              onChange={handleChange}
            ></TextArea>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default ContentItem;
