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
const { TextArea } = Input;
const { Text } = Typography;
const AddModal = () => {
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
            loading={loading}
            // onClick={handleOk}
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
            // {...coverProps}
            // onChange={handleCoverChange}
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
        type='primary'
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
