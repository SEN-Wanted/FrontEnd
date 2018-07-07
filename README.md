
# FrontEnd with React-native(0.54.2)
The place to store the codes and docs for front-end

## 屏幕截图

**以下为部分截图，全部截图请访问[wanted安卓APP全部截图](https://github.com/CWmaxwell/test_git2/blob/master/picture/screenShot/screenshot.md)查看**
![Alt text](https://raw.githubusercontent.com/CWmaxwell/test_git2/master/picture/screenShot/1.jpg)

![Alt text](https://raw.githubusercontent.com/CWmaxwell/test_git2/master/picture/screenShot/2.jpg)

![Alt text](https://raw.githubusercontent.com/CWmaxwell/test_git2/master/picture/screenShot/3.jpg)



## 安装  
**1.Clone the repo**
> $ git clone https://github.com/SEN-Wanted/FrontEnd.git  
> $ cd FrontEnd

**2.Install dependencies(npm v4+)**
> npm install  

**3.Running on android**

> $ react-native run-android   
> or  
> $ adb devices  
> $ react-native run-android --deviceId yourdeviceId

## 第三方依赖

* [mobx](https://github.com/mobxjs/mobx)
* [mobx-react](https://github.com/mobxjs/mobx-react)
* [mobx-react-form](https://github.com/foxhound87/mobx-react-form)
* [moment](https://github.com/moment/moment)
* [native-base](https://github.com/GeekyAnts/NativeBase)
* [react-native-animatable](https://github.com/oblador/react-native-animatable)
* [react-native-camera](https://github.com/react-native-community/react-native-camera)
* [react-native-easy-toast](https://github.com/crazycodeboy/react-native-easy-toast)
* [react-native-progress](https://github.com/oblador/react-native-progress)
* [react-native-refresh-list-view](https://github.com/huanxsd/react-native-refresh-list-view)
* [react-native-section-list-get-item-layout](https://github.com/jsoendermann/rn-section-list-get-item-layout)
* [react-native-smart-parabola](https://github.com/react-native-component/react-native-smart-parabola)
* [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
* [react-native-star-rating](https://github.com/djchie/react-native-star-rating)
* [react-native-swiper](https://github.com/leecade/react-native-swiper)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-navigation](https://github.com/react-navigation/react-navigation)

## 常见问题

### 1.undefined is not an object(xx手机、虚拟机出现红色屏幕)

**解决方法：** 多为第三方依赖没有更新官方，需要自己手动更新，按照红色屏幕提示，找到报错文件，将以下代码
```js
import React, {Component, PropTypes} from 'react';
```
改为
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
```
### 2.Duplicate file(文件重复,一般是图片文件，莫名其妙的错误，有几率出现)
**例子：**
> D:\Github\FrontEnd\android\app\build\intermediates\res\merged\release\drawable-mdpi-v4\src_img_code_barcode.gif: error: Duplicate file.  
D:\Github\FrontEnd\android\app\build\intermediates\res\merged\release\drawable-mdpi\src_img_code_barcode.gif: Original is here. The version qualifier may be implied.

**解决方法：** Add the following code to file node_modules/react-native/react.gradle :

```
doLast {
    def moveFunc = { resSuffix ->
        File originalDir = file("${resourcesDir}/drawable-${resSuffix}")
        if (originalDir.exists()) {
            File destDir = file("${resourcesDir}/drawable-${resSuffix}-v4")
            ant.move(file: originalDir, tofile: destDir)
        }
    }
    moveFunc.curry("ldpi").call()
    moveFunc.curry("mdpi").call()
    moveFunc.curry("hdpi").call()
    moveFunc.curry("xhdpi").call()
    moveFunc.curry("xxhdpi").call()
    moveFunc.curry("xxxhdpi").call()
}
```
inside def  currentBundleTask = tasks.create(...

## 前端项目结构
>|  
>|--src：前端开发的源码  
>|&emsp;&ensp;|--comon：公共样式或JS文件  
>|&emsp;&ensp;|--img：图片静态资源  
>|&emsp;&ensp;|--scene：各个场景文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Code：跟扫码相关的不可复用的js文件均放在该文件夹   
>|&emsp;&ensp;|&emsp;&ensp;|--Home：跟主页相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Login：跟登陆相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Mine：跟个人信息相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Message：跟消息相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Order：跟订单相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Restaurant：跟餐馆相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Search：跟搜索相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|&emsp;&ensp;|--Sign：跟注册相关的不可复用的js文件均放在该文件夹  
>|&emsp;&ensp;|--store：状态管理库  
>|&emsp;&ensp;|--widget：可复用的小组件  
>|&emsp;&ensp;|--api.js：暂时测试用的数据存放处  
>|&emsp;&ensp;|--RootScene.js：根场景，存放导航的定义  

