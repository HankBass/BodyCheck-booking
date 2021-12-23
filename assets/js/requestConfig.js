/**
 * 环境配置
 *
 * 注：切换后台请求地址修改environment
 */
let environment = "prod";
let services = {
  // 生产环境
  prod: {
    API_URL: "http://cunw.top:9999",
    // API_URL: "https://120.0.0.1:8080",
    appId: "wxba89ecfa7ac5917c",
    secret: "9f41282ae413613296bc8cd6012d9b03"
  }
};
export default services[environment];
