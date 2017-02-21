// pages/test/test.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  pay:function(){
    //登录
    wx.login({
      success:function(res){
        var code = res.code;
        console.log(code);
        var url = "https://api.weixin.qq.com/sns/jscode2session?appid=wxdc72e9a87f72ca15&secret=a4c1b6991cea6c4d2dd597c6a2e40f54&js_code=" + code + "&grant_type=authorization_code";
        wx.request({
            url:url,
            method:"GET",
            success:function(res){
              console.log(res);
            }
        })
      }
    })
  }
})