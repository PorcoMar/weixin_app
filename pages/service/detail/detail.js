var app = getApp()
var url = app.globalData.HOST; 
Page( {
    data: {
        data: [],
        databody: null, 

        winHeight: 0,   // 设备高度
        hidden: false,
        imgUrls:[
        '../../../images/service/default_two.png'
        ],
        show:false,
        img:null,
        imgn:true,
        url:null,
        pay:null,
        confirm:true,
        serviceType:"service",
        yuesao:true,
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
//     下拉刷新
  onPullDownRefresh: function(){
    wx.PullDownRefresh()
  },
    onLoad: function( options ) {
        var that = this
        var id = options.id
        var shopId=options.shopId
        console.log(id,shopId)
        wx.setStorage({//存入localstorge在details里取得
            key:"serviced",
            data:id
        })
        wx.setStorage({//存入localstorge在details里取得
            key:"shopId",
            data:shopId
        })
        
        this.setData({
            serviceId:id,
            shopId:shopId,
           longitude:app.globalData.shop.lng,
           latitude:app.globalData.shop.lat
        })
        // 页面初始化 options 为页面跳转所带来的参数
        var lngn = that.data.longitude;
        var latn = that.data.latitude;
        console.log(lngn,latn)
        wx.request({
            url:url+'/service/detail',
            method: 'POST',
            data: {serviceId:id,shopId:shopId,lng:lngn,lat:latn},
            header:app.globalData.HEADER,
            success: function(res) {
            console.log(res)
                if(res.data.code=="CM005"){//系统错误
                    that.setData({
                        imgUrls:[
                        '../../../images/service/default_two.png'
                        ]
                    })
                }
                else{
                    var result = res.data.result
                    var shop = res.data.result.shop
                    var distance = (shop.distance/1000).toFixed(1)
                    that.setData({
                        imgUrls: result.imgs,
                      title_header:result.name,
                      descript:result.summary,
                      mount:result.soldCount,
                      title_dian:shop.name,
                      work_time:shop.businessHours,
                      distance:distance,
                      address_detail:shop.address,
                      price:result.price,
                      phoneNumber:shop.tel,
                      hasWifi:shop.hasWifi,
                      hasPark:shop.hasPark,
                      hasPayCard:shop.hasPayCard,
                      hasTea:shop.hasTea,
                      serviceType:result.serviceType
                    })
                    if(res.data.result.imgs.length==0){
                        that.setData({
                            imgUrls:[
                            '../../../images/service/default_two.png'
                            ],
                            imgn:false
                        })                        
                    }
                    
                }
                if(that.data.serviceType=="YUESAO"){
                    // console.log(that.data.serviceType)
                    that.setData({
                        yuesao: true,
                    })
                }else{
                    // console.log(that.data.serviceType)
                    that.setData({
                        yuesao:false
                    })
                }               
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
        console.log(app.globalData.shop.lng)
        console.log(app.globalData.shop.lat)
    },

    //月嫂弹框跳转
    pay:function(){
        if(this.data.serviceType=="YUESAO"){
            this.setData({
                yuesao: true,
                show:true
            })
        }else{
            this.setData({
                yuesao:false,
                show:false
            });
            console.log("头部",app.globalData.HEADER);
            var token = app.globalData.HEADER.token;
            var uid = app.globalData.HEADER.uid;
            if(token && uid){
                wx.navigateTo({
                  url: '../../order/pages/submit-order/submit-order?shopId='+this.data.shopId+'&serviceId='+this.data.serviceId,
                })
            }else {
                console.log("请先绑定手机号！");
                wx.showModal({
                    content: "您还没有绑定手机号，请绑定手机号才能购买买！",
                    confirmText: "确定",
                    cancelText: "取消",
                    success:function(res){
                    // 确认
                    if(res.confirm){
                        wx.navigateTo({
                            url: '../../personal/bindPhone/bindPhone',
                        })
                    }else{
                        // 取消
                        console.log("手机号未绑定！")
                    }
                    }
                })
            }
            
        }
    },
    confirm:function(){
        this.setData({
            show:false
        })       
    },
    calling:function(){
        var num = this.data.phoneNumber
        wx.makePhoneCall({
        phoneNumber: num, 
        success:function(){
           // console.log("拨打电话成功！")
        },
        fail:function(){
           // console.log("拨打电话失败！")
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