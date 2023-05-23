

Page({
  data: {
    password:'',
    islogin:1,
    inputipone:'',//登录注册时时输入的手机号
    compassiphone:'',//找回密码时输入的手机号
    loginbtnstate:true,//登录
    loginbtnstate1:true,//找回密码
    loginbtnstate2:true,//注册
    strloginUser:'',//登录用户名
    strloginpassword:'',//用户密码
    switchChecked:'',//选中按钮
  },
  onLoad() {
    var _this = this;
    console.log('开始检测。。。');
    if( wx.getStorageSync("checkedValue")==false)
    {
      _this.setData({
        strloginUser:'',
        strloginpassword: '',
        switchChecked:wx.getStorageSync('checkedValue'),
        loginbtnstate:true,
        })
        console.log('无记住密码');
        
    }
    else{
      _this.setData({
        strloginUser: wx.getStorageSync("iphone"),
        strloginpassword: wx.getStorageSync("password"),
        switchChecked:wx.getStorageSync('checkedValue'),
        loginbtnstate:wx.getStorageSync('wxlogin'),
        })
        console.log('记住密码'+_this.data.strloginUser+_this.data.strloginpassword+_this.data.switchChecked)
    }
    

  },
  //判断是否要记住密码
  bindswitchchange: function (event) {
    //得到值
  var checkedValue = event.detail.value;
  
    var _this = this;
    if (checkedValue == true){
      _this.setData({
        switchChecked:true,
      })
      wx.setStorageSync("checkedValue", _this.data.switchChecked);   
    } else if (checkedValue == false) {
      _this.setData({
        switchChecked: false
      })
      wx.setStorageSync("checkedValue", _this.data.switchChecked);
      }
      console.log("开关状态"+checkedValue);
  },
  //输入密码（登录界面判断有无）
  password1:function(event){
    var that = this
    var m=event.detail.value
    console.log(event.detail.value)
   
    if(m!=''){
      this.setData({
        strloginpassword:m
      })
        if(this.data.strloginUser!=''&&(this.data.strloginUser.length==11))
        {
          this.setData({
            loginbtnstate:false
          })
        }
        else{
          this.setData({
            loginbtnstate:true,
          })
        
      }
    }
    else{
      this.setData({
        loginbtnstate:true,
        password:''
      })
    }
  },
  //输入手机号（登录界面判断有无）
  inputiphone1:function(event){
    console.log(event.detail.value)
    var m=event.detail.value

    if(m!=''&&(m.length==11)){
      this.setData({
        strloginUser:m
      })
        if(this.data.strloginpassword!='')
        {
          this.setData({
            loginbtnstate:false
          })
        }
        else{
          this.setData({
            loginbtnstate:true,
          })
        
      }
    }
    else{
      this.setData({
        loginbtnstate:true,
      })
    }
  },
  //输入密码（注册界面判断有无）
  password2:function(event){
    console.log(event.detail.value)
    var m=event.detail.value
    var userinfos=wx.getStorageSync('userjobs') ||[];//找数组
    var k=1
    for(var s=0;s<userinfos.length;s++)
      {
        if(this.data.inputipone==userinfos[s].iphone)
        {
          k=0
          wx.showToast({
            title: '手机号已注册',
            icon:'error'
          })
        }
      }
    if(m!=''){
      this.setData({
        password:m
      })
        if(this.data.inputipone!=''&&(this.data.inputipone.length==11&& k))
        {
          this.setData({
            loginbtnstate2:false
          })
        }
        else{
          this.setData({
            loginbtnstate2:true,
          })
        
      }
    }
    else{
      this.setData({
        loginbtnstate2:true,
        password:''
      })
    }
  },
  //输入手机号（注册界面判断有无）
  inputiphone2:function(event){
    console.log(event.detail.value)
    var userinfos=wx.getStorageSync('userjobs') ||[];//找数组
    var k=1
    var m=event.detail.value
    if(m!=''&&(m.length==11)){
      this.setData({ 
        inputipone:m
      })
      for(var s=0;s<userinfos.length;s++)
      {
        if(this.data.inputipone==userinfos[s].iphone)
        {
          k=0
          wx.showToast({
            title: '手机号已注册',
            icon:'error'
          })
        }
      }
        if(this.data.password!=''&& k)
        {
          this.setData({
            loginbtnstate2:false
          })
        }
        else{
          this.setData({
            loginbtnstate2:true,
          })
        
      }
    }
    else{
      this.setData({
        loginbtnstate2:true,
        inputipone:''
      })
    }
  },
  //找回密码输入框
  compass:function(event){
    console.log("找回密码"+event.detail.value)
    var m=event.detail.value
    if(m!=''&&(m.length==11)){
      this.setData({
        compassiphone:m,
        loginbtnstate1:false
      })
    }
    else{
      this.setData({
        loginbtnstate1:true,
        inputipone:''
      })
    }
  },
  //登录
  onlogin:function(e){
    var that=this
    //记住密码
    var checkedValue = that.data.switchChecked;
    console.log(checkedValue);
    //如果记住密码则向微信缓存写入账号密码
    //如果不记住密码则清空微信缓存存在的账号密码
    if (checkedValue == true) {
      wx.setStorageSync("iphone",that.data.strloginUser);
      wx.setStorageSync("password",that.data.strloginpassword);
      wx.setStorageSync("checkedValue", that.data.switchChecked);
      wx.setStorageSync("wxlogin", false);
      console.log(that.data.loginbtnstate)
    } else if (checkedValue == false) {
      wx.setStorageSync("iphone","");
      wx.setStorageSync("password","");
      wx.setStorageSync("checkedValue", false);
      wx.setStorageSync("wxlogin", true);
    }
    //开始检查用户名和密码是否一致
    var userinfos=wx.getStorageSync('userjobs') ||[];//找数组
    var k=1
    for(var s=0;s<userinfos.length;s++)
    {
      if(userinfos[s].iphone==that.data.strloginUser){
        if(userinfos[s].password==that.data.strloginpassword)
        {
              wx.showToast({
                title: '登录成功',
                duration:2000,
              }),
              wx.navigateTo({
                url: '../index/index',
              })
            }
        else{
          wx.showToast({
            title: '密码错误',
            icon:'error',
            duration:2000
          })
        }
      }
      k++
  }
  if(k==userinfos.length)
  {
    wx.showToast({
      title: '用户名不存在',
      icon:'error',
      duration:2000
    })
  }
},
  //注册
  formsubmit:function(e){
    var that=this
    console.log(e.detail.value)
    var obj={}
    obj.password=e.detail.value.inputpassword,
    obj.iphone=e.detail.value.iphone,
    console.log(obj)
    //存入多个注册用户
    var arr=wx.getStorageSync('userjobs',arr) ||[];
    console.log(arr);
    arr.push(obj);
    wx.setStorageSync('userjobs',arr);
    wx.showToast({
      title: '注册成功',
      duration:1000,
      success:function(){
        that.setData({
          islogin:1,
          password:'',
          inputiphone:'',
          loginbtnstate2:true
        })
      }
    })
  },
  //找回密码
  comebackpassword:function(e){
  var that =this
  let lqy=wx.getStorageSync('userjobs') || [];//找数组
  var k=1
  for(var s=0; s<lqy.length;s++)
  {
    if(lqy[s].iphone==that.data.compassiphone)
    {
      wx.setClipboardData({
        data: lqy[s].password,
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data) // data
              that.setData({
                islogin:1,
                loginbtnstate1:true
              })
              wx.showToast({
                title: '密码已复制',
                duration:2000
              })
            }
          })
        }
      })
    }
    else
    {
      wx.showToast({
        title: '该手机号码未注册',
        duration:2000
      })
       //this.setData({
         //loginbtnstate1:true
      // })
    }
  }

  },
  //转到注册
  register:function(event){
    var that = this
   that.setData({
    islogin:3
    })
  },
  //转到登录
  denglu:function(event){
    var that = this
    that.setData({
      islogin:1
    })
  },
  //转到忘记密码
  forget:function(event){
    this.setData({
      islogin:2
    })
  }


})
