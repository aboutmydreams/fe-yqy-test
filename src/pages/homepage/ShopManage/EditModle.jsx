import React, { useState, useEffect } from "react";

import {
  Typography,
  message,
  Input,
  Button,
  Icon,
  Form,
  Modal,
  Upload
} from "antd";
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
  let [coverImgList, setCoverImgList] = useState([]);
  let [detailImgList, setDetailImgList] = useState([]);

  useEffect(() => {
    if (props.type === "edit") {
      let product = props.text;
      setName(product.name);
      setLink(product.img_link);
      setPrice(product.price);
      setDetail(product.shop_detail);
    } else {
      setLink("");
    }
    return () => {};
  }, [link, name, props]);

  const handleOk = () => {
    let jsonData = {
      // key: props.type === "edit" ? props.text.key : props.lastIdx + 1,
      name: name,
      price: price,
      img_link: link,
      shop_detail: detail
    };
    let token = localStorage.getItem("token");
    setLoading(true);
    props.type === "edit"
      ? axios
          //编辑
          .put("http://59.110.237.244/api/shop/edit?token=" + token, {
            data: jsonData
          })
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
          })
      : axios
          //新增
          .post(`http://59.110.237.244/api/shop/edit?token=${token}`, jsonData)
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

  let fileList = [];
  let linksArr = link.split(";");
  linksArr.map((link, index) => {
    let obj = {
      uid: Math.random() * 100,
      name: name,
      url: link,
      idx: index
    };
    fileList.push(obj);
    return true;
  });
  // console.log(fileList);

  const coverProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    fileList: coverImgList
  };
  const detailProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    listType: "picture",
    fileList: detailImgList
  };
  const handleCoverChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    setCoverImgList(fileList);
    if (info.file.status === "done") {
      // let newImgUrl = info.file.response.url;
    }
  };
  const handleDetailChange = info => {
    console.log(info);
    let fileList = [...info.fileList];
    // fileList = fileList.slice(-5);
    // setDetailImgList(fileList);
    // if (info.file.status === "done") {
    //   // let newImgUrl = info.file.response.url;
    // }
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
            defaultValue={name}
            // value={name}
            onChange={e => {
              console.log(e);
              setName(e.target.value);
            }}
          />
          {/* 这里的上传逻辑还未处理，
          需要区分新增与编辑的上传逻辑（fileList），以及图片上传限制 */}
          <Upload
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            {...coverProps}
            onChange={handleCoverChange}
          >
            <Button>
              <Icon type='upload' />
              上传封面图片(数量限制：5)
            </Button>
          </Upload>
          <Upload
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            {...detailProps}
            onChange={handleDetailChange}
          >
            <Button>
              <Icon type='upload' />
              上传详情图片(数量限制：5)
            </Button>
          </Upload>
          <Text strong>价格设置（;相隔）</Text>
          <Input
            placeholder='价格设置（分号相隔）'
            className='input'
            defaultValue={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
          <div>
            <Text strong>详细内容 </Text>
          </div>
          <TextArea
            rows={5}
            placeholder='详细内容'
            defaultValue={detail}
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
          //防止re-render过多报错
          if (props.type === "edit") {
            setCoverImgList(fileList);
          }
        }}
      >
        {props.type === "edit" ? "编辑" : "新增商品"}
      </Button>
    </div>
  );
};
export default EditModleUI;
