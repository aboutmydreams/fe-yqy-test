import React, { Fragment } from "react";
import ContentItem from "./ContentItem";

const ContentUI = props => {
  const handleSubmit = content => {
    console.log(content);
  };
  handleSubmit();
  return (
    // <Fragment>
    //   {props.content.map((item, index) => {
    //     return (
    //       <div key={index}>
    //         <ContentItem key={index} content={item} submit={handleSubmit} />
    //         <br />
    //       </div>
    //     );
    //   })}
    // </Fragment>
    <div>123</div>
  );
};
export default ContentUI;
