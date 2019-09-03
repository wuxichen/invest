var that;
var app = getApp();
// var Bmob = require('../../utils/bmob.js');
Page({
  data: {

    answerList:[]

  },

  

  onLoad: function () {
    that =this;
    var url = app.globalData.requstUrl;
    var openid = app.globalData.openid
      wx.request({
      url: url +'/ans/list?openId='+openid,
      success:function(res){
        that.setData({
          answerList:res.data
        })
      }
    })
  },

})