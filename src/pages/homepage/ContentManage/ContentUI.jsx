import React, { Fragment } from "react";
import ContentItem from "./ContentItem";

const ContentUI = props => {
  return (
    <Fragment>
      {props.content.map((item, index) => {
        return (
          <div key={index}>
            <ContentItem key={index} content={item} />
            <br />
          </div>
        );
      })}
    </Fragment>
  );
};
export default ContentUI;
