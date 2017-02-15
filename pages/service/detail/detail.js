
const util = require( '../utils/util.js' );

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
        mount:656,
        title_header:"CocodemerCocodemer产后护理套餐",
        descript:"仅售418元，价值680元单人颈肩腰部护理一次，节假日通用，免费wifi，男女通用。",
        title_dian:"cocoderer港汇店",
        work_time:"营业时间：周一至周五，10:00-21:00",
        distance:"1.8",
        address_detail:"[徐汇区]虹桥路1港汇中心一座8层805～806",
        price:"1350"

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
       // wx:showNavigationBarLoading()
        // 页面初始化 options 为页面跳转所带来的参数
        var that = this
        var id = options.id;
        console.log(id)
        // wx.getStorage({
        // key: 'pageID',
        // success: function(res) {
        //     console.log(res.data)
        // } 
        // })       

        //请求banner图数据
        wx.request({
            url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    imgUrls: res.data
                })
            }
        })



        // 请求内容数据
        util.AJAX( "news/" + id, function( res ) {
            var arr = res.data;
            var body = arr.body;
            body = body.match( /<p>.*?<\/p>/g );
            console.log(arr)
            that.setData( {
                datan: arr
            });

        });


        /**
         * 获取系统信息
         */
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
    detail_info:function(){

    },
    calling:function(){
        wx.makePhoneCall({
        phoneNumber: '12345678900', 
        success:function(){
            console.log("拨打电话成功！")
        },
        fail:function(){
            console.log("拨打电话失败！")
        }
        })
    },
    // address:function(){
           
    // },
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