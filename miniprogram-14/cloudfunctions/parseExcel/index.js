const cloud = require('wx-server-sdk')
cloud.init()
var xlsx = require('node-xlsx');
const db = cloud.database()

const calcType = (name)=>{
    if(/超市/.test(name)){
        return '日常花销'
    }
    if(/(美团)|(饿了么)/.test(name)){
        return '伙食费'
    }
    return '其他'
}


exports.main = async(event, context) => {
  let {
    fileID
  } = event
  //1,通过fileID下载云存储里的excel文件
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  const tasks = [] //用来存储所有的添加数据操作
  //2,解析excel文件里的数据
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  sheets.forEach(function(sheet) {
    for (var rowId in sheet['data']) {
      var row = sheet['data'][rowId]; //第几行数据
      
      if (rowId > 0 && row) { //第一行是表格标题，所有我们要从第2行开始读
        //3，把解析到的数据存到excelList数据表里
        const promise = db.collection('bill')
          .add({
            data: {
               name:row[0],
               num:row[1],
               type:calcType(row[0])
            }
          })
        tasks.push(promise)
      }
    }
  });

  // 等待所有数据添加完成
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}
