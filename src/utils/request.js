import axios from "axios";
import qs from "qs";

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
});

service.interceptors.request.use(
  (config) => {
	config.data = qs.stringify(config.data);
	console.log(config.data)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // const { status, data, config } = response;
    // const { code, msg } = data;
    // if (code !== successCode && code !== 0) {
    //   switch (code) {
    //     case invalidCode:
    //       console.log(msg || `后端接口${code}异常`);
    //       store.dispatch("user/resetAccessToken");
    //       break;
    //     case noPermissionCode:
    //       router.push({
    //         path: "/401",
    //       });
    //       break;
    //     default:
    //       console.log(msg || `后端接口${code}异常`);
    //       break;
    //   }
    //   return Promise.reject(
    //     "vue-admin-beautiful请求异常拦截:" +
    //       JSON.stringify({ url: config.url, code, msg }) || "Error"
    //   );
    // } else {
    //   return data;
    // }
	return response;
  },
  (error) => {
    /*网络连接过程异常处理*/
    let { message } = error;
    switch (message) {
      case "Network Error":
        message = "后端接口连接异常";
        break;
      case "timeout":
        message = "后端接口请求超时";
        break;
      case "Request failed with status code":
        message = "后端接口" + message.substr(message.length - 3) + "异常";
        break;
    }
    console.log(message || "后端接口未知异常");
    return Promise.reject(error);
  }
);
export default service;