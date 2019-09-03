
var app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    openid:''
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log('auth:' + res.authSetting['scope.userInfo']);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  wx.request({
                  //      自行补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx01d61e7a8726aa73&secret=e344a97bc0525a147996d24c39558926&js_code=' + res.code + '&grant_type=authorization_code',
                       success: res => {
                           // 获取到用户的 openid
                           
                         app.globalData.openid = res.data.openid
                         console.log("用户的openid:" + app.globalData.openid);
                       }
                 });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      
      var that = this;
        that.setData({
        isHide: false
      });

      wx.navigateTo({
        url: '../choiceList/choiceList',
        success: function () {
          console.log('success');
         } ,
         fail:function(){
           console.log('fail')
         }      
      });

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})