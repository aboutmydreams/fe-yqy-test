import React, { useState, Fragment } from "react";
import { Typography, Input, Button, Row, Col, message } from "antd";
import "./style.css";
import axios from "axios";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContentItem = props => {
  let { title, key, content } = props.content;
  let [edit, setEdit] = useState(true);
  // let [desc, setDesc] = useState(content);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const handleChange = e => {
    let result = e.target.value;
    console.log(result);
    // setDesc(result);
  };

  const uploadInfo = (key, content) => {
    // let result = e.target.value;
    console.log(key);
    axios
      .put("http://59.110.237.244/api/system?key=about_us", {
        key: key,
        value: content
      })
      .then(res => {
        if (res.data["code"] === 1) {
          message.success("修改成功");
        } else if (res.data["code"] === 0) {
          message.error("操作失败" + res.data["error"]);
        }
        console.log(res.data);
      })
      .catch(Error => {
        message.error("操作失败，" + Error);
      });
    // setDesc(result);
  };
  return (
    <Fragment>
      <Row>
        <Col span={3}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={6}>
          {edit ? (
            <Button type="primary" onClick={toggleEdit} icon="edit">
              编辑内容
            </Button>
          ) : (
            <Button
              type="default"
              onClick={() => {
                toggleEdit();
                uploadInfo(key, content);
                // props.submit(desc);
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
