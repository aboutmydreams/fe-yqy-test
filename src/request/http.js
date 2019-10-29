import axios from "axios";
import { message } from "antd";

axios.defaults.baseURL = "http://59.110.237.244/api";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// const cancel = false;
// let cancelToken = axios.CancelToken;

// axios.interceptors.request.use(
//   config => {
//     //这里的config和mock的onGet/onPost方法中的config是一样的，
//     console.log(config);
//     config.cancelToken = new cancelToken(function executor(c) {
//       if (cancel) {
//         c();
//       }
//     });
//     //是对config进行操作
//     return Promise.resolve(config);
//   },
//   err => {
//     console.error(err);
//     return Promise.reject(err);
//   }
// );

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401: {
          console.log("错误代码401");
          break;
        }
        case 404: {
          console.log("错误代码404");
          break;
        }
        default:
          console.log("失败咯弟弟！");
      }
    }
  }
);

const request = function(url, params, config = {}, method) {
  return new Promise((resolve, reject) => {
    axios[method](url, params, Object.assign({}, config))
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const post = (url, params, config = {}) => {
  return request(url, params, config, "post");
};
export const get = (url, params, config = {}) => {
  return request(url, params, config, "get");
};
