// selectCity.js
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:null,
    cityName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取当前所处的位置
    var location = app.globalData.location || {city:"上海市"};
    this.setData({ cityName: location.city });
    //获取所有的城市列表
    wx.request({
      url: HOST + "/shop/cityList",
      data: null,
      method: 'POST',
      header: HEADER,
      success: function (res) {
        console.log('rs',res);
        if (res.data.code == "0") {
          var cityList = res.data.result;
          console.log('city',cityList);
          // shopList.map(function (item, index) {
          //   var _imgArr = item.images.split(',');

          //   for (var i = 0; i < _imgArr.length; i++) {
          //     _imgArr[i] = "http://appimg.yizhenjia.com/" + _imgArr[i];
          //   }
          //   item.imgs = _imgArr;
          //   item.logo = "http://appimg.yizhenjia.com/" + item.logo
          //   item.selected = false;
          // })
        }
        that.setData({
          cityList: cityList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  changeCity:function(e){
    // console.log(e);
    var city = e.currentTarget.dataset.city;
    console.log(city,app.globalData.location);
    this.setData({
      cityName: city
    });
    if (app.globalData.location){
      app.globalData.location.city = city;
    }else {
      app.globalData.location = {city:city};
    }
    
    wx.redirectTo({
      url: '../selectShop/selectShop',
    })
  }
})