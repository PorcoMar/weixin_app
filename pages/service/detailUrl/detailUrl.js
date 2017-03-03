var app = getApp()
var url = app.globalData.HOST; 
var WxParse = require('../wxParse/wxParse.js');
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
                console.log(res.data.result)
            //var data = res.data[optionId];
            //var imgInfoArr = res.data[optionId].img;
                var imgInfoArr = res.data.result.imgs
                console.log(imgInfoArr)
                var result = res.data.result
                var shop = res.data.result.shop
                var test0 = result.desc
                //console.log(result.desc)
                that.setData({
                    'item.contentUrl':test0,
                    contentUrl:test0,
                    price:result.price,
                    serviceType:result.serviceType
                })

                //替换标签中特殊字符
                var infoFlg = "<!--SPINFO#0-->";
                var imgFlg = "<!--IMG#";
                var content = test0;
                console.log(content)
                //替换标签中特殊字符
                var infoFlg = "<!--SPINFO#0-->";
                if (content.indexOf(infoFlg) > 0) {
                content = content.replace(/<!--SPINFO#0-->/, "");
                // console.log(11111111,content)
                }
                // console.log(2222222222,infoFlg)

                var imgFlg = "<!--IMG#";
                // console.log(3333333,imgFlg)
                //图片数量
                var imgCount = (content.split(imgFlg)).length-1; 
                // console.log(444444,imgCount)
                if (imgCount > 0) {
                console.log("有dd" + imgCount + "张图片");  
                // console.log(5555555)
                for (var i = 0; i < imgCount; i++) {
                    var imgStr = "<!--IMG#" + i + "-->";
                    var imgSrc = "\"" + imgInfoArr[i].src + "\""; 
                    var imgHTML = "<div> <img style=\"width:100%\" src=" +imgSrc+ "> </div>";
                    content = content.replace(imgStr, imgHTML);
                //console.log(666666666)
                }
                }
                // console.log(7777777)
                var article = content;
                //console.log(88888888888,article)
                WxParse.wxParse('article','html',article,that,imgCount);
         //console.log(99999999)
            }
        })
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