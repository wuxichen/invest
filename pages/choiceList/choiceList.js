// pages/choiceList/choiceList.js
var that;
var app = getApp();
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    questionList: []
    },

  onLoad: function (option) {
    // 加载基本信息
    that = this;
    var openid = app.globalData.openid;
    var url = app.globalData.requstUrl + '/a/config?openId=' + openid;
    wx.request({
      url: url,
      success: function (result) {
        var list = result.data;
        if(list == null || list == ''){
          wx.showToast({
            title: '问卷正在制作，请耐心等待',
            icon: 'success',
            duration: 2000
          })
        }
          that.setData({
          questionList: list
        });
      }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change1事件，携带value值为：', e.detail.value);
    app.globalData.cateId=e.detail.value
    var radioItems = this.data.questionList;
    
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      if (radioItems[i].cateId == e.detail.value){
        app.globalData.count = radioItems[i].count;
        console.log('global total:' + app.globalData.count);
      }
      
    }
    wx.switchTab({
      url: '../choiceMain/choiceMain',
    })
  },
})
