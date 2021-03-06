import React, { useState, Fragment } from "react";
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
import { post } from "../../../request/http";
import _ from "lodash";
const { TextArea } = Input;
const { Text } = Typography;
const AddModal = () => {
  //上传时的请求头与token
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const token = localStorage.getItem("token");
  //交互相关
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  //商品信息
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  //编辑模态框上传组件的上传列表
  const [coverImgList, setCoverImgList] = useState([]);
  const [detailImgList, setDetailImgList] = useState([]);

  const handleOk = () => {
    setLoading(true);
    let newImgLink = [];
    let newImgDetail = [];
    coverImgList.map(item => {
      return newImgLink.push(item.url);
    });
    detailImgList.map(item => {
      return newImgDetail.push(item.url);
    });

    //校验信息完整性：新增模态框中是不允许不上传封面和详情图片的，
    // 而编辑模态框如果不上传则默认不改动
    const newProductInfo = {
      name: name,
      price: price,
      img_link: newImgLink.join(";"),
      img_detail: newImgDetail.join(";"),
      shop_detail: detail
    };

    if (
      newImgLink.length === 0 ||
      newImgDetail.length === 0 ||
      name.trim().length === 0 ||
      price.trim().length === 0 ||
      detail.trim().length === 0
    ) {
      message.error(
        "请输入完整信息，包括封面图片和详情图片，商品名称、价格以及描述不得为空"
      );
      setLoading(false);
      return false;
    }

    (async () => {
      try {
        const res = await post(`/shop/edit?token=${token}`, newProductInfo);
        res.data.code === 1
          ? message.success("操作成功，请刷新列表查看") && setVisible(false)
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
      console.log(delIdx);
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
    let imgFile = new FormData();
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
    let imgFile = new FormData();
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
    <Fragment>
      <Modal
        visible={visible}
        title="编辑"
        onCancel={() => {
          setVisible(false);
        }}
        footer={[
          <Button
            onClick={() => {
              setVisible(false);
            }}
            key="back"
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
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
            placeholder="名称"
            className="input"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Upload
            accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp"
            {...coverProps}
          >
            <Button>
              <Icon type="upload" />
              上传封面图片(数量限制：5)
            </Button>
          </Upload>
          <Upload
            accept=".bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp"
            {...detailProps}
          >
            <Button>
              <Icon type="upload" />
              上传详情图片(数量限制：5)
            </Button>
          </Upload>
          <Text strong>价格设置（;相隔）</Text>
          <Input
            prefix={<Icon type="pay-circle" />}
            placeholder="价格设置（分号相隔）"
            className="input"
            defaultValue={price}
            onChange={e => {
              setPrice(e.target.value);
            }}
          />
          <Text strong>详细内容 </Text>
          <TextArea
            rows={5}
            placeholder="详细内容"
            defaultValue={detail}
            onChange={e => {
              setDetail(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>

      <Button
        icon="plus-circle"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增商品信息
      </Button>
    </Fragment>
  );
};
export default AddModal;
