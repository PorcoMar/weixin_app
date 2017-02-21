var app = getApp()
var url = app.globalData.HOST; 
Page( {
    data: {
      cont_url:null,
      price:0
    },
    //分享
    onShareAppMessage: function () {
        return {
        title: '商品详情',
        path: '/pages/service/detailUrl/detailUrl'
        }
    },
    //下拉刷新
  onPullDownRefresh: function(){
    wx.PullDownRefresh()
  },
    onLoad: function( options ) {
        var that = this
        var id = options.serviceId
        var shopId=options.shopId
        console.log(id,shopId)
        this.setData({
            serviceId:id,
            shopId:shopId
        })
        // 页面初始化 options 为页面跳转所带来的参数
        wx.request({
            url:url+'/service/detail',
            method: 'GET',
            data: {serviceId:id,shopId:shopId},
            header:app.globalData.HEADER,
            success: function(res) {
                var result = res.data.result
                var shop = res.data.result.shop
                var test0 = result.desc
                var test1 = test0.replace("<p","<view").replace("<\/p","<\/view").replace("<span","<text").replace("<\/span","<\/text").replace("<strong","<text").replace("<\/strong","<\/text").replace("<img","<image")
                var text = "<text>222222222222222222222222222222222222222222</text>"
                console.log(text)
        
                console.log(text)
                console.log(result.desc)
                that.setData({
                    cont_url:test0,
                    price:result.price,
                })
            }
        })
    },

    onShareAppMessage: function () {
        return {
        title: '商品详情',
        path: '/pages/service/detailUrl/detailUrl'
        }
    },

    onReady: function() {
        var that = this
        setTimeout( function() {
            that.setData( {
                hidden: true
            })
        },500);
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})