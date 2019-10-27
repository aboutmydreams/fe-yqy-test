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

// const AdManage = () => {
//   // const [Info, setInfo] = useState({});
//   const [startImgInfo, setStartImg] = useState({
//     title: "启动页广告",
//     idx: 1,
//     imgInfo: {}
//   });
//   useEffect(() => {
//     axios.get("http://59.110.237.244/api/system?key=启动页广告").then(res => {
//       // console.log(JSON.parse(res.data.value));
//       setStartImg({
//         title: "启动页广告",
//         idx: 1,
//         imgInfo: JSON.parse(res.data.value)
//       });
//       console.log(startImgInfo);
//     });

//     // const { title, imgInfo } = startImgInfo;
//     // const { name, url, linkUrl } = imgInfo;
//     // const jump = imgInfo.jump ? true : false;
//     // console.log(imgInfo);
//     // const startImgInfo = {
//     //   title: title,
//     //   name: name,
//     //   imgUrl: url,
//     //   jump: jump,
//     //   linkUrl: linkUrl,
//     //   listIdx: "00"
//     // };
//     return () => {};
//   }, [startImgInfo]);
//   console.log(startImgInfo);
//   const mockData = [
//     {
//       title: "广告系列2",
//       idx: 2,
//       imgList: [
//         {
//           name: "2-0.png",
//           imgUrl: "http://59.110.237.244/api/startimgget",
//           jumpOnClick: true,
//           linkUrl: "https://cn.bing.com/"
//         },
//         {
//           name: "2-1.png",
//           imgUrl: "http://59.110.237.244/api/startimgget",
//           jumpOnClick: false
//         },
//         {
//           name: "2-2.png",
//           imgUrl: "http://59.110.237.244/api/startimgget",
//           jumpOnClick: false
//         }
//       ]
//     },
//     {
//       title: "广告系列3",
//       idx: 3,
//       imgList: [
//         {
//           name: "3-0.png",
//           imgUrl: "http://59.110.237.244/api/startimgget",
//           jumpOnClick: true,
//           linkUrl: "https://cn.bing.com/"
//         },
//         {
//           name: "3-1.png",
//           imgUrl: "http://59.110.237.244/api/startimgget",
//           jumpOnClick: true,
//           linkUrl: "https://cn.bing.com/"
//         },
//         {
//           name: "3-2.png",
//           imgUrl: "http://59.110.237.244/api/startimgget",
//           jumpOnClick: true,
//           linkUrl: "https://cn.bing.com/"
//         }
//       ]
//     }
//   ];

//   return <AdManageUI otherPages={mockData} />;
// };

// export default AdManage;
