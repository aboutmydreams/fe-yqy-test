import React, { useState, useEffect, Fragment, Component } from "react";
import AdManageUI from "./AdManageUI";
import axios from "axios";

class AdManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startImgInfo: {
        title: "启动页广告",
        idx: 1
      }
    };
  }
  componentDidMount() {
    axios.get("http://59.110.237.244/api/system?key=firstAD").then(res => {
      let startCopy = JSON.parse(JSON.stringify(this.state.startImgInfo));
      const startInfo = JSON.parse(res.data.value);
      Object.assign(startCopy, startInfo);
      this.setState({
        startImgInfo: startCopy
      });
    });
  }

  render() {
    return (
      <Fragment>
        <AdManageUI startPage={this.state.startImgInfo} />
      </Fragment>
    );
  }
}

export default AdManage;
