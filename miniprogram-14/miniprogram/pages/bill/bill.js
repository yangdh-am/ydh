Page({
	
    echartsbutton: function () {
		wx.redirectTo({
		  url: '/pages/echartsbill/echartsbill' // 替换为需要进入的页面路径
		  })
        },
	  goBack: function () {
		wx.redirectTo({
		  url: '/pages/index/index' // 替换为需要进入的页面路径
		  })
		}
	  })