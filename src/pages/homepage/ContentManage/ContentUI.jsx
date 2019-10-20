import React, { Fragment } from "react";
import ContentItem from "./ContentItem";

const ContentUI = props => {
  const handleSubmit = content => {
    console.log(content);
  };
  return (
    <Fragment>
      {props.content.map((item, index) => {
        return (
          <div key={index}>
            <ContentItem key={index} content={item} submit={handleSubmit} />
            <br />
          </div>
        );
      })}
    </Fragment>
  );
};
export default ContentUI;
