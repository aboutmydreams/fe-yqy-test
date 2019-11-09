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
import { put, post } from "../../../request/http";
import _ from "lodash";
import "./style.css";
const { TextArea } = Input;
const { Text } = Typography;
const header = { headers: { "Content-Type": "multipart/form-data" } };
const token = localStorage.getItem("token");

//FIXME: 还是最好用模态框+表单域来解决，明天一定要再试试用getFieldDecorator来处理

const EditShopModal = props => {
  console.log(props);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  //商品信息
  const [name, setName] = useState("");
  const [imgLink, setImgLink] = useState([]);
  const [imgDetail, setImgDetail] = useState([]);
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  //编辑模态框上传组件的上传列表
  const [coverImgList, setCoverImgList] = useState([]);
  const [detailImgList, setDetailImgList] = useState([]);

  useEffect(() => {
    //这个组件的imgLink始终为数组格式，只有在上传时才会转为字符串
    const { productInfo } = props;
    const { name, img_link, img_detail, price, shop_detail } = productInfo;
    const imgLinkArr = img_link.split(";");
    const imgDetailArr = img_detail.split(";");

    setName(name);
    setImgLink(imgLinkArr);
    setImgDetail(imgDetailArr);
    setPrice(price);
    setDetail(shop_detail);

    imgLinkArr.map((link, idx) => {
      return coverImgList.push({
        uid: idx,
        name: name,
        url: link
      });
    });
    imgDetailArr.map((link, idx) => {
      return detailImgList.push({
        uid: idx,
        name: name,
        url: link
      });
    });
    return () => {};
    //eslint-disable-next-line
  }, []);

  const handleOk = () => {
    console.log(coverImgList);
    let newImgLink = [];
    let newImgDetail = [];

    coverImgList.map(item => {
      return newImgLink.push(item.url);
    });
    detailImgList.map(item => {
      return newImgDetail.push(item.url);
    });

    const newProductInfo = {
      key: props.productInfo.key,
      name: name,
      price: price,
      //如果没有上传新的，则使用原本的封面/详情图片（保留）
      img_link: newImgLink.length === 0 ? imgLink : newImgLink.join(";"),
      img_detail:
        newImgDetail.length === 0 ? imgDetail : newImgDetail.join(";"),
      shop_detail: detail
    };
    setLoading(true);
    //上传前校验(与新增的模块校验规则稍微不同哈)
    if (
      imgLink.length === 0 ||
      imgDetail.length === 0 ||
      name.trim().length === 0 ||
      price.trim().length === 0 ||
      detail.trim().length === 0
    ) {
      message.error({
        content:
          "请输入完整信息,商品名称、价格以及描述不得为空，如果不上传新的封面以及详情图片，则会采用原本的图片",
        duration: 10
      });
      setLoading(false);
      return false;
    }
    console.log(newProductInfo);
    (async () => {
      try {
        const res = await put(`shop/edit?token=${token}`, newProductInfo);
        const resCode = res.data.code;
        resCode === 1
          ? message.success("修改成功,请刷新列表查看") && setVisible(false)
          : message.error(`操作失败：${res.data.error}`);
      } catch (err) {
        message.error(`操作失败: ${err}`);
        setLoading(false);
      }
    })();
  };

  const handleCoverRemove = file => {
    if (coverImgList.length === 1) {
      message.error("至少保留一张图片");
      return false;
    } else {
      const delIdx = coverImgList.findIndex(item => {
        return item.url === file.url;
      });
      let newCoverImgList = _.cloneDeep(coverImgList);
      newCoverImgList.splice(delIdx, 1);
      console.log(newCoverImgList);
      setCoverImgList(newCoverImgList);
    }
  };
  const handleDetailRemove = file => {
    if (detailImgList.length === 1) {
      message.error("至少保留一张照片");
      return false;
    } else {
      const delIdx = detailImgList.findIndex(item => {
        return item.url === file.url;
      });
      let newDetailImgList = _.cloneDeep(detailImgList);
      newDetailImgList.splice(delIdx, 1);
      setDetailImgList(newDetailImgList);
    }
  };

  const beforeCoverUpload = file => {
    const imgFile = new FormData();
    imgFile.append("file", file);
    (async () => {
      const res = await post(`/upload?token=${token}`, imgFile, header);
      coverImgList.length === 5
        ? setCoverImgList([
            ...coverImgList.slice(-4),
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ])
        : setCoverImgList([
            ...coverImgList,
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ]);
    })();
    return false;
  };
  const beforeDetailUpload = file => {
    const imgFile = new FormData();
    imgFile.append("file", file);
    (async () => {
      const res = await post(`/upload?token=${token}`, imgFile, header);
      detailImgList.length === 5
        ? setDetailImgList([
            ...detailImgList.slice(-4),
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ])
        : setDetailImgList([
            ...detailImgList,
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ]);
    })();
    return false;
  };

  const coverProps = {
    listType: "picture",
    fileList: coverImgList,
    beforeUpload: beforeCoverUpload,
    onRemove: handleCoverRemove
  };
  const detailProps = {
    listType: "picture",
    fileList: detailImgList,
    beforeUpload: beforeDetailUpload,
    onRemove: handleDetailRemove
  };
  return (
    <div>
      <Modal
        visible={visible}
        title='编辑'
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
          <Upload
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            {...coverProps}
          >
            <Button>
              <Icon type='upload' />
              上传封面图片(数量限制：5)
            </Button>
          </Upload>
          <Upload
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            {...detailProps}
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
        }}
      >
        编辑
      </Button>
    </div>
  );
};
export default EditShopModal;
