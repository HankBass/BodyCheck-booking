/**
 * 公用的common
 */
// 公用的提示配置
const DEFAULT_TOAST_OPTIONS = {
    title: "正在加载数据..", // 正常请求的字符串
    icon: "loading", // 请求的图标
    mask: true, // 是否显示遮罩层
    errorTitle: "抱歉，请求超时！", // 请求超时的字符串
    duration: 10 * 1000, //请求超时的时间，默认10秒钟
}
var timer;
export default {
    /**
     * 定义公用的加载中的方法，加载中的提示为10秒，如果超过10秒没有响应，则会提示操作失败信息
     */
    showCommonToast(options = {}) {
        options = { ...DEFAULT_TOAST_OPTIONS,
            ...options
        }
        this.showToast({
            title: options.title,
            icon: options.icon,
            mask: options.mask,
            duration: options.duration,
            callback: (e) => {
                this.showToast({
                    title: options.errorTitle,
                    icon: "fail"
                })
            }
        })
    },
    /**
     * 隐藏加载提示
     */
    hideCommonToast() {
        this.hideToast();
    },
    /**
     *  关闭微信的下拉，获取数据后最多延迟 300  毫秒关闭
     */
    stopCommonPullDownRefresh() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 300);
    },
    /**
     * 公用查看图片，直接在点击的图片上传入data-url参数即可
     */
    previewImage(e) {
        wx.previewImage({
            current: '',
            urls: [e.currentTarget.dataset.url] //需要预览的图片链接列表,
        });
    },
}
