import React, { useEffect, useState } from "react";

import { Form, Icon, Input, Button, InputNumber, Upload, message } from "antd";
import { get, post, put } from "../../../request/http";
const { TextArea } = Input;
const { Item } = Form;
const token = localStorage.getItem("token");
const header = { headers: { "Content-Type": "multipart/form-data" } };

const InitForm = props => {
  const {
    companyKey: key,
    type,
    onSaveEdition,
    form: {
      getFieldDecorator,
      getFieldsError,
      getFieldsValue,
      setFieldsValue,
      validateFields
    }
  } = props;
  const [companyImg, setCompanyImg] = useState("");
  const [sfzImg, setSfzImg] = useState("");
  const [yyzzImgUrl, setYyzzImg] = useState([]);

  const normImgFile = (e, set, count, state) => {
    if (e.file.status !== "removed") {
      let imgFile = new FormData();
      imgFile.append("file", e.file);
      (async () => {
        const res = await post(`/upload?token=${token}`, imgFile, header);
        if (count > 1) {
          const [...copy] = state;
          copy.push(res.data.url);
          set(copy);
        } else {
          set(res.data.url);
        }
      })();
      return e.fileList.slice(-count);
    } else {
      return e.fileList;
    }
  };

  useEffect(() => {
    if (key.length !== 0) {
      (async () => {
        const res = await get(`/user/detail?token=${token}&key=${key}`);
        const yyzzImgUrl = [];
        const currentInfo = res.data.company;
        console.log(JSON.stringify(currentInfo));
        const { company_img_link, sfz_img_link, yyzz_img_link } = currentInfo;
        setCompanyImg(company_img_link);
        setSfzImg(sfz_img_link);
        setYyzzImg(yyzz_img_link.split(";"));
        yyzz_img_link.split(";").map((imgUrl, idx) => {
          return yyzzImgUrl.push({
            name: currentInfo.company,
            uid: idx,
            url: imgUrl
          });
        });
        setFieldsValue(
          {
            companyName: currentInfo.company,
            addr: currentInfo.company_address,
            detail: currentInfo.company_detail,
            name: currentInfo.true_name,
            phone: currentInfo.phone,
            collect: currentInfo.collect_count,
            companyImg: [
              {
                name: currentInfo.company,
                uid: -1,
                url: company_img_link
              }
            ],
            sfzImg: [
              {
                name: currentInfo.true_name,
                uid: -1,
                url: sfz_img_link
              }
            ],
            yyzzImgUrl: yyzzImgUrl
          },
          //在设置完初始值后进行校验
          () => {
            validateFields();
          }
        );
      })();
    } else {
      validateFields();
    }
    return () => {};
    // eslint-disable-next-line
  }, []);
  //有任一项没有通过，禁用提交按钮
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  //无需使用onChange事件收集
  const handleSubmit = e => {
    e.preventDefault();
    const {
      companyName,
      addr,
      collect,
      detail,
      companyImg,
      sfzImg,
      name,
      phone
    } = getFieldsValue();
    //companyImg和sfzImg是fileList的形式，要取出url
    //yyzzImg本身就是url的形式
    const newUserInfo = {
      company_name: companyName,
      company_address: addr,
      true_name: name,
      phone: phone,
      company_img_link: companyImg[0].url,
      company_detail: detail,
      sfz_img_link: sfzImg[0].url,
      collect_count: collect,
      yyzz_img_link: yyzzImgUrl.slice(-3).join(";")
    };
    onSaveEdition(newUserInfo);
    console.log(getFieldsValue(), companyImg, sfzImg, yyzzImgUrl.slice(-3));
  };

  //提示文字相关，单为交互考虑，去掉也不影响实际使用
  //经历过校验并被检验出错误才为true
  //配合validateStatus与help使用

  // const companyNameErr =
  //   isFieldTouched("companyName") && getFieldError("companyName");
  // const addrErr = isFieldTouched("addr") && getFieldError("addr");
  // const companyImgErr =
  //   isFieldTouched("companyImg") && getFieldError("companyImg");
  // const sfzImgErr = isFieldTouched("sfzImg") && getFieldError("sfzImg");
  // const yyzzImgErr = isFieldTouched("yyzzImgUrl") && getFieldError("yyzzImgUrl");

  const formItemLayout = {
    //TODO:上响应式 不然太太太丑了
    // labelCol: {
    //   xs: { span: 24 },
    //   sm: { span: 5 }
    // },
    // wrapperCol: {
    //   xs: { span: 24 },
    //   sm: { span: 12 }
    // }
  };

  return (
    <Form layout='vertical' onSubmit={handleSubmit} {...formItemLayout}>
      <Item label='公司名称' hasFeedback>
        {getFieldDecorator("companyName", {
          rules: [{ required: true, message: "请输入公司名称" }],
          trigger: "onChange"
        })(
          <Input
            prefix={<Icon type='home' style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder='公司名称'
          />
        )}
      </Item>

      <Item label='公司地址' hasFeedback>
        {getFieldDecorator("addr", {
          rules: [{ required: true, message: "请输入公司地址" }]
        })(
          <Input
            prefix={
              <Icon type='compass' style={{ color: "rgba(0,0,0,.25)" }} />
            }
            type='addr'
            placeholder='addr'
          />
        )}
      </Item>

      <Item label='公司详情' hasFeedback>
        {getFieldDecorator("detail", {
          rules: [{ required: true, message: "请输入企业详情" }]
        })(
          <TextArea
            placeholder='企业详情'
            prefix={<Icon icon='shop' />}
            autoSize
          />
        )}
      </Item>

      <Item label='收藏数' hasFeedback>
        {getFieldDecorator("collect", {
          //TODO: 校验
          rules: [{ required: true, message: "" }]
        })(<InputNumber min={0} prefix={<Icon type='star' />} />)}
      </Item>

      <Item label='手机号' hasFeedback>
        {getFieldDecorator("phone")(
          <Input prefix={<Icon type='mobile' />} disabled />
        )}
      </Item>

      <Item label='联系人姓名' hasFeedback>
        {getFieldDecorator("name", {
          rules: [
            { required: true, message: "请输入联系人名称" },
            {
              pattern: /[\u4e00-\u9fa5]/gm,
              message: "请输入中文姓名"
            }
          ]
        })(
          <Input
            prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder='联系人名称'
          />
        )}
      </Item>

      <Item label='Upload' extra='只能上传一张图片，大小不得超过？MB'>
        {getFieldDecorator("companyImg", {
          rules: [{ required: true, message: "至少上传一张照片" }],

          valuePropName: "fileList",
          getValueFromEvent: e => {
            return normImgFile(e, setCompanyImg, 1);
          }
        })(
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            listType='picture'
          >
            <Button icon='upload'>上传公司照片</Button>
          </Upload>
        )}
      </Item>

      <Item label='Upload' extra='只能上传一张图片，大小不得超过？MB'>
        {getFieldDecorator("sfzImg", {
          rules: [{ required: true, message: "至少上传一张照片" }],
          valuePropName: "fileList",
          getValueFromEvent: e => {
            return normImgFile(e, setSfzImg, 1);
          }
        })(
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            listType='picture'
          >
            <Button icon='upload'>上传身份证照片</Button>
          </Upload>
        )}
      </Item>

      <Item label='Upload' extra='最多上传三张图片，大小不得超过？MB'>
        {getFieldDecorator("yyzzImgUrl", {
          rules: [{ required: true, message: "至少上传一张照片" }],
          valuePropName: "fileList",
          getValueFromEvent: e => {
            return normImgFile(e, setYyzzImg, 3, yyzzImgUrl);
          }
        })(
          <Upload
            beforeUpload={() => {
              return false;
            }}
            accept='.bmp,.jpg,.jpeg,.png,.tif,.gif,.fpx,.svg,.webp'
            listType='picture'
          >
            <Button icon='upload'>上传营业执照照片</Button>
          </Upload>
        )}
      </Item>

      <Item>
        <Button icon='close'>取消</Button>
        <Button
          icon='check'
          type='primary'
          htmlType='submit'
          disabled={hasErrors(getFieldsError())}
        >
          保存修改
        </Button>
      </Item>
    </Form>
  );
};

const InfoForm = Form.create({
  name: "company_info"
})(InitForm);

export default InfoForm;
