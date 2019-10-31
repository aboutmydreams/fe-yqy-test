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
import _ from "lodash";

import "./style.css";
const { TextArea } = Input;
const { Text } = Typography;

const EditModleUI = props => {
  let [loading, setLoading] = useState(false);
  let [visible, setVisible] = useState(false);

  //商品信息
  let [name, setName] = useState("");
  let [imgLink, setImgLink] = useState([]);
  let [imgDetail, setImgDetail] = useState([]);
  let [price, setPrice] = useState("");
  let [detail, setDetail] = useState("");

  //编辑模态框上传组件的上传列表
  let [coverImgList, setCoverImgList] = useState([]);
  let [detailImgList, setDetailImgList] = useState([]);

  useEffect(() => {
    const { productInfo } = props;
    setName(productInfo.name);
    setImgLink(productInfo.img_link.split(";"));
    setImgDetail(productInfo.img_detail.split(";"));
    setPrice(productInfo.price);
    setDetail(productInfo.shop_detail);

    //问题：在什么位置，以何种方式填充这个列表
    // setCoverImgList(imgLink => {
    //   imgLink.map((link, idx) => {});
    // });
    // imgLink.map((link, idx) => {
    //   setCoverImgList(
    //     coverImgList.push({
    //       name: name,
    //       uid: idx,
    //       url: link
    //     })
    //   );
    // });
    return () => {};
  }, [name, props]);

  //剩下这里的文件列表样式渲染未完成
  const handleOk = () => {
    const jsonData = {
      key: props.productInfo.key,
      name: name,
      price: price,
      img_link: imgLink.join(";"),
      img_detail: imgDetail.join(";"),
      shop_detail: detail
    };
    let token = localStorage.getItem("token");
    setLoading(true);
    axios
      .put("http://59.110.237.244/api/shop/edit?token=" + token, jsonData)
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

  const handleCoverChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    setCoverImgList(fileList);
  };

  const beforeUpload = file => {
    let imgFile = new FormData();
    imgFile.append("file", file);
    const token = localStorage.getItem("token");
    let header = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post("http://59.110.237.244/api/upload?token=" + token, imgFile, header)
      .then(res => {
        console.log(res);
        let imgLinkCopy = _.cloneDeep(imgLink);
        imgLinkCopy.push(res.data.url);
        setImgLink(imgLinkCopy);
      });

    return false;
  };


  //待解决的以及当前思路：
  //1. 将img_link(img_detail同理)转为数组，取出其中的项渲染进fileList
  //问题：map和hooks好像配合不起来？？需要换个思路，可能考虑上react-redux了

  //2. 新图片上传至服务器，回传url，需要根据对应的idx更改图片的url
  //上一步不完成这一步就卡死了，下一步同理

  //3. 新的信息上传至服务器，需要把fileList的url取出来打包好上传

  //只要第一步解决了map和hooks就能完成，但是已经试了好多方法，待解决，这次我有信心拉

  const coverProps = {
    listType: "picture",
    fileList: coverImgList,
    beforeUpload: beforeUpload
  };

  // const detailProps = {
  //   listType: "picture",
  //   fileList: detailImgList
  // };

  // const handleDetailChange = info => {
  //   console.log(info);
  //   let fileList = [...info.fileList];
  //   // fileList = fileList.slice(-5);
  //   // setDetailImgList(fileList);
  //   // if (info.file.status === "done") {
  //   //   // let newImgUrl = info.file.response.url;
  //   // }
  // };

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
          {console.log(imgLink, imgDetail)}
          <Text strong>商品名称（不可重复）</Text>
          <Input
            placeholder='名称'
            className='input'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          {console.log(coverProps)}
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
          {/* <Upload
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            {...detailProps}
            onChange={handleDetailChange}
          >
            <Button>
              <Icon type='upload' />
              上传详情图片(数量限制：5)
            </Button>
          </Upload> */}
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
        }}
      >
        编辑
      </Button>
    </div>
  );
};
export default EditModleUI;
