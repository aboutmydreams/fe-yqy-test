import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { message, Input, Button, Icon, Form, Modal, Upload } from "antd";
import { post } from "../../../request/http";
import "./style.css";
const { Item } = Form;
const { TextArea } = Input;
const header = { headers: { "Content-Type": "multipart/form-data" } };
const token = localStorage.getItem("token");

const EditShopForm = props => {
  const {
    productInfo: { img_link, img_detail, key, name, price, shop_detail },
    form: {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue,
      setFieldsValue,
      validateFields
    },
    onSave,
    idx
  } = props;
  //交互相关
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  //编辑模态框上传组件的上传列表
  const [coverImgList, setCoverImgList] = useState([]);
  const [detailImgList, setDetailImgList] = useState([]);

  useEffect(() => {
    const coverImgListTmp = [];
    const detailImgListTmp = [];

    img_link.split(";").map((link, idx) => {
      return coverImgListTmp.push({
        uid: idx,
        name: name,
        url: link
      });
    });
    setCoverImgList(coverImgListTmp);

    img_detail.split(";").map((link, idx) => {
      return detailImgListTmp.push({
        uid: idx,
        name: name,
        url: link
      });
    });
    setDetailImgList(detailImgListTmp);

    setFieldsValue(
      {
        productName: name,
        detail: shop_detail,
        price: price,
        coverImg: coverImgListTmp,
        detailImg: detailImgListTmp
      },
      () => {
        validateFields();
      }
    );
    return () => {};
    //eslint-disable-next-line
  }, []);

  const handleOk = () => {
    let newCoverLink = [];
    let newDetailLink = [];
    coverImgList.map(item => {
      return newCoverLink.push(item.url);
    });
    detailImgList.map(item => {
      return newDetailLink.push(item.url);
    });
    const formValues = getFieldsValue();
    const { productName, price, detail } = formValues;
    const newProductInfo = {
      key: key,
      name: productName,
      price: price.replace("；", ";"),
      //如果没有上传新的，则使用原本的封面/详情图片（保留）
      img_link: newCoverLink.join(";"),
      img_detail: newDetailLink.join(";"),
      shop_detail: detail
    };
    setLoading(true);
    (async () => {
      try {
        await onSave(newProductInfo, idx);
      } catch (err) {
        setLoading(false);
        message.error(err);
      }
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
        message.success("修改成功");
      }, 1200);
    })();
  };

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const normMultiImgFile = (e, set, state, count) => {
    if (e.file.status !== "removed") {
      let imgFile = new FormData();
      imgFile.append("file", e.file);
      (async () => {
        const res = await post(`/upload?token=${token}`, imgFile, header);
        const [...copy] = state;
        copy.push({
          uid: Math.random() * 100,
          name: e.file.name,
          url: res.data.url
        });
        set(copy.slice(-count));
      })();
      return e.fileList.slice(-count);
    } else {
      //直接rerutn 由handleRemove处理
      return e.fileList;
    }
  };

  const handleRemove = (file, state, setState) => {
    //不用再在这里限制数量
    const delIdx = state.findIndex(item => {
      return item.url === file.url;
    });
    let copy = [...state];
    copy.splice(delIdx, 1);
    setState(copy);
  };

  return (
    <>
      <Modal
        visible={visible}
        title="编辑"
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            icon="close"
            onClick={() => {
              setVisible(false);
            }}
            key="back"
          >
            取消
          </Button>,
          <Button
            icon="check"
            key="submit"
            type="primary"
            disabled={hasErrors(getFieldsError())}
            loading={loading}
            onClick={handleOk}
          >
            确认
          </Button>
        ]}
      >
        <Form layout="vertical" onSubmit={handleOk}>
          <Item label="商品名称" hasFeedback>
            {getFieldDecorator("productName", {
              rules: [{ required: true, message: "请输入商品名称！" }],
              trigger: "onChange"
            })(
              <Input
                prefix={
                  <Icon type="gift" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="商品名称"
              />
            )}
          </Item>

          <Item label="封面图片" hasFeedback extra="最多上传五张照片">
            {getFieldDecorator("coverImg", {
              rules: [{ required: true, message: "至少上传一张图片" }],
              valuePropName: "fileList",
              getValueFromEvent: e => {
                return normMultiImgFile(e, setCoverImgList, coverImgList, 5);
              }
            })(
              <Upload
                listType="picture"
                onRemove={e => {
                  handleRemove(e, coverImgList, setCoverImgList);
                }}
                beforeUpload={() => {
                  return false;
                }}
                accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp"
              >
                <Button icon="upload">上传封面图片(数量限制：5)</Button>
              </Upload>
            )}
          </Item>

          <Item label="详情图片" hasFeedback extra="最多上传五张照片">
            {getFieldDecorator("detailImg", {
              rules: [{ required: true, message: "至少上传一张图片" }],
              valuePropName: "fileList",
              getValueFromEvent: e => {
                return normMultiImgFile(e, setDetailImgList, detailImgList, 5);
              }
            })(
              <Upload
                listType="picture"
                onRemove={e => {
                  handleRemove(e, detailImgList, setDetailImgList);
                }}
                beforeUpload={() => {
                  return false;
                }}
                accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp"
              >
                <Button icon="upload">上传详情图片(数量限制：5)</Button>
              </Upload>
            )}
          </Item>

          <Item label="商品价格" extra="请使用；（中文分号）分隔" hasFeedback>
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "请输入有效的价格信息" }]
            })(
              <Input
                prefix={
                  <Icon
                    type="pay-circle"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="价格"
              />
            )}
          </Item>

          <Item label="商品详情" extra="请输入商品详细信息" hasFeedback>
            {getFieldDecorator("detail", {
              rules: [{ required: true, message: "商品详情不能为空" }]
            })(<TextArea autoSize placeholder="详情" />)}
          </Item>
        </Form>
      </Modal>

      <Button
        icon="edit"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        编辑
      </Button>
    </>
  );
};

const EditShopModal = Form.create({
  name: "shop_info"
})(EditShopForm);

EditShopForm.propTypes = {
  idx: PropTypes.number.isRequired,
  productInfo: PropTypes.object.isRequired
};
export default EditShopModal;
