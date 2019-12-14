import React, { useState, Fragment } from "react";
import { Typography, Input, Button, Row, Col, message } from "antd";
import PropTypes from "prop-types";
import "./style.css";
import { put } from "../../../request/http";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContentItem = props => {
  console.log(props);
  const { content, saveEdition } = props;
  let { title, key, content: initContent } = content;
  const [edit, setEdit] = useState(true);
  const [editedContent, setEditedContent] = useState(initContent);

  const handleChange = e => {
    let result = e.target.value;
    setEditedContent(result);
  };

  const uploadInfo = key => {
    (async () => {
      try {
        const res = await put(`/system?key=${key}`, {
          key: key,
          value: editedContent
        });
        const code = res.data.code;
        code === 1
          ? message.success("修改成功") && saveEdition(key, editedContent)
          : message.error("操作失败" + res.data["error"]);
      } catch (Error) {
        message.error("操作失败，" + Error);
      }
    })();
  };
  return (
    <Fragment>
      <Row className="title">
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
                  uploadInfo(key);
                }}
                icon="check"
              >
                保存修改
            </Button>
            )}
        </Col>
      </Row>
      {edit ? (
        <Row className="textarea">
          <Col span={18} style={{ lineHeightL: "6px" }}>
            <Text>{initContent}</Text>
          </Col>
        </Row>
      ) : (
          <Row className="textarea">
            <Col span={18}>
              <TextArea
                rows={6}
                size="large"
                prefix="snippets"
                className="input-long"
                defaultValue={initContent}
                autoSize
                onChange={handleChange}
              ></TextArea>
            </Col>
          </Row>
        )}
    </Fragment>
  );
};
ContentItem.propTypes = {
  content: PropTypes.object.isRequired,
  saveEdition: PropTypes.func.isRequired
};
export default ContentItem;
