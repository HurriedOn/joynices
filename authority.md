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
<HEAD>中添加信息。
