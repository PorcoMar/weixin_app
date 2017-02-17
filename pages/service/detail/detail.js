var app = getApp()
Page( {
    data: {
        data: [],
        databody: null, 

        winHeight: 0,   // 设备高度
        hidden: false,
        imgUrls:null,
        show:false,
        img:null,
        url:null,
        pay:null,
        confirm:true,
        //数据
        serviceId:0,
        shopId:0,
        mount:656,
        title_header:"CocodemerCocodemer产后护理套餐",
        descript:"仅售418元，价值680元单人颈肩腰部护理一次，节假日通用，免费wifi，男女通用。",
        title_dian:"cocoderer港汇店",
        work_time:"10:00-21:00",
        distance:"1.8",
        address_detail:"[徐汇区]虹桥路1港汇中心一座8层805～806",
        price:"1350",
        phoneNumber:"186XXXXXXXX",
         longitude:120,
         latitude:30       
 
    },
    //分享
    onShareAppMessage: function () {
        return {
        title: '商品详情',
        path: '/pages/service/detail/detail'
        }
    },
    //下拉刷新
  onPullDownRefresh: function(){
    wx.PullDownRefresh()
  },
    onLoad: function( options ) {
        var that = this
        var id = options.id
        var shopId=options.shopId
        //console.log(id,shopId)
        this.setData({
            serviceId:id,
            shopId:shopId,
           longitude:app.globalData.shop.lng,
           latitude:app.globalData.shop.lat
        })
        // 页面初始化 options 为页面跳转所带来的参数
        wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/detail',
            method: 'GET',
            data: {serviceId:id,shopId:shopId,lng:that.data.longitude,lat:that.data.latitude},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                var result = res.data.result
                var shop = res.data.result.shop
                console.log(result)
                that.setData({
                 imgUrls: result.imgs,
                  title_header:result.name,
                  descript:result.summary,
                  mount:result.soldCount,
                  title_dian:shop.name,
                  work_time:shop.businessHours,
                  distance:shop.distance,
                  address_detail:shop.address,
                  price:result.price,
                  phoneNumber:shop.tel
                })
            }
        })

        wx.getSystemInfo( {

            success: function( res ) {
                that.setData( {
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
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
    //查看详情
    // detail_info:function(){

    // },
    calling:function(){
        var num = this.data.phoneNumber
        wx.makePhoneCall({
        phoneNumber: num, 
        success:function(){
            console.log("拨打电话成功！")
        },
        fail:function(){
            console.log("拨打电话失败！")
        }
        })
    },
    address:function(){
        var that = this
        wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
            wx.openLocation({
           longitude:that.data.longitude,
           latitude:that.data.latitude,
           name:that.data.title_dian,
           address:that.data.address_detail,
            scale: 28
            })
        }
        })         
    },
    onReady: function() {
        var that = this
        setTimeout( function() {
            that.setData( {
                hidden: true
            })
        },500);
       // wx:hideNavigationBarLoading()
        // 页面渲染完成
        // 修改页面标题
        // wx.setNavigationBarTitle( {
        //     title: this.data.data.title
        // })


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