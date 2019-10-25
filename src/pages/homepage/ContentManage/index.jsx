import React, { useState, useEffect } from "react";
import ContentUI from "./ContentUI";
import axios from "axios";


const Content = () => {
  const [content, setContent] = useState([]);
  return <ContentUI content={content} />;
};
export default Content;
