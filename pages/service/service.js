var app = getApp()
var url = app.globalData.HOST; 
Page( {
    data: {

        /**
         * 页面配置
         */
        winWidth: 0,
        winHeight: 0,
        block_hidden:true,

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
        indicatorDots: false,    // 是否显示面板指示点
        autoplay: false,    // 是否自动切换
        interval: 5000,     // 自动切换时间间隔
        duration: 1500,     // 滑动动画时长
        shopId:0,
        cat:1,
        pageSize:5,
        pageNo:1,
        isBoolen:true
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
    onLaunch:function(){
        console.log(111111111)
    },
    onLoad: function( options ) {
        var that = this;
        wx.getSystemInfo( {
            success: function( res ) {
                //console.log(res)
                that.setData( {
                    winHeight: res.windowHeight
                });
            }

        });
        that.setData( {
            hidden: false,
            shopId:app.globalData.shop.id
        });

      console.log("------获取位置信息------")
      //获取地理位置信息
       wx.getLocation({
         type:"wgs84",
         success:function(res){
           var location = {
             lat:res.latitude,
             lng:res.longitude
           };
           //获取门店信息
           wx.request({
             url: url + "/shop/detail",
             data: location,
             method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
             header:app.globalData.HEADER,
             success: function(res){
               console.log(res.data);
                if(res.data.code == "0"){
                    that.setData({
                        shopId:res.data.result.id
                    })
                };
             }  
           })
         }
       })
             wx.request({
                url: url+'/service/cat',
                method: 'POST',
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
            var shopId = that.data.shopId//检测正常
            console.log(shopId)
            wx.request({
                url: url+'/service/list',
                method: 'POST',
                data: {cat:1,shopId:shopId,pageNo:pageNo,pageSize:pageSize},
                header: app.globalData.HEADER,
                success: function(res) {
                    console.log(res)
                    that.setData({
                        hothidden:true,
                        choiceItems0: res.data.result       
                    })
                }
            })        


// ****************init request data*************************


    },
    onReady: function() {
       // wx:hideNavigationBarLoading()
        // 页面渲染完成
        var that = this
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

upper:function(){
    this.setData({
        block_hidden:true
    })
    console.log("出现")
},

    /***********************************************************
     * 事件处理
     * scrolltolower auto loading more
     */
    scrolltolower: function( e ) {
        var that = this;
        that.setData( {
            hothidden: true, 
            block_hidden:false 
        })
        console.log("滚动事件")
        var pageNo = that.data.pageNo+1
        var cat=that.data.cat
        var pageSize = that.data.pageSize
        var shopId = that.data.shopId
        console.log(cat,shopId,pageSize)//检测正常
         wx.request({
            url: url+'/service/list',
            method: 'POST',
            data: {cat:cat,shopId:shopId,pageNo:pageNo,pageSize:pageSize}, 
            header: app.globalData.HEADER,
            success: function(res) {
                var arr1 = res.data.result;
                var list1 = that.data.choiceItems0
                console.log(res.data)//卧槽，因为看不见所以。。。。
               // console.log(res.data.result.length) //最后一次加载字段的长度
                var lastDataLength = res.data.result.length
                if( lastDataLength <5) {
                    console.log(that.data.isBoolen)
                    if(that.data.isBoolen){
                        console.log(11111)
                        that.setData( {
                            choiceItems0: list1.concat(arr1),
                        });
                        if(lastDataLength==0){
                           that.setData({hothidden: false}) 
                        }
                        that.setData({isBoolen:false})
                    }else{
                        that.setData({hothidden: false})//显示没有更多 
                        console.log(22222)
                    }
                }else{
                        console.log(33333)
                    that.setData({
                        choiceItems0: list1.concat(arr1), 
                        pageNo:that.data.pageNo+1
                    })
                } 
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
            block_hidden:true,
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
            isBoolen:true
         });
        var catId = e.detail.current+1 //0/1/2...8
        console.log(catId,shopId)//检测正常
         wx.request({
            url: url+'/service/list',
            method: 'POST',
            data: {cat:catId,shopId:shopId,pageNo:1,pageSize:5},
            header: app.globalData.HEADER,
            success: function(res) {
                console.log(res)
                that.setData({
                    pageNo:1,
                    pageSize:5,
                    choiceItems0: res.data.result,
                    cat:catId       
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden1:true,
            })
         wx.request({
            url: url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden2:true
            })
          wx.request({
            url: url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden3:true
            })
         wx.request({
            url:url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden4:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden5:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden6:true
            })
         wx.request({
            url: url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden7:true
            })
         wx.request({
            url:url+'/service/list',
            method: 'POST',
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
                isBoolen:true,
                block_hidden:true,
                currentTab: e.target.dataset.current,
                hothidden8:true
            })
         wx.request({
            url:url+'/service/list',
            method: 'POST',
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