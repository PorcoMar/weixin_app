const util = require('../../../utils/util.js');
var app = getApp();
var HOST = app.globalData.HOST;
function countdown(that) {
  let second = that.data.second;
  console.log(second)
  if (second == 0) {
    that.setData({
      defaultFont: "重新发送",
      ifShow: false,
      disabled: true,
      second: 6,
    });
    return;
  }
  let time = setTimeout(() => {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000)
};
Page({
  data: {
    wxInfo: null,
    userInfo: null,
    numVlu:"",
    codeVlu:"",
    second: 6,
    ifShow: false,
    defaultFont: "获取验证码",
    modalHidden1: false,
    modalHidden2: false,
    modalHidden3: false,
    modalHidden4: false,
    modalHidden5: false,
    modalHidden6: false,
    disabled: false,
    val: "",
    codeNum: "",
  },
  onLoad: function (options) {
    wx.getUserInfo({
      success: (res)=> {
        console.log(res);
        let wxInfo = JSON.parse(res.rawData);
        app.globalData.wxInfo = wxInfo;
        //console.log(app.globalData)
        this.setData({ wxInfo: wxInfo });
        wx.setStorage({
          key: 'wxInfo',
          data: wxInfo,
          success: (res)=> {
            console.log("-----setStorage successed------")
            //console.log(this.data.wxInfo)
          }
        })
        const userImg = wxInfo.avatarUrl;
        const useName = wxInfo.nickName;
        const openIdn = app.globalData.openid;
        console.log(openIdn,useName,userImg)
      },
      fail: function () {
        console.log("------login fail-------");
        wx.showModal({
          title: '提示',
          content: '请删除小程序后重新进入，使用微信授权登录',
          showCancel: false
        });
      }
    })




    //获取用户信息
      //console.log(app.globalData.wxInfo)
      //let userInfo = app.globalData;
      // let userImg = userInfo.wxInfo.avatarUrl;
      // let userName = userInfo.wxInfo.nickName;
      // let openId = userInfo.openid;
      //console.log(userImg, userName, openId)
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;

    // wx.getStorage({
    //   key: "HEADER",
    //   success: function (res) {
    //     console.log(res)
    //     //获取用户信息
    //     getApp().globalData.HEADER = res.data;
    //     wx.request({
    //       url: HOST + "/user/info",
    //       method: "POST",
    //       header: res.data,
    //       success: function (res) {
    //         console.log(res)
    //       }
    //     });
    //   }
    // })


  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindInp: function (e) {
    this.setData({
      val: e.detail.value
    })
  },
  bindInp2: function (e) {
    this.setData({
      codeNum: e.detail.value
    })
  },
  getVal: function () {
    let val = this.data.val
    if (!val) {
      this.setData({
        modalHidden2: true
      })
    } else if (val.length != 11) {
      this.setData({
        modalHidden3: true
      })
    } else if (!(/^1[34578]\d{9}$/.test(val))) {
      this.setData({
        modalHidden4: true
      })
    } else {
      if (!this.data.ifShow) {
        this.setData({ ifShow: true })
      }
      this.setData({ disabled: true})
      countdown(this);
      //请求接口短信
      wx.request({
        url: HOST + "/user/getCode",
        method: "POST",
        header: getApp().globalData.HEADER,
        data: { phone: this.data.val,type:"LOGIN"},
        success: function (res) {
          if(res.data.code==0){
              console.log("请求成功")
          }
        }
      });

    }
  },
  getGift: function () {
    console.log(this.data.val, this.data.codeNum)
    if (!this.data.codeNum){//验证码为空
      this.setData({
        modalHidden1: true
      })
     }else{
       //请求提交接口
      wx.request({
        url: HOST + "/distribute/addDistributeUser",
        method: "POST",
        header: getApp().globalData.HEADER,
        data: { 
          phone: this.data.val,
          code: this.data.codeNum,

          },
        success: function (res) {
          if (res.data.code == 0) {
            console.log("请求成功")
            this.setData({
              modalHidden5: true
            })
          }
        }
      });

     }

  },
  modalChange1: function () {//点击确定,隐藏
    this.setData({
      modalHidden1: false
    })
  }, 
  modalChange2: function () {//点击确定,隐藏
    this.setData({
      modalHidden2: false
    })
  },
  modalChange3: function () {//点击确定,隐藏
    this.setData({
      modalHidden3: false
    })
  },
  modalChange4: function () {//点击确定,隐藏
    this.setData({
      modalHidden4: false
    })
  },
  modalChange5:function(){
    this.setData({
      modalHidden5: false
    })   
    wx.switchTab({
      url: '/pages/index/index',
    })
  }


})