# joynices 项目小结

### 1、后台系统模板：Amaze UI 
经典模块化前端框架：layer  http://www.layui.com/

### 2、全屏滚动 jquery.fullpage.js 
	http://www.dowebok.com/77.html/fullpage.js 
	http://www.dowebok.com/143.html(兼容ie低版本)
	jquery.fullpage.js超出满屏时的设置http://www.dowebok.com/demo/2014/77/
  
### 3、多次绑定事件就会出现多次相同的操作，多次创建同一个对象也会出现问题。
     如果要这样，解决方法：
        用$("p").unbind()解除事件再绑定
       或者 $("p").off("click").on("click",function(){})
       
### 4、3D轮播插件   
	jquery.featureCarousel.min 
	http://blog.csdn.net/helpzp2008/article/details/41513143  
	无缝滚动  jquery-kxbdmarquee-141127204752 
	http://code.ciaoca.com/jquery/kxbdmarquee/demo/(高度或者宽度可以整除20，否则会出现卡顿问题)
	http://www.superslide2.com/
  
### 5、鼠标滚轮事件
```js
$('#content').on("mousewheel DOMMouseScroll", function (event) { 
  // chrome & ie || // firefox    
  var delta = (event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1)) || (event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1));
  if (delta > 0) { 
    // 向上滚动  
    console.log('mousewheel top');
  } else if (delta < 0) {
    // 向下滚动
   console.log('mousewheel bottom');
  }    
});
```
### 6、检测浏览器是否支持svg
```js
  function isSupportSVG() { 
    var SVG_NS = 'http://www.w3.org/2000/svg';
    return !!document.createElementNS &&!!document.createElementNS(SVG_NS, 'svg').createSVGRect;
  } 
  // 测试
  console.log(isSupportSVG());
```
### 7、检测浏览器是否支持canvas
```js
  function isSupportCanvas() {
    if(document.createElement('canvas').getContext){
      return true;
    }else{
      return false;
    }
  }	
  // 测试，打开谷歌浏览器控制台查看结果
  console.log(isSupportCanvas());
```
### 8、检测是否是微信浏览器
```js
  function isWeiXinClient() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)=="micromessenger") {
      return true; 
    } else { 
      return false;
    }
  }
// 测试
alert(isWeiXinClient());
```
### 9、js判断是否移动端及浏览器内核
```js
  var browser = {
    versions: function() {
      var u = navigator.userAgent;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
	presto: u.indexOf('Presto') > -1, //opera内核
	webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko 
	mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
	ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios 
	android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
	iPhone: u.indexOf('iPhone') > -1 , //iPhone
	iPad: u.indexOf('iPad') > -1, //iPad 
	webApp: u.indexOf('Safari') > -1 //Safari
      };
   }
 } 
 if (browser.versions.mobile() || browser.versions.ios() || browser.versions.android() || browser.versions.iPhone() || browser.versions.iPad()) {
   alert('移动端'); 
  }
```
### 10、”==”与”===”是不同的,一个是判断值是否相等,一个是判断值及类型是否完全相等。
### 11、利用CSS、JavaScript及Ajax实现图片预加载的三大方法 
	http://www.qdfuns.com/notes/31113/c03c87d1240b2b5c472ee9605a22e34f.html
### 12、webpack概念
	http://www.qdfuns.com/notes/25414/8fc8f71ace343e0104a2dd58ab0e1e4e.html
	其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。
	http://www.jianshu.com/p/42e11515c10f
### 13、 CentOS7.3 安装及配置Apache 和Tomcat
	http://m.blog.csdn.net/qq_24956515/article/details/77482770
### 14、3D全景特效three.js
### 15、jQ CDN地址  https://code.jquery.com 
### 16、meta
    a、说明主页制作所使用的文字以及语言；又如英文是ISO-8859-1字符集，还有BIG5、utf-8、shift-Jis、Euc、Koi8-2等字符集；
	<meta http-equiv='Conten-Type' content='text/html;charset=utf-8'>
    b、定时让网页在指定的时间n内，跳转到页面http://yourlink；
	<meta http-equiv="Refresh" contect="n;url=http://yourlink">
    c、设定进入和离开页面时的特殊效果，这个功能即FrontPage中的“格式/网页过渡”，不过所加的页面不能够是一个frame页面。
	<meta http-equiv="Page-Enter" contect="revealTrans(duration=10,transtion= 50)">和<meta http-equiv="Page-Exit" contect="revealTrans(duration=20，transtion=6)">
