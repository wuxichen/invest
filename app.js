
 
App({
  onLaunch: function () {

    // var user = new Bmob.User();//开始注册用户

    var newOpenid = wx.getStorageSync('openid')
    console.log(newOpenid);
    if (!newOpenid) {
      wx.login({
        success: function (res) {
            console.log(res);
        }
      });
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    requstUrl:'http://localhost:8081',
    userInfo: null,
    singleChoiceAnswerNow:[],
    multiChoiceAnswerNow: [],
    choseQuestionBank:'',
    openid:'',
    cateId:'',
    count:-1

  }
})