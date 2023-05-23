Page({
    chooseExcel(){
        let that =this
        wx.chooseMessageFile({
          count: 1,
          type:'file',
          success(res){
              let path=res.tempFiles[0].path;
              that.uploadExcel(path);
          }
        })
    },
    uploadExcel(path){
        let that=this
        wx.cloud.uploadFile({
            cloudPath:new Date().getTime()+'.xls',
            filePath:path,
            success:res =>{
                that.jiexi(res.fileID)
            },
            fail:err=>{
                console.log("上传失败",err)
            }
            
        })
    },
    jiexi(fileID){
        console.log(fileID)
        wx.cloud.callFunction({
          name:"parseExcel",
          data:{
            fileID:fileID,
          },
          success:res=>{
            wx.hideLoading()
            console.log(res);
            wx.showToast({
              title: '导入发表成功',
              icon:'success',
            })
          },
           fail:err=>{
             console.log('解析失败',err);
           }
        })
      }
})