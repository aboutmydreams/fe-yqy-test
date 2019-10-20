import React, { useState, Fragment } from "react";
import { Typography, Input, Button, Row, Col } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContentItem = props => {
  let { title, content } = props.content;
  let [edit, setEdit] = useState(true);
  let [desc, setDesc] = useState(content);
  const toggleEdit = () => {
    setEdit(!edit);
  };
  const handleChange = e => {
    let result = e.target.value;
    setDesc(result);
  };
  return (
    <Fragment>
      <Row>
        <Col span={3}>
          <Title level={3}>{title}</Title>
        </Col>
        <Col span={6}>
          {edit ? (
            <Button type='primary' onClick={toggleEdit} icon='edit'>
              编辑内容
            </Button>
          ) : (
            <Button
              type='default'
              onClick={() => {
                toggleEdit();
                props.submit(desc);
              }}
              icon='check'
            >
              保存修改
            </Button>
          )}
        </Col>
      </Row>
      {edit ? (
        <Row>
          <Col>
            <Text>{desc}</Text>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={8}>
            <TextArea
              size='middle'
              prefix='snippets'
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
