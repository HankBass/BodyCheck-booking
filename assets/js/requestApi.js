/**
 * 后台请求api接口配置
 */
export default {
  /**
   * 登录相关接口
   */

  loginCode: "/weixin/wxLogin", //登录获取openId
  login: "/tj/user/login", //会员登录


  /**
   * 体检项目
   */
  comboList:"/tj/body-check/project", // 获取体检项目
  optionalPackage:"/tj/body-check/select-project",// 获取自选套餐
  /**
   * 用户预约
   */
  order:"/tj/user-order/",// 我的订单、用于预约体检
  check:"/tj/user-order/check",// 检查预约时间是否可用
  sendCode:"/tj/user-order/code",// 验证码发送
  placeOrder:"/tj/user-order/place",// 下单购买
}
