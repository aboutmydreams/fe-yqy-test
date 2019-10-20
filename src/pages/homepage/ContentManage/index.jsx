import React from "react";
import ContentUI from "./ContentUI";

const mockContent = [
  {
    title: "软件介绍",
    content:
      "优企云APP是一款由湖南优企云网络科技有限公司开发并运营的一款中小企业服务助手软件，优企云通过与国内大型知名互联网企业对接或合作 基于全网大数据分析 技术优化 电商转化 云仓建设等形式开发出四大主营板块功能（优企云仓 寻找客户 阿里巴巴 营销助手 ） 能有效的助中小企业或商家加速解决 营销 电商 业务 人员招聘等企业常态问题并能有效的降底企业运营成本 软件推出以来深受各企业群体的亲睐 。\n联系电话：0731-7030010。\n联系邮箱：1528689083@qq.com"
  },
  {
    title: "标题2",
    content: "内容2"
  },
  {
    title: "关于我们",
    content:
      "优企云APP是一款由湖南优企云网络科技有限公司开发并运营的一款中小企业服务助手软件，优企云通过与国内大型知名互联网企业对接或合作 基于全网大数据分析 技术优化 电商转化 云仓建设等形式开发出四大主营板块功能（优企云仓 寻找客户 阿里巴巴 营销助手 ） 能有效的助中小企业或商家加速解决 营销 电商 业务 人员招聘等企业常态问题并能有效的降底企业运营成本 软件推出以来深受各企业群体的亲睐 。\n联系电话：0731-7030010。\n联系邮箱：1528689083@qq.com"
  }
];

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>内容管理页面 给爷冲！</p>
        <ContentUI content={mockContent} />
      </div>
    );
  }
}

export default Content;
