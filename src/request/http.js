import axios from "axios";

axios.defaults.baseURL = "http://www.youqiyun.net/api";
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
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

//错误处理统一交给拦截器？

export const get = async (url, params, config = {}) => {
  return await request(url, params, config, "get");
};
export const post = async (url, params, config = {}) => {
  return await request(url, params, config, "post");
};
export const put = async (url, params, config = {}) => {
  return await request(url, params, config, "put");
};
export const deleteItem = async (url, params, config = {}) => {
  return await request(
    url,
    {
      data: params
    },
    config,
    "delete"
  );
};
