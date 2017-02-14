// pages/service/service.js
const util = require( 'utils/util.js' );

Page( {
    data: {

        /**
         * 页面配置
         */
        winWidth: 0,
        winHeight: 0,

        // tab切换
        currentTab: 0,

        // 幻灯片数据
        topStories : [],
        // 精选数据
        datalist: [],
        // 日报数据
        dataThemes : [],

        dataListDateCurrent: 0,      // 当前日期current
        dataListDateCount: 0,      // 请求次数

        // 显示加载更多 loading
        hothidden: true,

        // loading
        hidden: true,
        loadingHidden:false,
        page:1,
      //id:0,

        /**
         * 滑动面板参数配置
         */
        indicatorDots: false,    // 是否显示面板指示点
        autoplay: false,    // 是否自动切换
        interval: 5000,     // 自动切换时间间隔
        duration: 1500,     // 滑动动画时长

    },
    onShareAppMessage: function () {
        return {
        title: '服务',
        path: '/pages/service/service'
        }
    },
    //下拉刷新
  onPullDownRefresh: function(){
    wx.PullDownRefresh()
  },

    // showNavigationBarLoading:function(){
    //     wx:showNavigationBarLoading()
    // },

    // hideNavigationBarLoading:function(){
    //     wx:hideNavigationBarLoading()
    // },

    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function( options ) {
       // wx:showNavigationBarLoading()
        var that = this;

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


        /**
         * 显示 loading
         */
        that.setData( {
            hidden: false
        });


// ****************初始化请求精选数据*************************
        var page = that.data.page
        //  请求新111111数据
         wx.request({
            url: 'http://www.tngou.net/api/top/list',
            method: 'GET',
            data: {page:page,rows:8,id:1},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data.tngou)
                that.setData({
                    choiceItems: res.data.tngou
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })
//  请求新22222数据
        util.AJAX( "news/latest", function( res ) {

            var arr = res.data;
            console.log(arr)
            var format = util.getFormatDate( arr.date );

            // 格式化日期方便加载指定日期数据
            // 格式化日期获取星期几方便显示
            arr[ "dateDay" ] = format.dateDay;
            // 获取当前现有数据进行保存
            var list = that.data.datalist;//装了一个请求的空数组
    
            // 重新写入数据
            that.setData( {
                datalist: list.concat( arr ),
                topStories : arr.top_stories,
                dataListDateCurrent: arr.date,    // 当前日期
                dataListDateCount: 1
            });

        });





    },
    // turn_btn:function(){
    //     wx.setStorage({
    //         key:"pageID",
    //         data:this.data.id
    //     })
    //     wx.navigateTo({
    //         url: '../detail/detail'
    //     })
       
    // },
    onReady: function() {
       // wx:hideNavigationBarLoading()
        // 页面渲染完成
        var that = this;

       // 数据加载完成后 延迟隐藏loading
        setTimeout( function() {
            that.setData( {
                hidden: true
            })
        }, 500 );


    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },


    /***********************************************************
     * 事件处理
     * scrolltolower 自动加载更多
     */
    scrolltolower: function( e ) {

        var that = this;

        // 加载更多 loading
        that.setData( {
            hothidden: true
        })

        var currentDate = this.data.dataListDateCurrent;

        // 如果加载数据超过10条 加载数据条数this.data.dataListDateCount
        
 //       if( this.data.dataListDateCount >=10 ) {
        if( this.data.rows >=10 ) {
            console.log(1111111)
            // 加载更多 loading
            that.setData( {
                hothidden: false
            });

        } else {
             console.log(2222222)
            /**
             * 发送请求数据
             */
            util.AJAX( "news/before/" + currentDate, function( res ) {

                var arr = res.data;
                console.log(arr)

                // 获取当前数据进行保存
                var list = that.data.datalist;
                        console.log(list)
                // 然后重新写入数据
                that.setData( {
                    datalist: list.concat( arr ),                              // 存储数据
                    dataListDateCurrent: arr.date,
                    // 统计加载次数
                    dataListDateCount: that.data.dataListDateCount + 1      
                });
            });

    // *****************tngou加载更多
            var page = that.data.page
        //  请求新哈哈数据
         wx.request({
            url: 'http://www.tngou.net/api/top/list',
            method: 'GET',
            data: {page:page,rows:12,id:1},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data.tngou)
                that.setData({
                    choiceItems: res.data.tngou
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true,
                        page:that.data.page+1
                    })
                }, 1500)

                // wx.setStorage({//存入localstorge在details里取得
                //     key:"pageID",
                //     data:page
                //     })
                }
        })




        }
    },
    /**
     * 滑动切换tab
     */
    bindChange: function( e ) {

        var that = this;
        that.setData( { currentTab: e.detail.current });

    },
    /**
     * 点击tab切换
     */
    swichNav: function( e ) {

        var that = this;

        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current
            })
        }


    },
})