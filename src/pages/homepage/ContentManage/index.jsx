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

  render() {
    console.log(this.state.about_app);
    return (
      <div>
        <ContentItem
          content={{
            title: "软件介绍",
            key: "about_app",
            content: this.state.about_app
          }}
        />
        <ContentItem
          content={{
            title: "信息联网",
            key: "about_info_web",
            content: this.state.about_app
          }}
        />
        <ContentItem
          content={{
            title: "关于我们",
            key: "about_app",
            content: this.state.about_app
          }}
        />
      </div>
    );
  }
}

export default Content;
