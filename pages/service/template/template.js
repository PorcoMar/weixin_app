var app = getApp()
var url = app.globalData.HOST; 
Page( {
    data: {
      cont_url:"XXXXXXXX",
      price:0
    },
    //分享
    onShareAppMessage: function () {
        return {
        title: '商品详情',
        path: '/pages/service/detailUrl/detailUrl'
        }
    },
    onLoad: function( options ) {
        var that = this
        var id = 0
        var shopId = 0
        wx.getStorage({
            key: 'shopId',
            success: function(res) {
                console.log(res.data)
                shopId = res.data
            } 
        })        
        wx.getStorage({
            key: 'serviced',
            success: function(res) {
                console.log(res.data)
                id = res.data
            } 
        })
        setTimeout(function(){
            //console.log(id,shopId)//这里不是同步获取吗？怎么执行顺序像是异步的，通过setTimeout解决
            // 页面初始化 options 为页面跳转所带来的参数
            wx.request({
                url:url+'/service/detail',
                method: 'GET',
                data: {serviceId:id,shopId:shopId},
                header:app.globalData.HEADER,
                success: function(res) {
                    var result = res.data.result
                    var shop = res.data.result.shop
                    console.log(res)
                    console.log(result.desc)
                    that.setData({
                        cont_url:result.desc,
                        price:result.price,
                    })
                }
            })
        },100)  
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