### 17、text-align='justify'实现两端对齐文本效果。	
```html
	<ul class="header_warp">
	  <li><a href="index.html">Joynices</a></li>
	  <li><a href="index.html">服务与支持</a></li>
	  <li><a href="index.html">成为经销商</a></li>
	  <li><a href="index.html">服务</a></li>
	  <li><a href="index.html">社区</a></li>
	</ul>
	.header_warp li{display:inline-block;height:44px;}
        .header_warp li a{color:#fff;line-height:44px;display:inline-block;padding:0 10px;color:#fff;}
	.header_warp:after {
          content: '';
   	  width: 100%;
    	  display: inline-block;
	}
```
### 18、a.垂直水平居中{  回  }
```html
	<div class='main'>
		<div class='content'></div>
	</div>
	.main{width:100%;height:100%;text-align:center;}
	.main:before{content:'';display:inline-block;height:100%;vertical-align:middle;}
	.content{width:500px;magin:auto;display:inline-block;vertical-align:middle;}
```
    b、text-align='justify'实现两端对齐文本效果。{   如www.apple.com导航  }
```html
	<ul class="header_warp">
	  <li><a href="index.html">Joynices</a></li>
	  <li><a href="index.html">服务与支持</a></li>
	  <li><a href="index.html">成为经销商</a></li>
	  <li><a href="index.html">服务</a></li>
	  <li><a href="index.html">社区</a></li>
	</ul>
	.header_warp li{display:inline-block;height:44px;}
        .header_warp li a{color:#fff;line-height:44px;display:inline-block;padding:0 10px;color:#fff;}
	.header_warp:after {
          content: '';
   	  width: 100%;
    	  display: inline-block;
	}
```
### 19、var a=!0; //true
    var b=!1; //false
    9e4=90000;
    5e3=5000;
### 20、怎样实现前端裁剪上传图片功能
	https://zhuanlan.zhihu.com/p/23340867
### 21、node.js 
	http://cnodejs.org/
	https://www.zhihu.com/question/19793473
    webpack
	https://doc.webpack-china.org/guides/getting-started
### 22、性能优化
	https://juejin.im/entry/59a561bd6fb9a0247b3b7141
	https://www.zhihu.com/question/20790576
	https://github.com/fouber/blog/issues/
### 23、'&#8203'非法字符，
### 24、Query.extend()方法 遍历数组元素,并修改第一个对象
```html
	<div id="log"></div>
	<script>
	   $(function () { 
   	      var object1 = {
        	apple: 0,
        	banana: {weight: 52, price: 100},
        	cherry: 97
    	      };
	      var object2 = {
        	banana: {price: 200},
        	durian: 100
    	      };
	      /* object2 合并到 object1 中 */
    	      $.extend(object1, object2);
	   })
	</script>
```
### 25、
   px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。(引自CSS2.0手册)
   em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。(引自CSS2.0手册)
   任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。

### 26、
    移动端注意：
	http://www.qdfuns.com/notes/39070/fa8b260487a9aaeeb8ce96b6041d63c6.html
    css3:
	background-attachment:fixed; color:hsla(0,0%,100%,.6)
### 27、汉字转 unicode
### 28、JQuery中$.cookie()方法的使用
jquery.cookie.js插件：
```js
<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>  
<script type="text/javascript" src="js/jquery.cookie.js"></script>   

//新增cookie：  
$.cookie('cookieName', 'cookieValue');    
//注：如果没有设置cookie的有效期，则cookie默认在浏览器关闭前都有效，故被称为"会话cookie"。  

// 创建一个cookie并设置有效时间为7天:  
$.cookie('cookieName', 'cookieValue', { expires: 7 });  

// 创建一个cookie并设置cookie的有效路径：  
$.cookie('cookieName', 'cookieValue', { expires: 7, path: '/' });  

//读取cookie：  
$.cookie('cookieName'); // 若cookie存在则返回'cookieValue'；若cookie不存在则返回null   

//删除cookie：把ncookie的值设为null即可  
$.cookie('the_cookie', null); 
```
### 29、jquery-confirm | 功能强大的jQuery对话框和确认框插件
https://github.com/craftpip/jquery-confirm

### 30、ocument.documentElement和document.body的区别
documentElement 和 body 相关说明：	
body是DOM对象里的body子节点，即 <body> 标签；


