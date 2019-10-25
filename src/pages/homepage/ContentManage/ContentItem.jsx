import React, { useState, Fragment } from "react";
import { Typography, Input, Button, Row, Col, message } from "antd";
import Axios from "axios";
import "./style.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContentItem = props => {
  let { title, content } = props.content;
  let [editable, setEditable] = useState(true);
  let [desc, setDesc] = useState(content);

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleChange = e => {
    let result = e.target.value;
    setDesc(result);
  };
  const handleSubmit = (content, title) => {
    Axios.put("http://59.110.237.244/api/system", {
      key: title,
      value: content
    }).then(res => {
      console.log(res);
      if (res.data.code === 1) {
        message.success("保存成功");
      }
    });
  };
  return (
    <Fragment>
      <Row>
        <Col span={3}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={6}>
          {editable ? (
            <Button type='primary' onClick={toggleEdit} icon='edit'>
              编辑内容
            </Button>
          ) : (
            <Button
              type='default'
              onClick={() => {
                toggleEdit();
                handleSubmit(desc, title);
              }}
              icon='check'
            >
              保存修改
            </Button>
          )}
        </Col>
      </Row>
      {editable ? (
        <Row>
          <Col span={18} style={{ lineHeightL: "6px" }}>
            <Text>{desc}</Text>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={18}>
            <TextArea
              rows={6}
              size='large'
              prefix='snippets'
              className='input-long'
              defaultValue={desc}
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
