function finishExam() {
  var examId = app.globalData.cateId;
  var uid = app.globalData.userInfo;
  var corpId = app.globalData.corpId;

  wx.request({
    url: 'http://localhost:8081/a/update/exam/config?examId=' + examId + '&uid=' + uid + '&corpId=' + corpId,
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log('finish exam:' + uid);
    }

  });
}

module.exports = {
  finishExam: finishExam
}  
