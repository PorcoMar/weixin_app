
const util = require( '../utils/util.js' );

Page( {
    data: {
        data: [],
        databody: null, 

        winHeight: 0,   // 设备高度
        loadingHidden:false,
        imgUrls:[
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
        show:false,
        img:null,
        url:null,
        pay:null,
        confirm:true,

    },
    onLoad: function( options ) {
        // 页面初始化 options 为页面跳转所带来的参数
        var that = this
        var id = options.id;
        // wx.getStorage({
        // key: 'pageID',
        // success: function(res) {
        //     console.log(res.data)
        // } 
        // })       


        // 请求内容数据
        util.AJAX( "news/" + id, function( res ) {

            var arr = res.data;
            var body = arr.body;
            body = body.match( /<p>.*?<\/p>/g );
            console.log(arr)
            // var ss = [];
            // for( var i = 0, len = body.length; i < len;i++ ) {

            //     ss[ i ] = /<img.*?>/.test( body[ i ] );

            //     if( ss[ i ] ) {
            //         body[ i ] = body[ i ].match( /(http:|https:).*?\.(jpg|jpeg|gif|png)/ );
            //     } else {
            //         body[ i ] = body[ i ].replace( /<p>/g, '' )
            //             .replace( /<\/p>/g, '' )
            //             .replace( /<strong>/g, '' )
            //             .replace( /<\/strong>/g, '' )
            //             .replace( /<a.*?\/a>/g, '' )
            //             .replace( /&nbsp;/g, ' ' )
            //             .replace( /&ldquo;/g, '"' )
            //             .replace( /&rdquo;/g, '"' );
            //     }
            // }

            // 重新写入数据
            that.setData( {
                data: arr,
                databody: body,
                img:arr.image,
                title:arr.title,
                url:arr.share_url
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


    pay:function(){
        this.setData({
            show:true
        })
     console.log(222222222222222222222222222)

    },
    confirm:function(){
        this.setData({
            show:false
        })       
        console.log(33333333333333333333)
    },



    onReady: function() {
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