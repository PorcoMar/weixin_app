// pages/service/service.js
//const util = require( 'utils/util.js' );

Page( {
    data: {

        /**
         * 页面配置
         */
        winWidth: 0,
        winHeight: 0,

        // tab切换
        currentTab: 0,
        topStories : [],
        datalist: [],
        dataThemes : [],

        dataListDateCurrent: 0,      // 当前日期current
        dataListDateCount: 0,      // 请求次数

        // 显示加载更多 loading
        hothidden: false,
        hothidden1: false,
        hothidden2: false,
        hothidden3: false,
        hothidden4: false,
        hothidden5: false,
        hothidden6: false,
        hothidden7: false,
        hothidden8: false,

        // loading
        hidden: true,
        loadingHidden:false,
        page:1,
        pageNo:2,
        indicatorDots: false,    // 是否显示面板指示点
        autoplay: false,    // 是否自动切换
        interval: 5000,     // 自动切换时间间隔
        duration: 1500,     // 滑动动画时长
        shopId:20,
        cat:1,

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
    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function( options ) {
       // wx:showNavigationBarLoading()
        var that = this;
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
        
        //  请求新header数据
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/cat',
            method: 'GET',
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    tab: res.data.result
                })
            }
        })
        //  请求新11111数据
        var pageNo = that.data.pageNo
        var cat=that.data.cat
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:cat,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })




        // var page = that.data.page
        // //  请求新111111数据
        //  wx.request({
        //     url: 'http://www.tngou.net/api/top/list',
        //     method: 'GET',
        //     data: {page:page,rows:8,id:1},
        //     header: {
        //         'Accept': 'application/json'
        //     },
        //     success: function(res) {
        //         console.log(res.data.tngou)
        //         that.setData({
        //             choiceItems: res.data.tngou
        //         })
        //         setTimeout(function () {
        //             that.setData({
        //                 loadingHidden: true
        //             })
        //         }, 1500)
        //     }
        // })





    },
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
        console.log(this.data.cat)
        // 页面关闭
    },


   
    /**
     * 滑动切换tab
     */
    bindChange: function( e ) {

        var that = this;
        that.setData( { 
            currentTab: e.detail.current,
            hothidden:true,
            hothidden1:true,
            hothidden2:true,
            hothidden3:true,
            hothidden4:true,
            hothidden5:true,
            hothidden6:true,
            hothidden7:true,
            hothidden8:true,
         });

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
                currentTab: e.target.dataset.current,
                hothidden:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:1,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav1: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden1:true,
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:2,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav2: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden2:true
            })
          wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:3,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })           
        }
    },
    swichNav3: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden3:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:4,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav4: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden4:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:5,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav5: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden5:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:6,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav6: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden6:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:7,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav7: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden7:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:8,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav8: function( e ) {
        var that = this;
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden8:true
            })
         wx.request({
            url: 'http://xcx.api-test.yizhenjia.com/service/list',
            method: 'GET',
            data: {cat:9,shopId:20},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },

})