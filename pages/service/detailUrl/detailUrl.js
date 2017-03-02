var app = getApp()
var url = app.globalData.HOST; 
Page( {
    data: {
     hidd:true,
     show:false,
     yuesao:true,
     confirm:true,
     serviceType:"",
    item: {
        // index: 0,
        // msg: 'this is a template',
        // time: '2016-09-15',
        contentUrl:"暂时没有内容"
    },
    contentUrl:"暂时没有信息额",
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
                // console.log(text)
                console.log(result.desc)
                that.setData({
                    'item.contentUrl':test0,
                    contentUrl:test0,
                    price:result.price,
                    serviceType:result.serviceType
                })
            }
        })
        // setTimeout( function() {
        //     that.setData( {
        //         hidd: true
        //     })
        // },3000);
    },
    //月嫂弹框跳转
    pay:function(){
        console.log(this.data.serviceType)
        if(this.data.serviceType=="YUESAO"){
            this.setData({
                yuesao: true,
                show:true
            })
        }else{
            this.setData({
                yuesao:false,
                show:false
            })
        }
    },   
     confirm:function(){
         console.log(1111111)
        this.setData({
            show:false
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