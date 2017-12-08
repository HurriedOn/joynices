## Web前端开发规范文档

### 规范目的：
*  使开发流程更加规范化。
### 通用规范：
*  TAB键用两个空格代替（WINDOWS下TAB键占四个空格，LINUX下TAB键占八个空格）
*  CSS样式属性或者JAVASCRIPT代码后加“;”方便压缩工具“断句”。
*  文件内容编码均统一为UTF-8。
*  CSS、JAVASCRIPT中的非注释类中文字符须转换成unicode编码使用,以避免编码错误时乱码显示。
### 文件规范：
*  文件名用英文单词，多个单词用驼峰命名法。
*  一些浏览器会将含有这些词的作为广告拦截，文件命名、ID、CLASS等所有命名避免以上词汇。
``` 
ad、ads、adv、banner、sponsor、gg、guangg、guanggao 等
```
### html书写规范：
*  为每个HTML页面的第一行添加标准模式（standardmode）的声明，确保在每个浏览器中拥有一致的展现。
  ```html
    <!DOCTYPE html>
  ```
  文档类型声明统一为HTML5声明类型，编码统一为UTF-8。
  ```html
    <meta charset="UTF-8">
  ```
 在head标签中添加信息。
  ```html
    <meta name="author" content="smile@kang.cool">//作者
    <meta name="description" content="hello">//网页描述
    <meta name="keywords" content="a,b,c">//关键字,“，”分隔
    <meta http-equiv="expires" content="Wed, 26 Feb 1997 08：21：57 GMT">//设定网页的到期时间。一旦网页过期，必须到服务器上重新调阅
    <meta http-equiv="Pragma" content="no-cache">//禁止浏览器从本地机的缓存中调阅页面内容
    <meta http-equiv="Window-target" content="_top">//用来防止别人在框架里调用你的页面
    <meta http-equiv="Refresh" content="5;URL=http://kahn1990.com/">//跳转页面，5指时间停留5秒 网页搜索机器人向导。用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引
    <meta name="robots" content="none">//content的参数有all,none,index,noindex,follow,nofollow，默认是all
    <link rel="Shortcut Icon" href="favicon.ico">//收藏图标
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">//网页不会被缓存
  ```
  
  IE支持通过特定<meta>标签来确定绘制当前页面所应该采用的IE版本。除非有强烈的特殊需求，否则最好是设置为edge
mode ，从而通知IE采用其所支持的最新的模式。
  ```html
     <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  ```
*  非特殊情况下CSS样式文件外链至HEAD之间，JAVASCRIPT文件外链至页面底部。
  ```html
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <!-- 逻辑代码 -->
        <!-- 逻辑代码底部 -->
        <script src="lib/jquery/jquery-2.1.1.min.js"></script>
    </body>
    </html>
  ```
  引入JAVASCRIPT库在plugins文件中，文件名须包含库名称及版本号及是否为压缩版。
*  编码均遵循XHTML标准,标签、属性、属性命名由小写英文、数字和_组成，且所有标签必须闭合，属性值必须用双引号"",避免使用中文拼音尽量简易并要求语义化。
  ```
    CLASS --> nHeadTitle --> CLASS遵循小驼峰命名法（little camel-case）
    ID --> n_head_title --> ID遵循名称+_
    NAME --> N_Head_Title --> NAME属性命名遵循首个字母大写+_
    <div class="nHeadTitle" id="n_head_title" name="N_Head_Title"></div>
  ```
*  书写链接地址时避免重定向。
  ```
   href="http://www.kahn1990.com/" //即在URL地址后面加“/”
  ```
### css书写规范：
*  为了欺骗W3C的验证工具,可将代码分为两个文件，一个是针对所有浏览器,一个只针对IE。即将所有符合W3C的代码写到一个文件中,而一些IE中必须而又不能通过W3C验证的代码（如:cursor:hand;）放到另一个文件中，再用下面的方法导入。
  ```html
    <!-- 放置所有浏览器样式-->
    <link rel="stylesheet" type="text/css" href="">
    <!-- 只放置IE必须，而不能通过w3c的-->
    <!--[if IE]
        <link rel="stylesheet" href="">
    <![endif]-->
  ```
*  CSS样式新建或修改尽量遵循以下原则。

  根据新建样式的适用范围分为三级：全站级、产品级、页面级。
  
  尽量通过继承和层叠重用已有样式。
  
  不要轻易改动全站级CSS。改动后，要经过全面测试。
