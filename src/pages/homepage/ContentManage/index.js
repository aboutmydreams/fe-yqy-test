import React from "react";
import ContentUI from "./ContentUI";

const mockContent = [
  {
    title: "标题1",
    content: "内容1"
  },
  {
    title: "标题2",
    content: "内容2"
  },
  {
    title: "标题3",
    content: "内容3"
  }
];

const Content = () => {
  return (
    <div>
      <p>内容管理页面 给爷冲！</p>
      <ContentUI content={mockContent} />
    </div>
  );
};

export default Content;
