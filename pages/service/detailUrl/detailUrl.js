var app = getApp()
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
            url:'https://test.yizhenjia.com/xcxapi/service/detail',
            method: 'GET',
            data: {serviceId:id,shopId:shopId},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                var result = res.data.result
                var shop = res.data.result.shop
                console.log(result.desc)
                that.setData({
                    cont_url:result.desc,
                    price:result.price,
                })
            }
        })
    },

    //月嫂弹框跳转
    pay:function(){
        this.setData({
            show:true
        })
    },
    confirm:function(){
        this.setData({
            show:false
        })       
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