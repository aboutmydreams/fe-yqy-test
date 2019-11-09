import React, { useState, useEffect, Fragment } from "react";
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

import { put, post, get } from "../../../request/http";
import _ from "lodash";
import "./style.css";
const { TextArea } = Input;
const { Item } = Form;
const { Text } = Typography;
const header = { headers: { "Content-Type": "multipart/form-data" } };
const token = localStorage.getItem("token");

const EditShopModal = props => {
  console.log(props);
  const {
    productInfo: {
      key: productKey,
      name,
      img_link,
      img_detail,
      price,
      shop_detail
    },
    form: {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue,
      setFieldsValue,
      validateFields
    }
  } = props;
  const [coverImgList, setCoverImgList] = useState([]);
  const [detailImgList, setDetailImgList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const coverImg = [];
    const detailImg = [];
    //TODO: 复用提取逻辑
    img_link.split(";").map((coverLink, idx) => {
      return coverImg.push({
        uid: idx,
        name: name,
        url: coverLink
      });
    });
    img_detail.split(";").map((detailLink, idx) => {
      return detailImg.push({
        uid: idx,
        name: name,
        url: detailLink
      });
    });
    setCoverImgList(img_link.split(";"));
    setDetailImgList(img_detail.split(";"));
    setFieldsValue(
      {
        productName: name,
        price: price,
        detail: shop_detail,
        coverImg: coverImg,
        detailImg: detailImg
      },
      () => {
        validateFields();
      }
    );
    return () => {};
    //eslint-disable-next-line
  }, []);

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  //TODO: 考虑抽离上传逻辑
  const saveProdInfo = e => {
    e.preventDefault();
    const { productName, price, detail } = getFieldsValue();

    const formatPrice = price.replace("；", ";");
    const newProductInfo = {
      key: productKey,
      name: productName,
      price: formatPrice,
      shop_detail: detail,
      img_link: coverImgList.join(";"),
      img_detail: detailImgList.join(";")
    };
    console.log(newProductInfo);
    (async () => {
      const res = await put(`shop/edit?token=${token}`, newProductInfo);
      console.log(res);
      //FIXME: 这里先用刷新替代一下，后面会改成实时更新
      //TODO: 交互
      window.location.reload();
    })();
  };

  const normImgFileList = (e, set, count, state) => {
    console.log(e);
    if (e.file.status !== "removed") {
      let imgFile = new FormData();
      imgFile.append("file", e.file);
      (async () => {
        const res = await post(`/upload?token=${token}`, imgFile, header);
        const [...copy] = state;
        copy.push(res.data.url);
        set(copy);
      })();
      //在图片列表更改时并不是用的回传的url而是本地图片
      return e.fileList.slice(-count);
    } else {
      return e.fileList;
    }
  };

  return (
    <Fragment>
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
            // loading={loading}
            onClick={saveProdInfo}
            disabled={hasErrors(getFieldsError())}
          >
            确认
          </Button>
        ]}
      >
        <Form layout='vertical' onSubmit={saveProdInfo}>
          <Item label='商品名称' hasFeedback>
            {getFieldDecorator("productName", {
              rules: [{ required: true, message: "请输入商品名称" }]
            })(<Input placeholder='商品名称' />)}
          </Item>

          <Item
            label='上传封面图片'
            extra='只能上传不超过五张图片，每张大小不得超过20MB'
            hasFeedback
          >
            {getFieldDecorator("coverImg", {
              rules: [{ required: true, message: "至少上传一张照片" }],
              valuePropName: "fileList",
              getValueFromEvent: e => {
                return normImgFileList(e, setCoverImgList, 5, coverImgList);
              }
            })(
              <Upload
                beforeUpload={() => {
                  return false;
                }}
                accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
                listType='picture'
              >
                <Button icon='upload'>上传封面照片</Button>
              </Upload>
            )}
          </Item>

          <Item
            label='上传详情图片'
            extra='只能上传不超过五张图片，每张大小不得超过20MB'
            hasFeedback
          >
            {getFieldDecorator("detailImg", {
              rules: [{ required: true, message: "至少上传一张照片" }],
              valuePropName: "fileList",
              getValueFromEvent: e => {
                return normImgFileList(e, setDetailImgList, 5, detailImgList);
              }
            })(
              <Upload
                beforeUpload={() => {
                  return false;
                }}
                accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
                listType='picture'
              >
                <Button icon='upload'>上传详情照片</Button>
              </Upload>
            )}
          </Item>

          <Item label='价格'>
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "至少设置一种价格" }]
            })(<Input placeholder='价格设置（请用；相隔）' />)}
          </Item>

          <Item label='商品详情'>
            {getFieldDecorator("detail", {
              rules: [{ required: true, message: "请输入商品详情!" }]
            })(<TextArea autoSize placeholder='请输入商品详情' />)}
          </Item>
        </Form>
      </Modal>
      <Button
        icon={"text"}
        type='primary'
        onClick={() => {
          setVisible(true);
        }}
      >
        编辑
      </Button>
    </Fragment>
  );
};

const EditShopPage = Form.create({
  name: "shop_info"
})(EditShopModal);
export default EditShopPage;
