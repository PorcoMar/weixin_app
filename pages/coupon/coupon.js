// coupon.js
var app = getApp();
var HOST = app.globalData.HOST;
var HEADER = app.globalData.HEADER;

var util = require("../../utils/util.js");

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    useModalState: false,
    couponsList: [],
    scrollH: 0,
    loadMore: {
      hasMore: true,
      loading: false
    },
    pageStatus: {
      pageCount: 0,
      totalRecords: 0
    },
    currentPageNo: 1,
    currentStatus: 'UNUSED',
    pageSize: 10,
    limitCat: null,
    throttleStatus: true,
    firstLoad: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function() {
    console.log("conpons Show")
    var that = this;
    var token = app.globalData.HEADER.token;
    var uid = app.globalData.HEADER.uid;
    var windowHeight = app.globalData.deviceInfo.windowHeight;
    var windowWidth = app.globalData.deviceInfo.windowWidth;
    var pixelRatio = app.globalData.deviceInfo.pixelRatio;
    console.log(app.globalData.deviceInfo)
    this.setData({
      scrollH: windowHeight - (64 * windowWidth / 375)
    })

    if (token && uid) {
      // 获取优惠券信息
      if (this.data.firstLoad) { // 第一次加载请求数据
        let _params = {
          userId: uid,
          pageNo: 1,
          pageSize: this.data.pageSize
        }
        this.getCoupons(_params, this, this.couponsCb)
        this.setData({
          firstLoad: false
        })
      }
    } else {
      wx.navigateTo({
        url: '../personal/bindPhone/bindPhone',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("coupons Ready");
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
  
  // 点击切换nav
  switchNav: function (e) {
    var that = this;
    var _params = {
      userId: app.globalData.HEADER.uid,
      pageNo: 1,
      pageSize: 10,
    }
    switch (e.target.dataset.current) {
      case "0":
        console.log("请求可使用");
        this.setData({
          couponsList: [],
          currentTab: e.target.dataset.current,
          currentStatus: 'UNUSED'
        })
        _params = Object.assign({}, _params, { status: "UNUSED" });
        break;
      case "1":
        console.log("请求已使用");
        this.setData({
          couponsList: [],
          currentTab: e.target.dataset.current,
          currentStatus: 'USED'
        })
        _params = Object.assign({}, _params, { status: "USED" });
        break;
      case "2":
        console.log("请求已过期");
        this.setData({
          couponsList: [],
          currentTab: e.target.dataset.current,
          currentStatus: 'EXPIRED'
        })
        _params = Object.assign({}, _params, { status: "EXPIRED" });
        break;
      default:
        // no op
        break;
    }
    that.getCoupons(_params, that, that.couponsCb);
  },

  // 点击立即使用出现弹窗
  useHandle: function (e) {
    this.setData({
      limitCat: e.currentTarget.dataset.limitcat,
      useModalState: true
    })
  },
  
  // 隐藏Modal
  hideModal: function() {
    this.setData({
      useModalState: false
    })
  },

  // 保持Modal
  keepModal: function() {
    this.setData({
      useModalState: true
    })
  },

  // 获取优惠券
  getCoupons: function (params, context, callback) {
    wx.request({
      url: HOST + '/user/listCoupons',
      data: params,
      method: "POST",
      header: HEADER,
      success: function (res) {
        callback(res, context);
      }
    })
  },

  // 请求成功后回调函数
  couponsCb: function(res, context) {
    console.log(res.data)
    if (res.data.code == 0) {
      // 处理list
      var _list = context.data.couponsList;
      var _loadMore = context.data.loadMore;
      _loadMore.loading = false;
      if (res.data.result.list && res.data.result.list.length !== 0) {
        res.data.result.list.map(function (item) {
          item.couponDetail.beginTime = util.formatTimestamp(item.couponDetail.beginTime);
          item.couponDetail.endTime = util.formatTimestamp(item.couponDetail.endTime);
          item.couponDetail.logoSmall = "http://appimg.yizhenjia.com" + item.couponDetail.logoSmall;
          item.couponDetail.logoBig = "http://appimg.yizhenjia.com" + item.couponDetail.logoBig;
        })
        _list = _list.concat(res.data.result.list)
      }

      // 判断是否还有更多数据
      console.log("数据长度", _list.length, res.data.result.page.totalRecords)
      if (_list.length < res.data.result.page.totalRecords) {
        _loadMore.hasMore = false;
      } else {
        _loadMore.hasMore = true;
      }

      context.setData({
        couponsList: _list,
        loadMore: _loadMore,
        pageStatus: res.data.result.page,
      })
    } else {
      wx.showToast({
        title: res.data.result.errorMsg,
        icon: "loading",
        duration: 5000,
      })
    }
  },

  // 跳转到门店列表页面
  gotoShopList: function(e) {
    console.log(e);
    if(this.data.limitCat) {
      wx.navigateTo({
        url: '/pages/index/selectShop/selectShop?limitcat=' + this.data.limitCat,
      })
    }
  },

  // 加载更多
  loadMore: function() {
    if (!this.data.loadMore.hasMore) {
      let _loadMore = this.data.loadMore
      _loadMore.loading = true;
      this.setData({
        loadMore: _loadMore,
        throttleStatus: true
      })
      let _pageNo = this.data.currentPageNo + 1;
      let _params = {
        userId: app.globalData.HEADER.uid,
        pageNo: _pageNo,
        pageSize: this.data.pageSize,
        status: this.data.currentStatus
      }
      
      this.getCoupons(_params, this, this.couponsCb)
      this.setData({
        currentPageNo: _pageNo
      })
    } else {
      console.log("没有更多了")
    }
  },

  loadMoreBottom: function(){
    if (this.data.throttleStatus) {
      setTimeout(function () {
        this.loadMore()
      }.bind(this), 1000);
      this.setData({
        throttleStatus: false
      })
    }
  },

  onHide: function() {
    this.setData({
      useModalState: false
    })
  }

})

