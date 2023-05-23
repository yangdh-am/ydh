// index.js
// 获取应用实例
import * as echarts from '../../ec-canvas/echarts'

async function initChart(canvas, width, height, dpr) {
    const db = wx.cloud.database({})
    const res = (await db.collection('bill').get()).data

    const typeMap = {}
    res.forEach(item=>{
        if(typeMap[item.type]){
            typeMap[item.type]+=item.num
        }else{
            typeMap[item.type] = item.num
        }
    })
    const data = Object.entries(typeMap).map(item=>({
        name:item[0],
        value:item[1]
    }))
    console.log(data)
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
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
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