// pages/personal/bindPhone/binPhone.js
var app = getApp();
var HOST = app.globalData.HOST;
Page({
  data:{
    identifyBtn:{
      text:"获取短信验证",
      disabled:false
    },
    phone:"",
    messageCode:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    console.log("ready")
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
  //获取手机号
  getPhone:function(e){
    this.setData({phone:e.detail.value});
  },
  //获取验证码
  getMessageCode:function(e){
    this.setData({messageCode:e.detail.value});
  },
  //点击验证码
  identify:function(){
    console.log("----获取短信验证码-----")
    //向后端提交电话后台，获取验证码
    wx.request({
      url:HOST + "/user/getCode",
      //url:"http://localhost:8080/",
      header:app.globalData.HEADER,
      method:"POST",
      data:{phone:this.data.phone,type:"LOGIN"},
      success:function(res){
        console.log("successed")
        console.log(res);
      }
    })
    //定时器
    var seconds = 60;
    var that = this;
    var time = setInterval(function(){
        var identifyBtn = {
          text: seconds + "秒后重发",
          disabled:true
        }
        seconds -= 1;
        if(seconds <= 0){
          console.log(seconds);
          var identifyBtn = {
            text: "获取验证码",
            disabled:false
          }
          clearInterval(time);
        }
        that.setData({identifyBtn:identifyBtn})
    },1000)
  },
  login:function(){
    var phone = this.data.phone;
    var messageCode = this.data.messageCode;
    var phoneReg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if(!phone){
      wx.showToast({
          title:"请填写手机号",
          icon:"success"
      });
      return;
    }
    if(!phoneReg.test(phone)){
        wx.showToast({
          title:"请填写合法手机号",
          icon:"success"
        });
        return;
    }
    if(!messageCode){
      wx.showToast({
        title:"请填写验证码",
        icon:"success"
      });
      return;
    }
    
    wx.request({
      url:HOST + "/user/login",
      method:"POST",
      data:{phone:phone,code:messageCode},
      header:app.globalData.HEADER,
      success:function(res){
        if(res.data.code == "0"){
            var uid = res.data.result.uid;
            var token = res.data.result.token;
            app.globalData.HEADER.uid = uid;
            app.globalData.HEADER.token = token;

            //获取用户信息
            wx.request({
              url: HOST + "/user/info",
              data: {},
              method: 'POST', 
              header: app.globalData.HEADER, // 设置请求的 header
              success: function(res){
                console.log("realName:",res.data.result.realName);
                app.globalData.userInfo.phone = res.data.result.phone;
                app.globalData.userInfo.realName = res.data.result.realName || "";
                app.globalData.userInfo.province = res.data.result.province || "";
                app.globalData.userInfo.city = res.data.result.city || "";
                app.globalData.userInfo.area = res.data.result.area || "";
                app.globalData.userInfo.birthDate = res.data.result.birthDate || "";
                
                wx.setStorage({
                  key: 'userInfo',
                  data: app.globalData.userInfo
                });
                wx.setStorage({
                  key: 'HEADER',
                  data: app.globalData.HEADER
                });
                wx.navigateBack({
                  delta: 1 // 回退前 delta(默认为1) 页数
                });
              }
            })

            
        }else{
            wx.showModal({
              title:"提示",
              content:"验证码错误，请重新填写",
              showCancel:false
            })
        }
      }
    })
  }
})