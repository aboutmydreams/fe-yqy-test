import React from "react";
import axios from "axios";
import ContentItem from "./ContentItem";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about_app: "",
      about_info_web: "",
      about_us: ""
    };
    this.editContent = this.editContent.bind(this);
  }

  componentDidMount() {
    axios.get("http://59.110.237.244/api/system?key=about_app").then(res =>
      this.setState({
        about_app: res.data["value"]
      })
    );
    axios.get("http://59.110.237.244/api/system?key=about_info_web").then(res =>
      this.setState({
        about_info_web: res.data["value"]
      })
    );
    axios.get("http://59.110.237.244/api/system?key=about_us").then(res =>
      this.setState({
        about_us: res.data["value"]
      })
    );
  }
  editContent = (key, editedContent) => {
    //直接this.setState({key:editContent})会新生成一个名为key的状态
    switch (key) {
      case "about_app":
        this.setState({
          about_app: editedContent
        });
        break;
      case "about_info_web":
        this.setState({
          about_info_web: editedContent
        });
        break;
      case "about_us":
        this.setState({
          about_us: editedContent
        });
        break;
      default:
        console.log(233);
    }
  };
  render() {
    return (
      <div>
        <ContentItem
          saveEdition={this.editContent}
          content={{
            title: "软件介绍",
            key: "about_app",
            content: this.state.about_app
          }}
        />
        <ContentItem
          saveEdition={this.editContent}
          content={{
            title: "信息联网",
            key: "about_info_web",
            content: this.state.about_info_web
          }}
        />
        <ContentItem
          saveEdition={this.editContent}
          content={{
            title: "关于我们",
            key: "about_us",
            content: this.state.about_us
          }}
        />
      </div>
    );
  }
}

export default Content;
