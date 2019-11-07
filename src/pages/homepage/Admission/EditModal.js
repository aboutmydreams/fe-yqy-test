import React, { Fragment, useState, useEffect } from "react";
import {
  Menu,
  Icon,
  Typography,
  Input,
  Button,
  message,
  InputNumber,
  Upload,
  Row,
  Col
} from "antd";
import { get } from "../../../request/http";
const { Title, Text } = Typography;
const { TextArea } = Input;
const EditInterface = props => {
  const token = localStorage.getItem("token");
  const { type, companyKey: key, onCancel, onSave, onAdd } = props;
  const [companyName, setCompanyName] = useState("");
  const [companyAddr, setCompanyAddr] = useState("");
  const [companyDetail, setCompanyDetail] = useState("");
  const [companyImgLink, setCompanyImgLink] = useState([]);
  const [sfzImg, setSfzImg] = useState([]);
  const [collectCount, setCollectCount] = useState("");
  const [yyzzImg, setYyzzImg] = useState([]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (type === "edit") {
      (async () => {
        const res = await get(`/user/detail?token=${token}&key=${key}`);
        const currentInfo = res.data.company;
        const {
          collect_count,
          company,
          company_address,
          company_detail,
          company_img_link,
          phone,
          sfz_img_link,
          true_name,
          yyzz_img_link
        } = currentInfo;
        setCollectCount(collect_count);
        setCompanyName(company);
        setCompanyAddr(company_address);
        setCompanyDetail(company_detail);
        company_img_link.split(";").map((link, idx) => {
          return companyImgLink.push({
            uid: idx,
            name: "公司照片",
            url: link
          });
        });
        setPhone(phone);
        setSfzImg([
          {
            uid: -1,
            name: "身份证照片",
            url: sfz_img_link
          }
        ]);
        setName(true_name);
        setYyzzImg([
          {
            uid: -1,
            name: "营业执照",
            url: yyzz_img_link
          }
        ]);
      })();
    }
    return () => {};
    //eslint-disable-next-line
  }, []);
  const companyImgUploadProps = {
    listType: "picture",
    fileList: companyImgLink
  };
  const sfzImgUploadProps = {
    listType: "picture",
    fileList: sfzImg
  };
  const yyzzImgUploadProps = {
    listType: "picture",
    fileList: yyzzImg
  };

  return (
    //TODO: 各个输入框的校验
    //TODO: 抽离这个信息输入模块
    //TODO: 各个上传模块相关方法
    //TODO: 页面样式
    //TODO: vip接口修改信息
    <Fragment>
      <Title level={3}>
        {type === "edit" ? "编辑商家信息" : "新增商家信息"}
      </Title>
      <Row>
        <Col span={12}>
          <Menu
            // onClick={handleChangeData}
            defaultSelectedKeys={["info"]}
            mode='horizontal'
          >
            <Menu.Item key='info'>
              <Icon type='mail' />
              信息管理
            </Menu.Item>
            <Menu.Item key='product'>
              <Icon type='appstore' />
              商品管理
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Fragment>
        <Row>
          <Col span={6}>
            <Title level={4}>企业名称</Title>
            <Input
              value={companyName}
              onChange={e => {
                setCompanyName(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Title level={4}>企业地址</Title>
            <Input
              value={companyAddr}
              onChange={e => {
                setCompanyAddr(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={14}>
            <Title level={4}>企业详情</Title>
            <TextArea
              value={companyDetail}
              autoSize
              onChange={e => {
                setCompanyDetail(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Title level={4}>企业图片</Title>
            <Upload {...companyImgUploadProps}>
              <Button icon='upload'>上传</Button>
            </Upload>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Title level={4}>身份证图片</Title>
            <Upload {...sfzImgUploadProps}>
              <Button icon='upload'>上传</Button>
            </Upload>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Title level={4}>收藏数</Title>
            <InputNumber
              value={collectCount}
              min={0}
              onChange={val => {
                setCollectCount(val);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Title level={4}>营业执照</Title>
            <Upload {...yyzzImgUploadProps}>
              <Button icon='upload'>上传</Button>
            </Upload>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Title level={4}>联系人电话</Title>
            <Text>{phone}</Text>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Title level={4}>联系人姓名</Title>
            <Input
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
      </Fragment>
      <br />
      <Button
        type='primary'
        icon='close'
        onClick={() => {
          onCancel();
        }}
      >
        取消修改
      </Button>
      <Button
        type='primary'
        icon='check'
        onClick={() => {
          type === "edit" ? onSave() : onAdd();
        }}
      >
        保存修改
      </Button>
    </Fragment>
  );
};
export default EditInterface;
