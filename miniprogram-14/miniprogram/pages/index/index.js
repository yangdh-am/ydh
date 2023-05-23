// pages/index/index.js
// index.js
Page({
    uploadBill: function () {
      wx.redirectTo({
        url: '/pages/uplord/uplord' // 替换为需要进入的页面路径
        }) // 进入上传账单页面
    },
  
    inloadBill: function () {
      wx.redirectTo({
        url: '/pages/bill/bill' // 替换为需要进入的页面路径
        })  // 进入账单操作页面

    },
    logout: function () {
		wx.redirectTo({
			url: '/pages/login/login' // 替换为需要进入的页面路径
		  })
	  }
  })