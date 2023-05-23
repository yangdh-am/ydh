Page({
uploadFile: function () {
  wx.chooseMessageFile({
    count: 1,
    type: "file",
    success: function (res) {
      wx.cloud.uploadFile({
        cloudPath: "upload/" + res.tempFiles[0].zd,
        filePath: res.tempFiles[0].path,
        success: function (uploadRes) {
          const fileID = uploadRes.fileID;
          wx.cloud.callFunction({
            name: "uploadFileToDatabase",
            data: {
              fileID: fileID,
            },
            success: function (res) {
              wx.showToast({
                title: "文件上传成功",
                icon: "success",
              });
            },
            fail: function (err) {
              wx.showToast({
                title: "文件上传失败",
                icon: "none",
              });
            },
          });
        },
        fail: function (err) {
          wx.showToast({
            title: "文件上传失败",
            icon: "none",
          });
        },
      });
    },
  });
},


  goBack: function () {
    wx.redirectTo({
      url: '/pages/index/index' // 替换为需要进入的页面路径
      })
    }
  })
