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

const EditModal = props => {
  // console.log(props);
  const token = localStorage.getItem("token");
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
    console.log(price);
    setName(name);
    setImgLink(img_link.split(";"));
    setImgDetail(img_detail.split(";"));
    setPrice(price);
    setDetail(shop_detail);
    // img_link.split(";").map((link, idx) => {
    //   coverImgList.push({
    //     name: name,
    //     uid: idx,
    //     url: link
    //   });
    //   return true;
    // });
    return () => {};
  }, [props]);

  const handleOk = () => {
    let newImgLink = [];
    let newImgDetail = [];

    coverImgList.map(item => {
      newImgLink.push(item.url);
      return true;
    });
    detailImgList.map(item => {
      newImgDetail.push(item.url);
      return true;
    });

    const newProductInfo = {
      key: props.productInfo.key,
      name: name,
      price: price,
      //如果没有上传新的，则使用原本的封面/详情图片
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

    axios
      .put("http://59.110.237.244/api/shop/edit?token=" + token, newProductInfo)
      .then(res => {
        console.log(res);
        res.data.code === 1
          ? message.success("修改成功,请刷新列表查看") && setVisible(false)
          : message.error(`操作失败：${res.data.error}`);
        setLoading(false);
        //FIXME: 这里的刷新有可能发生在提示信息出现之前，是否考虑让用户手动刷新？我们提示
        // window.location.reload();
      })
      .catch(err => {
        message.error(`操作失败: ${err}`);
      });
  };

  //哈哈哈！在beforeUpload里处理文件数量限制就解决了钩子函数冲突问题
  //但为了实现实时预览以及编辑效果应该还是会用到这个钩子
  const handleCoverChange = info => {
    // let fileList = [...info.fileList];
    // fileList = fileList.slice(-5);
    // setCoverImgList([...fileList]);
  };

  const handleDetailChange = info => {
    // let fileList = [...info.fileList];
    // fileList = fileList.slice(-5);
    // setDetailImgList([...fileList]);
  };

  const handleCoverRemove = file => {
    if (coverImgList.length === 1) {
      message.error("至少保留一张图片");
      return false;
    }
  };
  const handleDetailRemove = file => {
    if (detailImgList.length === 1) {
      message.error("至少保留一张照片");
      return false;
    }
  };
  //TODO:考虑把这两个方法合并一下...？
  const beforeCoverUpload = file => {
    let imgFile = new FormData();
    imgFile.append("file", file);
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post("http://59.110.237.244/api/upload?token=" + token, imgFile, header)
      .then(res => {
        // setImgLink([...imgLink,res.data.url])
        if (coverImgList.length === 5) {
          setCoverImgList([
            ...coverImgList.slice(-4),
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ]);
        } else {
          setCoverImgList([
            ...coverImgList,
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ]);
        }
      });
    return false;
  };
  const beforeDetailUpload = file => {
    let imgFile = new FormData();
    imgFile.append("file", file);
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post("http://59.110.237.244/api/upload?token=" + token, imgFile, header)
      .then(res => {
        // setImgLink([...imgLink,res.data.url])
        if (detailImgList.length === 5) {
          setDetailImgList([
            ...detailImgList.slice(-4),
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ]);
        } else {
          setDetailImgList([
            ...detailImgList,
            {
              name: file.name,
              uid: -Math.random() * 100,
              url: res.data.url
            }
          ]);
        }
      });
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
export default EditModal;
