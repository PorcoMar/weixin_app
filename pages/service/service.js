var app = getApp()
var url = app.globalData.HOST; 
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
        indicatorDots: false,    // 是否显示面板指示点
        autoplay: false,    // 是否自动切换
        interval: 5000,     // 自动切换时间间隔
        duration: 1500,     // 滑动动画时长
        shopId:0,
        cat:1,
        pageSize:5,
        pageNo:1,

    },
    onShareAppMessage: function () {
        return {
        title: '服务',
        path: '/pages/service/service'
        }
    },
    //下拉刷新
//   onPullDownRefresh: function(){
//     wx.PullDownRefresh()
//   },
    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function( options ) {
        var that = this;
        wx.getSystemInfo( {
            success: function( res ) {
                that.setData( {
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });
        that.setData( {
            hidden: false,
            shopId:app.globalData.shop.id
        });


// ****************init request data*************************
         wx.request({
            url: url+'/service/cat',
            method: 'GET',
            header:app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    tab: res.data.result
                })
            }
        })
        //  请求新11111数据
        var pageNo = that.data.pageNo
        var pageSize = that.data.pageSize
        var shopId = that.data.shopId
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:1,shopId:shopId,pageNo:pageNo,pageSize:pageSize},
            header: app.globalData.HEADER,
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

    /***********************************************************
     * 事件处理
     * scrolltolower auto loading more
     */
    scrolltolower: function( e ) {
        var that = this;
        that.setData( {
            hothidden: true  
        })

        var pageNo = that.data.pageNo+1
        var cat=that.data.cat
        var pageSize = that.data.pageSize
        var shopId = that.data.shopId
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:cat,shopId:shopId,pageNo:pageNo,pageSize:pageSize},
            header: app.globalData.HEADER,
            success: function(res) {
                var arr1 = res.data.result;
                var list1 = that.data.choiceItems0
                console.log(res)//卧槽，因为看不见所以。。。。
               // console.log(res.data.result.length) //最后一次加载字段的长度
                var lastDataLength = res.data.result.length
                that.setData({
                    pageSize:lastDataLength 
                })

                if( that.data.pageSize <5) {
                    that.setData( {
                        hothidden: false //显示加载更多
                    });
                }else{
                    that.setData({
                        choiceItems0: list1.concat(arr1), 
                        pageNo:that.data.pageNo+1
                    })
                } 
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                //console.log(that.data.choiceItems0)
                }, 3500)
            }
        })
    },
   
    /**
     * 滑动切换tab
     */
    bindChange: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        that.setData( { 
            pageNo:1,
            pageSize:5,
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
        var catId = e.detail.current+1 //0/1/2...8
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:catId,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,
                    choiceItems0: res.data.result,
                    cat:1       
                })
            }
        })
    },
    /**
     * 点击tab切换
     */
    swichNav0: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:1,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,
                    choiceItems0: res.data.result,
                    cat:1       
                })
            }
        })
        }
    },
    swichNav1: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden1:true,
            })
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:2,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,
                    cat:2,
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav2: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden2:true
            })
          wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:3,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5, 
                    cat:3,
                    choiceItems0: res.data.result       
                })
            }
        })           
        }
    },
    swichNav3: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden3:true
            })
         wx.request({
            url:url+'/service/list',
            method: 'GET',
            data: {cat:4,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                     cat:4,
                     pageNo:1,
                    pageSize:5,
                    choiceItems0: res.data.result 
                          
                })
            }
        })
        }
    },
    swichNav4: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden4:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:5,shopId:shopId,pageNo:1,pageSize:5},
            header:app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,                     
                    cat:5,
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav5: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden5:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:6,shopId:shopId,pageNo:1,pageSize:5},
            header:app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,                     
                    cat:6,
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav6: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden6:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'GET',
            data: {cat:7,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,                     
                    cat:7,
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav7: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden7:true
            })
         wx.request({
            url:url+'/service/list',
            method: 'GET',
            data: {cat:8,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,                     
                    cat:8,
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },
    swichNav8: function( e ) {
        var that = this;
        var shopId = that.data.shopId
        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current,
                hothidden8:true
            })
         wx.request({
            url:url+'/service/list',
            method: 'GET',
            data: {cat:9,shopId:shopId,pageNo:1,pageSize:5},
            header:app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,                     
                    cat:9,
                    choiceItems0: res.data.result       
                })
            }
        })
        }
    },

})