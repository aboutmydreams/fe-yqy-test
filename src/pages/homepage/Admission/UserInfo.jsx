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
    onAddUser,
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
  const [yyzzImgList, setYyzzImgList] = useState([]);
  useEffect(() => {
    if (type === "edit") {
      //编辑已有信息
      (async () => {
        const res = await get(`/user/detail?token=${token}&key=${key}`);
        const currentInfo = res.data.company;
        const {
          company_img_link,
          sfz_img_link,
          yyzz_img_link,
          company,
          company_address,
          phone,
          true_name,
          collect_count,
          company_detail
        } = currentInfo;

        setCompanyImg(company_img_link);
        setSfzImg(sfz_img_link);

        const yyzzImgListTmp = [];
        yyzz_img_link.split(";").map((link, idx) => {
          return yyzzImgListTmp.push({
            uid: idx,
            name: company,
            url: link
          });
        });
        setYyzzImgList(yyzzImgListTmp);

        setFieldsValue(
          {
            companyName: company,
            addr: company_address,
            detail: company_detail,
            name: true_name,
            phone: phone,
            collect: collect_count,
            companyImg: [
              {
                name: company,
                uid: -1,
                url: company_img_link
              }
            ],
            sfzImg:
              sfz_img_link.length === 0
                ? []
                : [
                    {
                      name: true_name,
                      uid: -1,
                      url: sfz_img_link
                    }
                  ],
            yyzzImg: yyzzImgListTmp.length === 0 ? [] : yyzzImgListTmp
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

  //公司 身份证照片表单域处理逻辑
  const normImgFile = (e, set, count) => {
    if (e.file.status !== "removed") {
      let imgFile = new FormData();
      imgFile.append("file", e.file);
      (async () => {
        const res = await post(`/upload?token=${token}`, imgFile, header);
        set(res.data.url);
      })();
      return e.fileList.slice(-count);
    } else {
      return e.fileList;
    }
  };

  const normYyzzImgFile = e => {
    if (e.file.status !== "removed") {
      let imgFile = new FormData();
      imgFile.append("file", e.file);
      (async () => {
        const res = await post(`/upload?token=${token}`, imgFile, header);
        const [...copy] = yyzzImgList;
        copy.push({
          uid: Math.random() * 100,
          name: e.file.name,
          url: res.data.url
        });
        setYyzzImgList(copy.slice(-3));
      })();
      return e.fileList.slice(-3);
    } else {
      //直接reruen 由onRemove处理
      return e.fileList;
    }
  };

  const handleYyzzRemove = file => {
    const delIdx = yyzzImgList.findIndex(item => {
      return item.url === file.url;
    });
    let copy = [...yyzzImgList];
    copy.splice(delIdx, 1);
    setYyzzImgList(copy);
    console.log(copy);
  };

  //有任一项没有通过，禁用提交按钮
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  //无需使用onChange事件收集
  const handleSubmit = e => {
    e.preventDefault();

    const formValues = getFieldsValue();
    const { companyName, addr, detail, name, phone } = formValues;

    //取出营业执照列表的链接
    const yyzzImgLinks = [];
    yyzzImgList.map(imgItem => {
      return yyzzImgLinks.push(imgItem.url);
    });

    const newUserInfo = {
      company: companyName,
      company_address: addr,
      true_name: name,
      phone: phone,
      company_img_link: companyImg,
      company_detail: detail,
      sfz_img_link: sfzImg,
      yyzz_img_link: yyzzImgLinks.join(";")
    };
    console.log(newUserInfo);
    type === "edit"
      ? onSaveEdition(newUserInfo)
      : //添加新用户时需要带上密码
        onAddUser(
          Object.assign({}, newUserInfo, {
            pwd: formValues.pwd
          })
        );
  };

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
          rules: [{ required: true, message: "请输入公司名称！" }],
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
          rules: [{ required: true, message: "请输入公司地址！" }]
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
          rules: [{ required: true, message: "请输入公司详情！" }]
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
          rules: [{ required: true, message: "收藏数至少为0" }]
        })(<InputNumber min={0} prefix={<Icon type='star' />} />)}
      </Item>

      <Item label='手机号' hasFeedback>
        {getFieldDecorator("phone", {
          rules: [{ required: true, message: "请输入手机号！" }]
        })(<Input disabled prefix={<Icon type='mobile' />} />)}
      </Item>

      {type !== "edit" ? (
        <Item label='密码' hasFeedback>
          {getFieldDecorator("pwd", {
            rules: [{ required: true, message: "请输入密码！" }]
          })(<Input prefix={<Icon type='key' />} />)}
        </Item>
      ) : null}

      <Item label='联系人姓名' hasFeedback>
        {getFieldDecorator("name", {
          rules: [
            { required: true, message: "请输入姓名！" },
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

      <Item label='公司照片' extra='只能上传一张图片，大小不得超过？MB'>
        {getFieldDecorator("companyImg", {
          rules: [{ required: true, message: "至少上传一张图片" }],

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

      <Item label='身份证照片' extra='只能上传一张图片，大小不得超过？MB'>
        {getFieldDecorator("sfzImg", {
          rules: [{ required: true, message: "至少上传一张图片" }],
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

      <Item label='营业执照照片' extra='最多上传三张图片，大小不得超过？MB'>
        {getFieldDecorator("yyzzImg", {
          rules: [{ required: true, message: "至少上传一张图片" }],
          valuePropName: "fileList",
          getValueFromEvent: e => {
            return normYyzzImgFile(e);
          }
        })(
          <Upload
            onRemove={handleYyzzRemove}
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
