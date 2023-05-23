// index.js
// 获取应用实例
import * as echarts from '../../ec-canvas/echarts'
function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素
    });
    canvas.setChart(chart);
  
    var option = {
        title: {
            text: "消费分布",
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: "伙食费" },
                { value: 735, name: "娱乐" },
                { value: 580, name: "日常花销" },
                { value: 484, name: "网购" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
    };
    chart.setOption(option);
    return chart;
  }
  
  Page({
    data: {
      ec: {
        onInit: initChart
      }
    },

    goBack: function () {
		wx.redirectTo({
		  url: '/pages/index/index' // 替换为需要进入的页面路径
		  })
		}
  });

