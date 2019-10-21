import React, { useState, useEffect } from "react";

import { Typography, message, Input, Button, Form, Modal } from "antd";
import axios from "axios";

import "./style.css";
const { TextArea } = Input;
const { Text } = Typography;

// 增加
const EditModleUI = props => {
  let [loading, setLoading] = useState(false);
  let [visible, setVisible] = useState(false);
  let [name, setName] = useState("");
  let [link, setLink] = useState("");
  let [price, setPrice] = useState("");
  let [detail, setDetail] = useState("");

  useEffect(() => {
    if (props.type === "edit") {
      let product = props.text;
      setName(product.name);
      setLink(product.img_link);
      setPrice(product.price);
      setDetail(product.shop_detail);
    }
    return () => {};
  }, [props]);
  const windowsOpen = () => {
    window.open("https://sm.ms/");
  };
  const handleOk = () => {
    let data = {
      key: props.type === "edit" ? props.text.key : props.lastIdx + 1,
      name: name,
      price: price,
      img_link: link,
      shop_detail: detail
    };
    let token = localStorage.getItem("token");
    setLoading(true);
    axios
      .put(`http://59.110.237.244/api/shop/edit?token=${token}`, data)
      .then(res => {
        console.log(res);
        res.data.code === 1
          ? message.success("修改成功") && setVisible(false)
          : message.error(`操作失败：${res.data.error}`);
      })
      .catch(err => {
        message.error(`操作失败: ${err}`);
      })
      .then(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Modal
        visible={visible}
        title='编辑'
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setVisible(false);
            }}
            key='back'
          >
            取消
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            确认
          </Button>
        ]}
      >
        <Form.Item>
          <Text strong>商品名称（不可重复）</Text>
          <Input
            placeholder='名称'
            className='input'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Text strong underline mark onClick={windowsOpen}>
            图片链接地址（;相隔）
          </Text>
          <Input
            placeholder='链接地址'
            className='input'
            value={link}
            onChange={e => {
              setLink(e.target.value);
            }}
          />
          <Text strong>价格设置（;相隔）</Text>
          <Input
            placeholder='价格设置（分号相隔）'
            className='input'
            value={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
          <Text strong>详细内容</Text>
          <TextArea
            rows={5}
            placeholder='详细内容'
            className='input-long'
            value={detail}
            onChange={e => {
              setDetail(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
      <Button
        className='EditModleUI'
        type='primary'
        onClick={() => {
          setVisible(true);
        }}
      >
        {props.type === "edit" ? "编辑" : "新增商品"}
      </Button>
    </div>
  );
};
export default EditModleUI;
