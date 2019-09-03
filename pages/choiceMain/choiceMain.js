var that;
var app =getApp();
// var Bmob = require('../../utils/bmob.js');
Page({
  data: { 

    total:-1,
    index:0,
    questionList:'',
    ansText:'' //选项Id 或者 具体文本
    

  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      ansText: e.detail.value,
    })
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    that =this;
    var radioItems = this.data.questionList.items;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].seqNo == e.detail.value;
    }
    var question = that.data.questionList;
    question.items = radioItems;
    console.log(question);
    this.setData({
      questionList: question,
      ansText: e.detail.value
    });
    console.log(that.data.ansText);
  },

  showNext: function(){
    var that = this;
    var cateId = app.globalData.cateId
    var url = app.globalData.requstUrl;
    var index=this.data.index+1;
    var questionId = this.data.questionList.questionId;
    var ansText = this.data.ansText;
    console.log('next:',that.data.ansText);

    var type = this.data.questionList.type; 
    var openId = app.globalData.openid;
    wx.request({
      url: url + '/get/next/questions?cateId=' + cateId+'&index='+index+'&questionId='+questionId+'&ansText='+ansText+'&type='+type+'&openId='+openId,
      success: function (res) {
        console.log('res',res.data);
        if(res.data == null || res.data == ''){
          that.setData({
            total:-1
          })

            wx.switchTab({
              url: '../me/me',
            })
        }
        that.setData({
          questionList: res.data,
          index:index
        })
      }
    })

        },
  showPre:function(){
    var that = this;
    var cateId = app.globalData.cateId
    var url = app.globalData.requstUrl;
    var index = this.data.index-1;
    var openid = app.globalData.openid;
    wx.request({
      url: url + '/get/before/questions?cateId=' + cateId+'&index='+index+'&openId='+openid,
      success: function (res) {
        var radioItems = res.data.items;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          if(res.data.type ==1){
            radioItems[i].checked = radioItems[i].seqNo == res.data.checkedAnsId;
          }
          if(res.data.type ==2){
            that.setData({
              ansText: res.data.ansText
            })
          } 
        }
        res.data.items = radioItems;
        that.setData({
          questionList: res.data,
          index:index
        })
      }
    })
  },


  onLoad: function () {
    this.setData({
      total : app.globalData.count
    })
    
    
    console.log('total:'+this.data.total);
  },

  onShow: function () {
    // 加载基本信息
    var that = this;
    var cateId = app.globalData.cateId
    var url = app.globalData.requstUrl;
    var openid = app.globalData.openid
    wx.request({
      url: url + '/get/questions?cateId=' + cateId+'&openId='+openid,
      success: function (res) {
        console.log('res',res)
        if(res.data == null || res.data ==''){
          that.setData({
            total : -1
          })
          console.log('x total',that.data.total);
            return;
        }

        that.setData({
          questionList: res.data
        })
        console.log('xs total', that.data.total);


      }
    })
    console.log('load')
    console.log(this.data.questionList)
  },

  bindPickerChange: function (e) {
    
  },
})